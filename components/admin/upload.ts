"use client";

import type { CmsPhoto } from "@/lib/cms/model";

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: "same-origin",
    cache: "no-store",
    ...options,
    headers: { ...(options?.body instanceof FormData ? {} : { "Content-Type": "application/json" }), ...options?.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(typeof data.error === "string" ? data.error : `Request failed (${response.status}).`) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }
  return data as T;
}

async function prepareImage(file: File): Promise<File> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error(`${file.name}: JPG, PNG या WebP तस्वीर चुनें।`);
  }
  if (file.size > 30 * 1024 * 1024) throw new Error(`${file.name}: तस्वीर 30 MB से छोटी होनी चाहिए।`);
  const url = URL.createObjectURL(file);
  try {
    const image = new window.Image();
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error(`${file.name}: यह तस्वीर खुल नहीं सकी।`));
      image.src = url;
    });
    const scale = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("इस browser में तस्वीर तैयार नहीं हो सकी। दूसरा browser आज़माएँ।");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error("तस्वीर तैयार नहीं हो सकी।")), "image/webp", 0.88);
    });
    const extension = blob.type === "image/webp" ? "webp" : "png";
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.${extension}`, { type: blob.type });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function uploadPhoto(file: File): Promise<CmsPhoto> {
  const prepared = await prepareImage(file);
  const signed = await apiRequest<{ url: string; fields: Record<string, string>; publicId: string; maxBytes: number }>("/api/admin/upload", {
    method: "POST",
    body: JSON.stringify({ fileName: prepared.name, fileType: prepared.type, fileSize: prepared.size }),
  });
  if (prepared.size > signed.maxBytes) throw new Error(`${file.name}: तैयार तस्वीर upload सीमा से बड़ी है।`);
  const body = new FormData();
  Object.entries(signed.fields).forEach(([key, value]) => body.append(key, String(value)));
  body.append("file", prepared);
  const response = await fetch(signed.url, { method: "POST", body });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error?.message || `${file.name}: Upload नहीं हो सका।`);
  const verified = await apiRequest<{ photo: CmsPhoto }>("/api/admin/media", {
    method: "POST",
    body: JSON.stringify({ publicId: signed.publicId }),
  });
  return verified.photo;
}
