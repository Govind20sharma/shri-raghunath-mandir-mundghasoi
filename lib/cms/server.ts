import "server-only";
import { randomUUID } from "node:crypto";
import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import { defaultContent } from "./default-content";
import { firestore, isFirebaseConfigured } from "./firebase";
import { getAdminUser } from "./auth";
import { CmsError } from "./errors";
import type { CmsContent, CmsDraft } from "./model";
import { decodeSnapshot, encodeSnapshot } from "./snapshot";
import { validateContent } from "./validation";
import { publicContent } from "./public-content";

export const CMS_CACHE_TAG = "mandir-cms-published";
type CmsState = { revision: number; draftSnapshot: string; publishedSnapshot: string | null; publishedAt: string | null; updatedAt: string };

function initialDraft(): CmsDraft {
  return { content: structuredClone(defaultContent), revision: 0, publishedAt: null, updatedAt: null };
}
function stateRef() { return firestore().doc("cms/state"); }

function parseState(value: unknown): CmsState {
  const state = value as CmsState;
  if (!state || !Number.isSafeInteger(state.revision) || state.revision < 1 || typeof state.draftSnapshot !== "string" ||
      (state.publishedSnapshot !== null && typeof state.publishedSnapshot !== "string") || typeof state.updatedAt !== "string") throw new Error("Invalid CMS state. Restore the latest backup before editing.");
  return state;
}

async function readSnapshot(snapshotId: string): Promise<CmsContent> {
  if (!/^[a-zA-Z0-9-]{12,100}$/.test(snapshotId)) throw new Error("Invalid CMS snapshot ID.");
  const ref = firestore().doc(`cmsSnapshots/${snapshotId}`);
  const [metadata, parts] = await Promise.all([ref.get(), ref.collection("chunks").orderBy("index").get()]);
  if (!metadata.exists) throw new Error("The CMS snapshot is missing.");
  const value = metadata.data()!;
  return validateContent(decodeSnapshot(parts.docs.map((doc) => doc.data().value), { count: value.chunkCount, bytes: value.bytes, checksum: value.checksum }));
}

async function writeSnapshot(content: CmsContent) {
  const value = encodeSnapshot(content);
  const snapshotId = randomUUID();
  const ref = firestore().doc(`cmsSnapshots/${snapshotId}`);
  const batch = firestore().batch();
  batch.create(ref, { chunkCount: value.chunks.length, bytes: value.bytes, checksum: value.checksum, createdAt: new Date().toISOString(), schemaVersion: 1 });
  value.chunks.forEach((chunk, index) => batch.create(ref.collection("chunks").doc(String(index).padStart(3, "0")), { index, value: chunk }));
  await batch.commit();
  return snapshotId;
}

async function discardUnreferencedSnapshot(snapshotId: string) {
  // Only used after a definitive revision conflict, before the snapshot was referenced.
  const ref = firestore().doc(`cmsSnapshots/${snapshotId}`);
  const docs = await ref.collection("chunks").get();
  const batch = firestore().batch();
  docs.docs.forEach((doc) => batch.delete(doc.ref));
  batch.delete(ref);
  await batch.commit();
}

export async function getDraftContent(): Promise<CmsDraft> {
  if (!isFirebaseConfigured()) return initialDraft();
  const result = await stateRef().get();
  if (!result.exists) return initialDraft();
  const state = parseState(result.data());
  return { content: await readSnapshot(state.draftSnapshot), revision: state.revision, updatedAt: state.updatedAt, publishedAt: state.publishedAt };
}

async function readPublishedContent(): Promise<CmsContent> {
  if (!isFirebaseConfigured()) return structuredClone(defaultContent);
  const result = await stateRef().get();
  if (!result.exists) return structuredClone(defaultContent);
  const state = parseState(result.data());
  return state.publishedSnapshot ? readSnapshot(state.publishedSnapshot) : structuredClone(defaultContent);
}

const cachedPublishedContent = unstable_cache(readPublishedContent, ["mandir-cms-published-v1"], { revalidate: 300, tags: [CMS_CACHE_TAG] });

