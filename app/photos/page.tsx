import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConstructionGallery } from "@/components/construction-gallery";
import { constructionPhotos } from "@/lib/gallery-2026";

export const metadata: Metadata = {
  title: "तस्वीरें — 2026 | श्री रघुनाथ मंदिर, मूंडघसोई",
  description:
    "श्री रघुनाथ मंदिर के 2026 फोटो संग्रह में निर्माण की शुरुआत, शिखर की चिनाई, साज-सज्जा और तैयार मंदिर की 116 तस्वीरें क्रम से देखें।",
  alternates: { canonical: "/photos" },
  openGraph: {
    title: "तस्वीरों में मंदिर की यात्रा | श्री रघुनाथ मंदिर",
    description:
      "2026 फोटो संग्रह — निर्माण की शुरुआत से शिखर और छतरियों से सजे मंदिर तक।",
    url: "/photos",
    images: [
      {
        url: constructionPhotos[constructionPhotos.length - 1].src,
        alt: "शिखर और छतरियों से सजा श्री रघुनाथ मंदिर",
      },
    ],
  },
};

export default function PhotosPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="photos-page">
        <div className="wrap photos-intro">
          <Link className="photos-back" href="/">
            <span aria-hidden="true">←</span> मुख्य पृष्ठ
          </Link>
          <p className="section-label">हमारे मंदिर की यादें</p>
          <h1>तस्वीरों में मंदिर की यात्रा।</h1>
          <p className="photos-description">
            सेवा में जुटे हाथ, आकार लेता शिखर और प्रभु का सजा हुआ धाम।
            <br />
            मंदिर के निर्माण से तैयार रूप तक, हर पड़ाव की एक याद।
          </p>
          <a className="photos-year-link" href="#year-2026">
            2026 <span>निर्माण से तैयार मंदिर तक</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>
        <ConstructionGallery />
      </main>
      <SiteFooter />
    </>
  );
}
