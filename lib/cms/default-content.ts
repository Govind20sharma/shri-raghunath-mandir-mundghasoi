import { temple } from "@/lib/temple";
import { templePhotos } from "@/lib/gallery";
import { constructionPhotos, constructionStages } from "@/lib/gallery-2026";
import type { CmsContent, CmsPhoto } from "./model";

export const defaultReferences: CmsPhoto[] = [
  {
    id: "reference-exterior", src: "/assets/temple/proposed/future-exterior-reference.webp", width: 1600, height: 900,
    title: "बाहरी रंग और सजावट", order: 0,
    alt: "क्रीम और लाल रंग, सुनहरी किनारियों, छतरियों और सीढ़ियों वाले मंदिर के बाहरी रूप की संदर्भ तस्वीर",
    caption: "क्रीम रंग की दीवारें, लाल और सुनहरी किनारियाँ, सजी हुई छतरियाँ और सुंदर प्रवेश द्वार — बाहरी स्वरूप के लिए हमारी प्रेरणा।",
  },
  {
    id: "reference-interior", src: "/assets/temple/proposed/future-interior-reference.webp", width: 1086, height: 1448,
    title: "अंदर की सजावट और रोशनी", order: 1,
    alt: "संगमरमर के फर्श, सुनहरी सजावट, गर्म रोशनी और लाल पर्दों वाले मंदिर के अंदर की संदर्भ तस्वीर",
    caption: "छत पर सुनहरी सजावट और गर्म रोशनी, गर्भगृह के पास लाल पर्दे और संगमरमर का प्रार्थना परिसर — अंदर की साज-सज्जा की परिकल्पना।",
  },
];

export const defaultContent: CmsContent = {
  schemaVersion: 1,
  settings: { ...temple, contacts: temple.contacts.map((contact) => ({ ...contact })) },
  copy: {},
  years: [{ id: "year-2026", year: 2026, title: "निर्माण से तैयार मंदिर तक।", description: "छत की ढलाई, शिखर की चिनाई, साज-सज्जा और मंदिर के दर्शन — क्रम से देखें।", order: 0, published: true }],
  albums: constructionStages.map((stage, order) => ({
    id: stage.id, yearId: "year-2026", title: stage.title, description: stage.description,
    kind: "construction", order, published: true,
    photos: constructionPhotos.filter((photo) => photo.stageId === stage.id).map((photo, photoOrder) => ({
      id: `construction-${photo.id}`, src: photo.src, width: photo.width, height: photo.height,
      title: photo.title, alt: photo.alt, caption: photo.caption, order: photoOrder,
    })),
  })),
  homePhotos: templePhotos.map((photo, order) => ({ ...photo, id: `home-${order + 1}`, width: 960, height: 1280, order })),
  heroPhotoId: "home-1",
  references: defaultReferences,
  sections: [],
};
