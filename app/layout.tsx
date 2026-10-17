import type { Metadata, Viewport } from "next";
import { Hind, Noto_Serif_Devanagari } from "next/font/google";
import { getPublishedContent } from "@/lib/cms/server";
import { activePhotos } from "@/lib/cms/model";
import { getCmsScheduleValues, resolveCmsCopy } from "@/lib/cms/copy-fields";
import "./globals.css";

const bodyFont = Hind({
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-body",
});

const headingFont = Noto_Serif_Devanagari({
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-heading",
});

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedContent();
  const values = { name: content.settings.name, phone: content.settings.phone, ...getCmsScheduleValues(content.settings) };
  const photos = activePhotos(content.homePhotos);
  const hero = photos.find(photo => photo.id === content.heroPhotoId) ?? photos[0];
  return {
  title: resolveCmsCopy(content, "meta.title", "", values),
  description: resolveCmsCopy(content, "meta.description", "", values),
  metadataBase: new URL("https://shri-raghunath-mandir-mundghasoi.vercel.app"),
  applicationName: content.settings.name,
  keywords: [
    "श्री रघुनाथ मंदिर मूंडघसोई",
    "Radha Krishna Mandir Mundghasoi",
    "मूंडघसोई मंदिर",
    "Mundghasoi temple",
  ],
  openGraph: {
    title: resolveCmsCopy(content, "meta.title", "", values),
    description: resolveCmsCopy(content, "meta.socialDescription", "", values),
    locale: "hi_IN",
    type: "website",
    images: hero ? [
      {
        url: hero.src,
        width: hero.width,
        height: hero.height,
        alt: hero.alt,
      },
    ] : [],
  },
  };
}

export const viewport: Viewport = { themeColor: "#681f24" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
