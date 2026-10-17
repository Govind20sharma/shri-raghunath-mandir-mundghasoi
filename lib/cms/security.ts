import { CmsError } from "./errors";

export const MAX_JSON_BYTES = 4 * 1024 * 1024;
export const MAX_CONTENT_BYTES = 3 * 1024 * 1024;
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function isAuthorizedGoogleIdentity(token: { email?: string; email_verified?: boolean; firebase?: { sign_in_provider?: string } }, allowedEmails: string[]) {
  return Boolean(token.email_verified === true && token.email && allowedEmails.includes(token.email.toLowerCase()) && token.firebase?.sign_in_provider === "google.com");
}

export function hasRecentAuthentication(authTime: number, nowSeconds = Date.now() / 1000) {
  const age = nowSeconds - authTime;
  return Number.isFinite(authTime) && age >= -60 && age <= 5 * 60;
}

/** Requiring an Origin on every mutation also protects the session-creation endpoint. */
export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (!origin || fetchSite === "cross-site") throw new CmsError(403, "This action must come from the website's admin page.", "invalid_origin");
  let parsed: URL;
  try { parsed = new URL(origin); } catch { throw new CmsError(403, "Invalid request origin.", "invalid_origin"); }
  if (parsed.origin !== new URL(request.url).origin || parsed.pathname !== "/" || parsed.search || parsed.hash) {
    throw new CmsError(403, "Invalid request origin.", "invalid_origin");
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    throw new CmsError(415, "Send this request as JSON.", "invalid_content_type");
  }
}

export async function readJson(request: Request, maxBytes = MAX_JSON_BYTES): Promise<unknown> {
  if (Number(request.headers.get("content-length") || "0") > maxBytes) throw new CmsError(413, "Request is too large.", "payload_too_large");
  const reader = request.body?.getReader();
  if (!reader) throw new CmsError(400, "A JSON body is required.", "invalid_json");
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new CmsError(413, "Request is too large.", "payload_too_large");
    }
    chunks.push(value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new CmsError(400, "Invalid JSON body.", "invalid_json"); }
}

export function validateUploadInput(input: unknown) {
  const value = input as Record<string, unknown> | null;
  if (!value || typeof value.fileName !== "string" || !value.fileName.trim() || value.fileName.length > 240 ||
      typeof value.fileType !== "string" || !ALLOWED_IMAGE_TYPES.includes(value.fileType) ||
      typeof value.fileSize !== "number" || !Number.isSafeInteger(value.fileSize) || value.fileSize <= 0 || value.fileSize > MAX_UPLOAD_BYTES) {
    throw new CmsError(400, "Choose a JPG, PNG, or WebP image up to 12 MB.", "invalid_upload");
  }
  return { fileName: value.fileName, fileType: value.fileType, fileSize: value.fileSize };
}

export function validCmsPublicId(value: unknown): value is string {
  return typeof value === "string" && /^mandir\/cms\/[a-zA-Z0-9_-]{12,100}$/.test(value);
}
