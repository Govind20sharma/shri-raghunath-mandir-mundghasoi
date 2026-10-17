# Mandir CMS setup and operations

The website and `/admin` run on the existing Vercel project. Firebase supplies Google authentication and the private content database; Cloudinary stores new photos. Existing repository images remain valid and are never removed by the migration script.

## Connect Firebase

1. Create a Firebase project and register a Web app. Enable **Authentication → Google**. Add the production website hostname and any approved preview hostname to Authentication's authorized domains. Use `localhost` only for local development.
2. Create the default **Cloud Firestore** database in production/locked mode. Choose a nearby region appropriate for the site's visitors. Publish the deny-all client rules in `scripts/firestore.rules`: neither visitors nor browser SDKs access database documents directly.
3. Create a service account for the server with the minimum necessary Firestore read/write and Firebase Authentication administrative permissions. Supply the service-account values as Vercel server environment variables. Keep its private key out of Git, browser code, screenshots, and chat.
4. Copy the four Firebase Web-app identifiers into `NEXT_PUBLIC_FIREBASE_*`. They identify the app and are safe for the browser. `CMS_ADMIN_EMAILS` defaults to `govindsharma5768@gmail.com`; a comma-separated list grants additional administrators access.
5. Google sign-in must return a verified email from this allowlist. Session creation also requires authentication within five minutes. Server cookies last 12 hours, are HttpOnly and SameSite Strict, and are Secure in production. Every protected request checks token revocation. Disable a Firebase user or revoke their refresh tokens to terminate access.

## Connect Cloudinary

1. Use the Cloudinary product environment's cloud name, API key, and API secret for the `CLOUDINARY_*` server variables.
2. Create a **signed** upload preset named `mandir_cms` (or set `CLOUDINARY_UPLOAD_PRESET` to its name). Configure allowed image formats `jpg,jpeg,png,webp`, maximum file size **12,582,912 bytes**, and no automatic moderation/transformation that changes the required photo dimensions unexpectedly. Never enable an unsigned version of this CMS preset.
3. The server signs unique `mandir/cms/<random-id>` image paths with `overwrite=false`, allowed formats and the fixed preset. Photos upload directly from the browser to Cloudinary; they are not proxied through Vercel's request-body limit. Afterwards the server fetches the provider's resource metadata and validates its identity, type, size and dimensions before accepting it into the CMS.
4. The Cloudinary secret is never returned by `/api/admin/status` or sent to the browser. The upload response contains only a narrowly scoped signed upload and its public API key. Configure account usage alerts and review the provider dashboard's current free-plan quota before a bulk migration.

## Environment and deployment

Use `.env.example` as the variable checklist. Store local credentials in ignored `.env.local`; set the corresponding values on the **existing Govind-owned Vercel project**, then redeploy because Next.js embeds public Firebase identifiers at build time. Keep production and preview environments separate if preview deploys should not be able to modify production content. No Firebase Storage bucket or payment-enabled Firebase Storage integration is required for this implementation.

Open `/admin`, sign in with the authorized Google account, save the initial draft, preview it, then publish. Before Firebase is configured, or before its first content document exists, the site renders its current built-in content. A configured database error is surfaced; it never silently replaces an existing draft with defaults. Text editing works with Firebase alone; photo upload additionally requires Cloudinary.

## Publishing, restore and limits

- Saving changes only the private draft. Preview requires the same administrator's HttpOnly cookie. A visitor cannot reveal drafts by adding a preview URL parameter.
- Publishing atomically moves the published snapshot pointer and refreshes the Vercel content cache. No Git commit or site build is required for content edits. Concurrent edits return HTTP 409 instead of overwriting another tab's changes.
- Photos use explicit order values. Years and albums are separate records; a new published year and its published albums appear automatically. Sections use approved layout types and server-enforced field lengths and image/link validation.
- Trash adds `deletedAt`; restoring removes it. Original files are retained, so historical snapshots and restored images still work. Permanent file purging is deliberately disabled until a defined retention/backup process exists. Trashing a photo does not reclaim Cloudinary storage immediately.
- Content snapshots are immutable, checksum-verified JSON chunks of at most 600,000 ASCII characters per Firestore document. The complete content JSON is limited to 3 MiB. Images themselves live in Cloudinary, not Firestore. Historical snapshot cleanup and Cloudinary usage should be reviewed periodically.
- Back up `cms/state`, `cmsSnapshots`, and account credentials separately before any manual database maintenance. Do not delete snapshot chunks directly. To recover a historical snapshot, export its decoded content and import it as a new draft using the migration script with the current explicit revision; then review and publish normally.

## Optional initial asset migration

The current asset URLs work through the CMS immediately. Moving existing images to Cloudinary is optional and must fit the account's quota. The script preserves captions, IDs, photo sequence, album/year membership and original local files. It uploads each unique local image once and reuses deterministic file-hash IDs if interrupted and rerun.

```powershell
# Validate the current default content and local assets; no network writes.
node scripts/cms-migrate.cjs

# Export a portable content JSON file without credentials.
node scripts/cms-migrate.cjs --export content-backup.json

# Seed a first private draft. Add --upload-local to migrate its image references.
node scripts/cms-migrate.cjs --write --upload-local

# Import an exported draft into an existing CMS only after backing it up.
node scripts/cms-migrate.cjs --input content-backup.json --write --expected-revision 7

# Run the meaningful security and content-integrity checks.
node --test scripts/cms-security.test.cjs
```

The migration script loads `.env.local` if present and otherwise uses the process environment. It refuses a revision mismatch. It does not publish unless `--publish` is explicitly supplied; publishing through `/admin` is preferred because it refreshes the content cache immediately. An interrupted migration may leave unreferenced provider files or snapshots, but it does not partially publish content or delete the original assets.
