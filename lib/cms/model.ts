export type CmsPhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  title: string;
  alt: string;
  caption: string;
  order: number;
  publicId?: string;
  deletedAt?: string;
};

export type CmsYear = {
  id: string;
  year: number;
  title: string;
  description: string;
  order: number;
  published: boolean;
};

export type CmsAlbum = {
  id: string;
  yearId: string;
  title: string;
  description: string;
  kind: "construction" | "darshan" | "festival" | "reference";
  order: number;
  published: boolean;
  photos: CmsPhoto[];
};

export type CmsContact = {
  name: string;
  nameEnglish: string;
  role: string;
  phone: string;
  displayPhone: string;
  phoneHref: string;
};

export type CmsSettings = {
  name: string;
  onlineName: string;
  location: string;
  address: string;
  phone: string;
  displayPhone: string;
  phoneHref: string;
  contacts: CmsContact[];
  mapsUrl: string;
  googleListingUrl: string;
  locationSource: string;
  timeZone: string;
  darshan: { morning: { opens: number; closes: number }; evening: { opens: number; closes: number } };
};

export type CmsSection = {
  id: string;
  slot: "home.after-about" | "home.after-gallery" | "home.before-contact" | "photos.after-intro" | "photos.after-gallery";
  type: "text" | "notice" | "cards" | "image-text";
  title: string;
  body: string;
  order: number;
  published: boolean;
  image?: CmsPhoto;
  items: { id: string; title: string; body: string }[];
};

export type CmsContent = {
  schemaVersion: 1;
  settings: CmsSettings;
  copy: Record<string, string>;
  years: CmsYear[];
  albums: CmsAlbum[];
  homePhotos: CmsPhoto[];
  heroPhotoId: string;
  references: CmsPhoto[];
  sections: CmsSection[];
};

export type CmsDraft = { content: CmsContent; revision: number; publishedAt: string | null; updatedAt: string | null };
export type CmsCopyField = { key: string; label: string; group: string; defaultValue: string; maxLength: number };

export function activePhotos(photos: CmsPhoto[]) {
  return photos.filter((photo) => !photo.deletedAt).sort((a, b) => a.order - b.order);
}

export function formatDarshanHour(value: number) {
  const totalMinutes = Math.round(value * 60);
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")}`;
}
