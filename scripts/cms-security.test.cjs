require("./cms-source-loader.cjs");
const test = require("node:test");
const assert = require("node:assert/strict");
const { assertSameOrigin, readJson, validateUploadInput, validCmsPublicId, isAuthorizedGoogleIdentity, hasRecentAuthentication, MAX_UPLOAD_BYTES } = require("../lib/cms/security.ts");
const { validateContent, validImageSource, validateRevision } = require("../lib/cms/validation.ts");
const { encodeSnapshot, decodeSnapshot, SNAPSHOT_CHUNK_CHARS } = require("../lib/cms/snapshot.ts");
const { defaultContent } = require("../lib/cms/default-content.ts");
const { cmsCopyFields } = require("../lib/cms/copy-fields.ts");
const { publicContent } = require("../lib/cms/public-content.ts");
const { formatDarshanHour } = require("../lib/cms/model.ts");

function mutateContent(change) { const content = structuredClone(defaultContent); change(content); return content; }
function request(origin, extras = {}) { return new Request("https://mandir.example/api/admin/content", { method: "PUT", headers: { origin, "content-type": "application/json", ...extras }, body: "{}" }); }

test("only verified, explicitly allowed Google identities may administer content", () => {
  const token = { email: "GOVINDSHARMA5768@gmail.com", email_verified: true, firebase: { sign_in_provider: "google.com" } };
  const admins = ["govindsharma5768@gmail.com"];
  assert.equal(isAuthorizedGoogleIdentity(token, admins), true);
  assert.equal(isAuthorizedGoogleIdentity({ ...token, email: "matchbest@example.com" }, admins), false);
  assert.equal(isAuthorizedGoogleIdentity({ ...token, email_verified: false }, admins), false);
  assert.equal(isAuthorizedGoogleIdentity({ ...token, firebase: { sign_in_provider: "password" } }, admins), false);
  assert.equal(isAuthorizedGoogleIdentity({}, admins), false);
});

test("session creation rejects old or future authentication times", () => {
  assert.equal(hasRecentAuthentication(1000, 1200), true);
  assert.equal(hasRecentAuthentication(1000, 1301), false);
  assert.equal(hasRecentAuthentication(1400, 1200), false);
  assert.equal(hasRecentAuthentication(NaN, 1200), false);
});

test("mutations reject cross-site, missing-origin and non-JSON requests", () => {
  assert.doesNotThrow(() => assertSameOrigin(request("https://mandir.example")));
  assert.throws(() => assertSameOrigin(request("https://attacker.example")), /origin/);
  assert.throws(() => assertSameOrigin(request("https://mandir.example.attacker.example")), /origin/);
  assert.throws(() => assertSameOrigin(request("https://mandir.example", { "sec-fetch-site": "cross-site" })), /website/);
  assert.throws(() => assertSameOrigin(request("https://mandir.example", { "content-type": "text/plain" })), /JSON/);
  assert.throws(() => assertSameOrigin(new Request("https://mandir.example/api/admin/content", { method: "DELETE" })), /website/);
});

test("JSON input limits are enforced even when Content-Length is missing", async () => {
  await assert.rejects(() => readJson(new Request("https://mandir.example", { method: "POST", body: JSON.stringify({ text: "x".repeat(200) }) }), 32), /too large/);
  await assert.rejects(() => readJson(new Request("https://mandir.example", { method: "POST", body: "{" })), /Invalid JSON/);
  assert.deepEqual(await readJson(new Request("https://mandir.example", { method: "POST", body: '{"ok":true}' })), { ok: true });
});

test("upload validation rejects executable formats and excessive sizes", () => {
  assert.equal(validateUploadInput({ fileName: "temple.webp", fileType: "image/webp", fileSize: 1024 }).fileSize, 1024);
  assert.throws(() => validateUploadInput({ fileName: "image.svg", fileType: "image/svg+xml", fileSize: 1024 }), /JPG/);
  assert.throws(() => validateUploadInput({ fileName: "image.jpg", fileType: "image/jpeg", fileSize: MAX_UPLOAD_BYTES + 1 }), /12 MB/);
  assert.throws(() => validateUploadInput({ fileName: "image.jpg", fileType: "image/jpeg", fileSize: -1 }), /12 MB/);
  assert.equal(validCmsPublicId("mandir/cms/abcdef1234567890"), true);
  assert.equal(validCmsPublicId("other-folder/abcdef1234567890"), false);
  assert.equal(validCmsPublicId("mandir/cms/../unsafe"), false);
});

test("image URLs cannot target arbitrary origins, SVG data, or filesystem traversal", () => {
  const previous = process.env.CLOUDINARY_CLOUD_NAME;
  process.env.CLOUDINARY_CLOUD_NAME = "test-cloud";
  try {
    assert.equal(validImageSource("/assets/temple/image.webp"), true);
    assert.equal(validImageSource("/assets/../secret.jpg"), false);
    assert.equal(validImageSource("/assets/%2e%2e/secret.jpg"), false);
    assert.equal(validImageSource("https://res.cloudinary.com/test-cloud/image/upload/v123/mandir/cms/photo.webp"), true);
    assert.equal(validImageSource("https://res.cloudinary.com/other-cloud/image/upload/photo.jpg"), false);
    assert.equal(validImageSource("https://res.cloudinary.com.attacker.example/test-cloud/image/upload/image.jpg"), false);
    assert.equal(validImageSource("javascript:alert(1)"), false);
    assert.equal(validImageSource("data:image/svg+xml,<svg />"), false);
  } finally { if (previous === undefined) delete process.env.CLOUDINARY_CLOUD_NAME; else process.env.CLOUDINARY_CLOUD_NAME = previous; }
});

