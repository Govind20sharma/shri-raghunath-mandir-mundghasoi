#!/usr/bin/env node
// Dry-run by default. Never removes repository assets or existing snapshots.
const { repoRoot } = require("./cms-source-loader.cjs");
const fs = require("node:fs");
const path = require("node:path");
const { createHash, randomUUID } = require("node:crypto");
if (fs.existsSync(path.join(repoRoot, ".env.local"))) process.loadEnvFile(path.join(repoRoot, ".env.local"));
const { defaultContent } = require("../lib/cms/default-content.ts");
const { validateContent } = require("../lib/cms/validation.ts");
const { encodeSnapshot } = require("../lib/cms/snapshot.ts");
const { MAX_UPLOAD_BYTES } = require("../lib/cms/security.ts");
const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const value = (name) => { const i = args.indexOf(name); return i < 0 ? undefined : args[i + 1]; };
const expectedRevision = Number(value("--expected-revision") || 0);

async function main() {
  const imported = value("--input") ? JSON.parse(fs.readFileSync(path.resolve(value("--input")), "utf8")) : defaultContent;
  let content = structuredClone(imported.content || imported);
  content = validateContent(content);
  const photos = [...content.homePhotos, ...content.references, ...content.albums.flatMap((a) => a.photos), ...content.sections.flatMap((s) => s.image ? [s.image] : [])];
  const local = new Map(photos.filter((p) => p.src.startsWith("/assets/")).map((p) => [p.src, p]));
  let totalBytes = 0;
  for (const src of local.keys()) {
    const localPath = path.resolve(repoRoot, "public", src.slice(1));
    const publicRoot = path.resolve(repoRoot, "public") + path.sep;
    if (!localPath.startsWith(publicRoot)) throw new Error("An asset path escapes the public directory.");
    const size = fs.statSync(localPath).size;
    if (size > MAX_UPLOAD_BYTES) throw new Error(`A local image exceeds the 12 MB upload limit: ${src}`);
    totalBytes += size;
  }
  console.log(`Validated ${photos.length} photo placements; ${local.size} unique local images; ${(totalBytes / 1024 / 1024).toFixed(1)} MB.`);
  if (value("--export")) {
    fs.writeFileSync(path.resolve(value("--export")), JSON.stringify(content, null, 2));
    console.log("Content JSON exported. No credentials are included.");
  }
  if (!flag("--write")) { console.log("Dry run only. Add --write to seed Firestore; --upload-local also moves image references to Cloudinary; --publish explicitly publishes the new snapshot."); return; }
  if (!Number.isSafeInteger(expectedRevision) || expectedRevision < 0) throw new Error("--expected-revision must be a non-negative integer.");
  const { cert, initializeApp } = require("firebase-admin/app");
  const { getFirestore } = require("firebase-admin/firestore");
  const credentials = process.env.FIREBASE_SERVICE_ACCOUNT_JSON ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) : { project_id: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, client_email: process.env.FIREBASE_CLIENT_EMAIL, private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") };
  if (!credentials.project_id || !credentials.client_email || !credentials.private_key) throw new Error("Server Firebase credentials are required for --write.");
  const app = initializeApp({ credential: cert({ projectId: credentials.project_id, clientEmail: credentials.client_email, privateKey: credentials.private_key }) }, "mandir-migration");
  const db = getFirestore(app);
  const stateRef = db.doc("cms/state");
  const before = await stateRef.get();
  if ((before.data()?.revision || 0) !== expectedRevision) throw new Error("Existing CMS content has a different revision. Export/back up the current draft, then provide its --expected-revision explicitly.");
  if (flag("--upload-local")) {
    const cloud = process.env.CLOUDINARY_CLOUD_NAME, key = process.env.CLOUDINARY_API_KEY, secret = process.env.CLOUDINARY_API_SECRET, preset = process.env.CLOUDINARY_UPLOAD_PRESET;
    if (!cloud || !key || !secret || !preset) throw new Error("Cloudinary credentials and the signed upload preset are required for --upload-local.");
    let index = 0;
    for (const [src] of local) {
      const bytes = fs.readFileSync(path.join(repoRoot, "public", src.slice(1)));
      const publicId = `mandir/cms/${createHash("sha256").update(bytes).digest("hex").slice(0, 32)}`;
      const authHeaders = { authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}` };
      const existing = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/resources/image/upload/${encodeURIComponent(publicId)}`, { headers: authHeaders, signal: AbortSignal.timeout(30000) });
      let resource;
      if (existing.ok) resource = await existing.json();
      else if (existing.status === 404) {
        const fields = { timestamp: String(Math.floor(Date.now() / 1000)), public_id: publicId, overwrite: "false", allowed_formats: "jpg,jpeg,png,webp", upload_preset: preset, unique_filename: "false", use_filename: "false" };
        const signature = createHash("sha1").update(Object.keys(fields).sort().map((k) => `${k}=${fields[k]}`).join("&") + secret).digest("hex");
        const form = new FormData();
        for (const [name, field] of Object.entries({ ...fields, api_key: key, signature })) form.set(name, field);
        form.set("file", new Blob([bytes]), path.basename(src));
        const uploaded = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body: form, signal: AbortSignal.timeout(120000) });
        if (!uploaded.ok) throw new Error(`Cloudinary upload failed (${uploaded.status}); migration has stopped before changing the CMS pointer.`);
        resource = await uploaded.json();
      } else throw new Error(`Cloudinary resource check failed (${existing.status}); no CMS pointer was changed.`);
      if (resource.public_id !== publicId || resource.resource_type !== "image" || !["jpg", "jpeg", "png", "webp"].includes(resource.format) || resource.bytes > MAX_UPLOAD_BYTES || !resource.width || !resource.height) throw new Error("Cloudinary returned invalid media metadata.");
      for (const photo of photos.filter((p) => p.src === src)) Object.assign(photo, { src: resource.secure_url, publicId, width: resource.width, height: resource.height });
      console.log(`Media ${++index}/${local.size} ready.`);
    }
  }
  content = validateContent(content);
  const encoded = encodeSnapshot(content), snapshotId = randomUUID(), now = new Date().toISOString();
  const snapshot = db.doc(`cmsSnapshots/${snapshotId}`), batch = db.batch();
  batch.create(snapshot, { chunkCount: encoded.chunks.length, bytes: encoded.bytes, checksum: encoded.checksum, createdAt: now, schemaVersion: 1 });
  encoded.chunks.forEach((chunk, index) => batch.create(snapshot.collection("chunks").doc(String(index).padStart(3, "0")), { index, value: chunk }));
  await batch.commit();
  await db.runTransaction(async (transaction) => {
    const existing = await transaction.get(stateRef), previous = existing.data();
    if ((previous?.revision || 0) !== expectedRevision) throw new Error("CMS revision changed during migration; new snapshot retained without changing the live pointer.");
    transaction.set(stateRef, { revision: expectedRevision + 1, draftSnapshot: snapshotId, publishedSnapshot: flag("--publish") ? snapshotId : previous?.publishedSnapshot || null, publishedAt: flag("--publish") ? now : previous?.publishedAt || null, updatedAt: now });
  });
  console.log(`Saved revision ${expectedRevision + 1} as ${flag("--publish") ? "published" : "draft"}. Original assets are intact. Publish from /admin to refresh the site cache immediately.`);
  await db.terminate();
}
main().catch((error) => { console.error(error instanceof Error ? error.message : "Migration failed."); process.exitCode = 1; });
