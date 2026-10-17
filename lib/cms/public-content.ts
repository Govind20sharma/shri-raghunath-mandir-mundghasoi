import { activePhotos, type CmsContent } from "./model";

/** Only public content may be serialized into a visitor's page payload. */
export function publicContent(content: CmsContent): CmsContent {
  const years = content.years.filter((year) => year.published);
  const yearIds = new Set(years.map((year) => year.id));
  const homePhotos = activePhotos(content.homePhotos);
  return {
    ...content,
    years,
    albums: content.albums.filter((album) => album.published && yearIds.has(album.yearId))
      .map((album) => ({ ...album, photos: activePhotos(album.photos) })),
    homePhotos,
    heroPhotoId: homePhotos.some((photo) => photo.id === content.heroPhotoId) ? content.heroPhotoId : homePhotos[0]?.id || "",
    references: activePhotos(content.references),
    sections: content.sections.filter((section) => section.published && (section.type !== "image-text" || (section.image && !section.image.deletedAt)))
      .map((section) => {
        if (section.image?.deletedAt) { const { image: _image, ...rest } = section; return rest; }
        return section;
      }),
  };
}
