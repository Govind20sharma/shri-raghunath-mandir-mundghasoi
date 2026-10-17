import { z } from "zod";
import type { CmsContent } from "./model";
import { cmsCopyFields } from "./copy-fields";
import { CmsError } from "./errors";
import { MAX_CONTENT_BYTES, validCmsPublicId } from "./security";

const text = (max: number) => z.string().max(max).refine((value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value), "Text contains unsupported control characters.");
const id = z.string().min(1).max(100).regex(/^[a-zA-Z0-9_-]+$/);
const order = z.number().int().min(0).max(1000000);
const link = z.string().max(2000).refine((value) => {
  try { const url = new URL(value); return url.protocol === "https:" && !url.username && !url.password; }
  catch { return false; }
}, "Use an https URL.");
const phoneHref = z.string().regex(/^tel:\+?[0-9 ()-]{5,30}$/);

export function validImageSource(value: string) {
  if (/^\/assets\/[a-zA-Z0-9_./%-]+$/.test(value) && !value.includes("..") && !/%2e|%2f|%5c/i.test(value)) return true;
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloud) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com" && !url.username && !url.password && !url.port &&
      url.pathname.startsWith(`/${cloud}/image/upload/`) && !url.search && !url.hash;
  } catch { return false; }
}

const photoSchema = z.strictObject({
  id,
  src: z.string().min(1).max(2000).refine(validImageSource, "Use a local website asset or an image from the configured media library."),
  width: z.number().int().min(1).max(20000),
  height: z.number().int().min(1).max(20000),
  title: text(180),
  alt: text(400),
  caption: text(1200),
  order,
  publicId: z.string().refine(validCmsPublicId, "Invalid media ID.").optional(),
  deletedAt: z.iso.datetime().optional(),
});
const photos = z.array(photoSchema).max(3000).superRefine((items, ctx) => {
  if (new Set(items.map((item) => item.id)).size !== items.length) ctx.addIssue({ code: "custom", message: "Photo IDs must be unique within a collection." });
});
const hours = z.strictObject({ opens: z.number().min(0).max(23.99), closes: z.number().min(0).max(24) })
  .refine((value) => value.opens < value.closes, "Closing time must follow opening time.");

export const contentSchema = z.strictObject({
  schemaVersion: z.literal(1),
  settings: z.strictObject({
    name: text(100).min(1), onlineName: text(120).min(1), location: text(240), address: text(600),
    phone: text(40), displayPhone: text(60), phoneHref,
    contacts: z.array(z.strictObject({ name: text(100), nameEnglish: text(100), role: text(160), phone: text(40), displayPhone: text(60), phoneHref })).min(1).max(12),
    mapsUrl: link, googleListingUrl: link, locationSource: link,
    timeZone: z.string().max(80).refine((value) => { try { new Intl.DateTimeFormat("en", { timeZone: value }); return true; } catch { return false; } }, "Choose a valid time zone."),
    darshan: z.strictObject({ morning: hours, evening: hours }),
  }),
  copy: z.record(z.string().max(120), text(12000)),
  years: z.array(z.strictObject({ id, year: z.number().int().min(1900).max(2200), title: text(160), description: text(1600), order, published: z.boolean() })).max(150),
  albums: z.array(z.strictObject({ id, yearId: id, title: text(180), description: text(1800), kind: z.enum(["construction", "darshan", "festival", "reference"]), order, published: z.boolean(), photos })).max(400),
  homePhotos: photos,
  heroPhotoId: z.string().max(100),
  references: photos,
  sections: z.array(z.strictObject({
    id, slot: z.enum(["home.after-about", "home.after-gallery", "home.before-contact", "photos.after-intro", "photos.after-gallery"]),
    type: z.enum(["text", "notice", "cards", "image-text"]), title: text(180), body: text(5000), order, published: z.boolean(),
    image: photoSchema.optional(),
    items: z.array(z.strictObject({ id, title: text(180), body: text(1600) })).max(12),
  })).max(60),
}).superRefine((value, ctx) => {
  if (value.settings.darshan.morning.closes > value.settings.darshan.evening.opens) {
    ctx.addIssue({ code: "custom", path: ["settings", "darshan"], message: "Morning darshan must close before evening darshan opens." });
  }
  for (const key of ["years", "albums", "sections"] as const) {
    if (new Set(value[key].map((item) => item.id)).size !== value[key].length) ctx.addIssue({ code: "custom", path: [key], message: "IDs must be unique." });
  }
  if (new Set(value.years.map((year) => year.year)).size !== value.years.length) ctx.addIssue({ code: "custom", path: ["years"], message: "Each year can be created once." });
  const yearIds = new Set(value.years.map((year) => year.id));
  value.albums.forEach((album, index) => {
    if (!yearIds.has(album.yearId)) ctx.addIssue({ code: "custom", path: ["albums", index, "yearId"], message: "Choose an existing year for this album." });
  });
  if (value.heroPhotoId && !value.homePhotos.some((photo) => photo.id === value.heroPhotoId && !photo.deletedAt)) {
    ctx.addIssue({ code: "custom", path: ["heroPhotoId"], message: "Choose an active home photo for the hero image." });
  }
  const fields = new Map(cmsCopyFields.map((field) => [field.key, field]));
  for (const [key, copy] of Object.entries(value.copy)) {
    const field = fields.get(key);
    if (!field) ctx.addIssue({ code: "custom", path: ["copy", key], message: "Unknown text field." });
    else if (copy.length > field.maxLength) ctx.addIssue({ code: "custom", path: ["copy", key], message: `Keep this field within ${field.maxLength} characters.` });
  }
  value.sections.forEach((section, index) => {
    if (section.type === "image-text" && (!section.image || section.image.deletedAt)) ctx.addIssue({ code: "custom", path: ["sections", index, "image"], message: "An image-and-text section needs an active image." });
    if (new Set(section.items.map((item) => item.id)).size !== section.items.length) ctx.addIssue({ code: "custom", path: ["sections", index, "items"], message: "Card IDs must be unique." });
  });
});

export function validateContent(input: unknown): CmsContent {
  const result = contentSchema.safeParse(input);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new CmsError(400, `${issue.path.join(".") || "Content"}: ${issue.message}`, "invalid_content");
  }
  if (Buffer.byteLength(JSON.stringify(result.data), "utf8") > MAX_CONTENT_BYTES) throw new CmsError(413, "The CMS content is too large. Reduce long descriptions or archive old albums.", "content_too_large");
  return result.data;
}

export function validateRevision(value: unknown): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0 || value >= Number.MAX_SAFE_INTEGER) throw new CmsError(400, "A valid content revision is required.", "invalid_revision");
  return value;
}