export async function getPublishedContent(): Promise<CmsContent> { return publicContent(await cachedPublishedContent()); }

export async function getPageContent(preview = false): Promise<CmsContent> {
  if (preview && await getAdminUser()) return (await getDraftContent()).content;
  return getPublishedContent();
}

export async function saveDraftContent(content: CmsContent, expectedRevision: number): Promise<CmsDraft> {
  if (!isFirebaseConfigured()) throw new CmsError(503, "Connect Firebase before saving content.", "not_configured");
  const validated = validateContent(content);
  const snapshotId = await writeSnapshot(validated);
  const now = new Date().toISOString();
  try {
    const state = await firestore().runTransaction(async (transaction) => {
      const ref = stateRef();
      const existing = await transaction.get(ref);
      const previous = existing.exists ? parseState(existing.data()) : null;
      if ((previous?.revision || 0) !== expectedRevision) throw new CmsError(409, "Content changed in another tab. Reload the latest draft before saving.", "revision_conflict");
      const updated: CmsState = { revision: expectedRevision + 1, draftSnapshot: snapshotId, publishedSnapshot: previous?.publishedSnapshot || null, publishedAt: previous?.publishedAt || null, updatedAt: now };
      transaction.set(ref, updated);
      return updated;
    });
    return { content: validated, revision: state.revision, publishedAt: state.publishedAt, updatedAt: state.updatedAt };
  } catch (error) {
    if (error instanceof CmsError && error.status === 409) await discardUnreferencedSnapshot(snapshotId).catch(() => undefined);
    throw error;
  }
}

export async function publishDraftContent(expectedRevision: number): Promise<CmsDraft> {
  if (!isFirebaseConfigured()) throw new CmsError(503, "Connect Firebase before publishing content.", "not_configured");
  const current = await getDraftContent();
  if (current.revision !== expectedRevision) throw new CmsError(409, "Content changed in another tab. Reload the latest draft before publishing.", "revision_conflict");
  validateContent(current.content);
  const bootstrapSnapshot = current.revision === 0 ? await writeSnapshot(current.content) : null;
  const now = new Date().toISOString();
  try {
    const state = await firestore().runTransaction(async (transaction) => {
      const ref = stateRef();
      const existing = await transaction.get(ref);
      const previous = existing.exists ? parseState(existing.data()) : null;
      if ((previous?.revision || 0) !== expectedRevision) throw new CmsError(409, "Content changed in another tab. Reload before publishing.", "revision_conflict");
      const snapshotId = previous?.draftSnapshot || bootstrapSnapshot;
      if (!snapshotId) throw new Error("No draft snapshot is available.");
      const updated: CmsState = { revision: expectedRevision + 1, draftSnapshot: snapshotId, publishedSnapshot: snapshotId, publishedAt: now, updatedAt: now };
      transaction.set(ref, updated);
      return updated;
    });
    revalidateTag(CMS_CACHE_TAG, { expire: 0 });
    revalidatePath("/", "layout");
    return { content: current.content, revision: state.revision, publishedAt: now, updatedAt: now };
  } catch (error) {
    if (bootstrapSnapshot && error instanceof CmsError && error.status === 409) await discardUnreferencedSnapshot(bootstrapSnapshot).catch(() => undefined);
    throw error;
  }
}

export function mediaPublicIds(content: CmsContent) {
  return new Set([...content.homePhotos, ...content.references, ...content.albums.flatMap((album) => album.photos), ...content.sections.flatMap((section) => section.image ? [section.image] : [])]
    .map((photo) => photo.publicId).filter((id): id is string => Boolean(id)));
}

export async function isMediaReferenced(publicId: string) {
  // Read published data directly: a stale cache must never allow a live image to be deleted.
  const [draft, published] = await Promise.all([getDraftContent(), readPublishedContent()]);
  return mediaPublicIds(draft.content).has(publicId) || mediaPublicIds(published).has(publicId);
}
