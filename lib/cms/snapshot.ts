import { createHash } from "node:crypto";
import { MAX_CONTENT_BYTES } from "./security";

// ASCII base64 keeps each Firestore string comfortably below its 1 MiB limit.
export const SNAPSHOT_CHUNK_CHARS = 600000;

export function encodeSnapshot(content: unknown) {
  const json = Buffer.from(JSON.stringify(content), "utf8");
  if (json.byteLength > MAX_CONTENT_BYTES) throw new Error("Content exceeds the snapshot size limit.");
  const encoded = json.toString("base64");
  const chunks: string[] = [];
  for (let index = 0; index < encoded.length; index += SNAPSHOT_CHUNK_CHARS) chunks.push(encoded.slice(index, index + SNAPSHOT_CHUNK_CHARS));
  return { chunks, bytes: json.byteLength, checksum: createHash("sha256").update(json).digest("hex") };
}

export function decodeSnapshot(chunks: string[], metadata: { count: number; bytes: number; checksum: string }) {
  if (!Number.isInteger(metadata.count) || metadata.count < 1 || metadata.count > 10 || chunks.length !== metadata.count ||
      !Number.isInteger(metadata.bytes) || metadata.bytes > MAX_CONTENT_BYTES || metadata.bytes < 1 ||
      chunks.some((chunk) => typeof chunk !== "string" || chunk.length > SNAPSHOT_CHUNK_CHARS || !/^[A-Za-z0-9+/=]+$/.test(chunk))) {
    throw new Error("Incomplete or invalid CMS snapshot.");
  }
  const bytes = Buffer.from(chunks.join(""), "base64");
  if (bytes.byteLength !== metadata.bytes || createHash("sha256").update(bytes).digest("hex") !== metadata.checksum) throw new Error("The CMS snapshot failed its integrity check.");
  return JSON.parse(bytes.toString("utf8"));
}