test("current temple content passes validation without altering its photo sequence", () => {
  const validated = validateContent(defaultContent);
  assert.deepEqual(validated.albums.map((album) => album.photos.map((photo) => photo.id)), defaultContent.albums.map((album) => album.photos.map((photo) => photo.id)));
});

test("invalid years, orphan albums, duplicate IDs and invalid hero selections are rejected", () => {
  assert.throws(() => validateContent(mutateContent((c) => c.years.push({ ...c.years[0], id: "duplicate-year" }))), /year/i);
  assert.throws(() => validateContent(mutateContent((c) => c.albums[0].yearId = "missing-year")), /existing year/);
  assert.throws(() => validateContent(mutateContent((c) => c.albums[0].photos.push(c.albums[0].photos[0]))), /unique/);
  assert.throws(() => validateContent(mutateContent((c) => c.heroPhotoId = "missing-photo")), /hero/);
  assert.throws(() => validateRevision(Number.MAX_SAFE_INTEGER), /revision/);
});

test("CMS layout bounds and safe links are enforced on the server", () => {
  const field = cmsCopyFields[0];
  assert.throws(() => validateContent(mutateContent((c) => c.copy[field.key] = "x".repeat(field.maxLength + 1))), /characters/);
  assert.throws(() => validateContent(mutateContent((c) => c.copy["unknown.field"] = "x")), /Unknown text field/);
  assert.throws(() => validateContent(mutateContent((c) => c.settings.mapsUrl = "javascript:alert(1)")), /https/);
  assert.throws(() => validateContent(mutateContent((c) => c.settings.phoneHref = "https://attacker.example")), /phoneHref/);
  assert.throws(() => validateContent(mutateContent((c) => c.settings.darshan.morning = { opens: 12, closes: 11 })), /Closing time/);
});

test("Unicode snapshots are chunked below Firestore limits and detect missing or changed data", () => {
  const content = { text: "श्री रघुनाथ मंदिर 🪔 ".repeat(25000) };
  const encoded = encodeSnapshot(content);
  assert.ok(encoded.chunks.length > 1);
  assert.ok(encoded.chunks.every((chunk) => Buffer.byteLength(chunk) <= SNAPSHOT_CHUNK_CHARS));
  const metadata = { count: encoded.chunks.length, bytes: encoded.bytes, checksum: encoded.checksum };
  assert.deepEqual(decodeSnapshot(encoded.chunks, metadata), content);
  assert.throws(() => decodeSnapshot(encoded.chunks.slice(1), metadata), /snapshot/);
  const changed = [...encoded.chunks]; changed[0] = `A${changed[0].slice(1)}`;
  assert.throws(() => decodeSnapshot(changed, metadata), /integrity/);
});

test("visitors receive no unpublished or trashed content, while the editable draft is retained", () => {
  const draft = mutateContent((c) => {
    c.years.push({ ...c.years[0], id: "private-year", year: 2025, published: false });
    c.albums.push({ ...structuredClone(c.albums[0]), id: "private-album", yearId: "private-year" });
    c.albums[0].photos[0].deletedAt = "2026-10-17T00:00:00.000Z";
    c.albums[1].published = false;
    c.references[0].deletedAt = "2026-10-17T00:00:00.000Z";
    c.sections.push({ id: "private-note", slot: "home.after-about", type: "notice", title: "Private note", body: "Only draft", order: 0, published: false, items: [] });
  });
  const result = publicContent(draft);
  assert.equal(result.years.some((year) => year.id === "private-year"), false);
  assert.equal(result.albums.some((album) => album.id === "private-album" || album.id === draft.albums[1].id), false);
  assert.equal(result.albums[0].photos.some((photo) => photo.id === draft.albums[0].photos[0].id), false);
  assert.equal(result.references.length, 1);
  assert.equal(result.sections.length, 0);
  assert.equal(draft.albums[0].photos.length, defaultContent.albums[0].photos.length);
});

test("a new published year appears with the explicit photo order and coherent darshan times", () => {
  const draft = mutateContent((c) => {
    c.years.push({ id: "year-2025", year: 2025, title: "2025", description: "", order: 1, published: true });
    const photos = structuredClone(c.albums[0].photos);
    photos[0].order = 2; photos[2].order = 0;
    c.albums.push({ ...c.albums[0], id: "album-2025", yearId: "year-2025", photos });
  });
  const result = publicContent(validateContent(draft));
  assert.equal(result.years[1].year, 2025);
  assert.equal(result.albums.at(-1).photos[0].id, draft.albums.at(-1).photos[2].id);
  assert.throws(() => validateContent(mutateContent((c) => c.settings.darshan.morning.closes = 18)), /Morning darshan/);
  assert.equal(formatDarshanHour(5.999), "6:00");
});
