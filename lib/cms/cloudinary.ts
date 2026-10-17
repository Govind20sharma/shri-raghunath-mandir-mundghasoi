import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { firestore } from "./firebase";
import { CmsError } from "./errors";
import { MAX_UPLOAD_BYTES, validCmsPublicId } from "./security";
import type { CmsPhoto } from "./model";

export function isCloudinaryConfigured() {
  return Boolean(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET && process.env.CLOUDINARY_UPLOAD_PRESET);
}

function config() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const preset = process.env.CLOUDINARY_UPLOAD_PRESET;
  if (!cloudName || !apiKey || !apiSecret || !preset || !/^[a-zA-Z0-9_-]+$/.test(cloudName)) throw new CmsError(503, "Connect the media library before uploading photos.", "media_not_configured");
  return { cloudName, apiKey, apiSecret, preset };
}

function ticketRef(publicId: string) {
  return firestore().doc(`cmsUploads/${createHash("sha256").update(publicId).digest("hex")}`);
}

export async function createSignedUpload(input: { fileName: string; fileType: string; fileSize: number }, email: string) {
  const { cloudName, apiKey, apiSecret, preset } = config();
  const publicId = `mandir/cms/${randomUUID().replaceAll("-", "")}`;
  const fields: Record<string, string> = {
    timestamp: String(Math.floor(Date.now() / 1000)),
    public_id: publicId,
    overwrite: "false",
    allowed_formats: "jpg,jpeg,png,webp",
    upload_preset: preset,
    unique_filename: "false",
    use_filename: "false",
  };
  const toSign = Object.keys(fields).sort().map((key) => `${key}=${fields[key]}`).join("&");
  const signature = createHash("sha1").update(toSign + apiSecret).digest("hex");
  await ticketRef(publicId).create({ publicId, createdAt: new Date().toISOString(), createdBy: email, expectedBytes: input.fileSize, originalName: input.fileName, verified: false });
  return { url: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, fields: { ...fields, api_key: apiKey, signature }, publicId, maxBytes: MAX_UPLOAD_BYTES };
}

export async function verifyUploadedImage(publicId: unknown): Promise<CmsPhoto> {
  if (!validCmsPublicId(publicId)) throw new CmsError(400, "Invalid media ID.", "invalid_media");
  const { cloudName, apiKey, apiSecret } = config();
  const ticket = await ticketRef(publicId).get();
  if (!ticket.exists || ticket.data()?.publicId !== publicId) throw new CmsError(404, "This upload was not created by the CMS.", "invalid_media");
  const previous = ticket.data()!;
  if (previous.verified && previous.photo) return previous.photo as CmsPhoto;
  if (Date.now() - Date.parse(previous.createdAt) > 24 * 60 * 60 * 1000) throw new CmsError(400, "This upload has expired. Please upload the photo again.", "upload_expired");
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/${encodeURIComponent(publicId)}`, {
    headers: { authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString("base64")}` },
    cache: "no-store", signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new CmsError(response.status === 404 ? 400 : 502, "The media provider could not verify this upload. Please retry.", "media_verification_failed");
  const resource = await response.json();
  if (resource.public_id !== publicId || resource.resource_type !== "image" || resource.type !== "upload" ||
      !["jpg", "jpeg", "png", "webp"].includes(resource.format) || !Number.isInteger(resource.bytes) || resource.bytes <= 0 || resource.bytes > MAX_UPLOAD_BYTES ||
      !Number.isInteger(resource.width) || !Number.isInteger(resource.height) || resource.width < 1 || resource.height < 1 || resource.width > 20000 || resource.height > 20000 || resource.width * resource.height > 80000000 ||
      (resource.pages && resource.pages > 1)) {
    throw new CmsError(400, "The upload must be a single JPG, PNG, or WebP image up to 12 MB and 80 megapixels.", "invalid_media");
  }
  const url = new URL(resource.secure_url);
  if (url.origin !== "https://res.cloudinary.com" || !url.pathname.startsWith(`/${cloudName}/image/upload/`)) throw new CmsError(502, "The media provider returned an invalid image URL.", "invalid_media");
  const title = String(previous.originalName || "Photo").replace(/\.[^.]+$/, "").slice(0, 180);
  const photo: CmsPhoto = { id: publicId.split("/").at(-1)!, src: url.href, width: resource.width, height: resource.height, title, alt: title, caption: "", order: 0, publicId };
  await ticket.ref.update({ verified: true, verifiedAt: new Date().toISOString(), photo });
  return photo;
}
