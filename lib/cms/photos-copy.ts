import type { CmsCopyField } from "./model";

const fields = {
  "photos.back": ["मुख्य पृष्ठ", 80],
  "photos.label": ["हमारे मंदिर की यादें", 100],
  "photos.title": ["तस्वीरों में मंदिर की यात्रा।", 160],
  "photos.description": ["सेवा में जुटे हाथ, आकार लेता शिखर और प्रभु का सजा हुआ धाम।\nमंदिर के निर्माण से तैयार रूप तक, हर पड़ाव की एक याद।", 700],
  "photos.referenceLink": ["प्रस्तावित स्वरूप", 80],
  "photos.yearLabel": ["{year} का फोटो संग्रह", 100],
  "photos.count": ["{photos} तस्वीरें · {albums} पड़ाव", 100],
  "photos.first": ["पहली तस्वीर से देखें", 80],
  "photos.endnote": ["हर ईंट में सेवा, हर तस्वीर में श्रद्धा।", 300],
  "photos.visit": ["मंदिर पधारें", 80],
  "photos.references.label": ["भावी स्वरूप की परिकल्पना", 100],
  "photos.references.title": ["हमारे मंदिर का प्रस्तावित स्वरूप।", 160],
  "photos.references.intro": ["हम अपने मंदिर को आगे इस तरह सजाना चाहते हैं। ये तस्वीरें बाहरी रूप और अंदर की सजावट के लिए संदर्भ के रूप में साझा की गई हैं।", 900],
  "photos.references.badge": ["संदर्भ तस्वीर", 60],
  "photos.references.view": ["बड़ी तस्वीर देखें", 80],
} as const;

export const photosCopyFields: CmsCopyField[] = Object.entries(fields).map(([key, [defaultValue, maxLength]]) => ({ key, label: defaultValue, defaultValue, maxLength, group: "तस्वीरों का पृष्ठ" }));
