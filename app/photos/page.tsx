import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ConstructionGallery } from "@/components/construction-gallery";
import { ProposedLook } from "@/components/proposed-look";
import { CmsContentProvider } from "@/components/cms-content-provider";
import { CmsSections } from "@/components/cms-sections";
import { getPageContent, getPublishedContent } from "@/lib/cms/server";
import { activePhotos } from "@/lib/cms/model";
import { resolveCmsCopy } from "@/lib/cms/copy-fields";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPublishedContent();
  const title = resolveCmsCopy(content, "photos.title");
  const description = resolveCmsCopy(content, "photos.description").replace(/\n/g, " ");
  return { title: `${title} | ${content.settings.name}`, description, alternates: { canonical: "/photos" }, openGraph: { title, description, url: "/photos" } };
}

export default async function PhotosPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const { preview } = await searchParams;
  const content = await getPageContent(preview === "1");
  const copy = (key: string) => resolveCmsCopy(content, key);
  const years = content.years.filter((year) => year.published && content.albums.some((album) => album.yearId === year.id && album.published && activePhotos(album.photos).length)).sort((a, b) => a.order - b.order);
  return <CmsContentProvider content={content}>
    <SiteHeader />
    <main id="main" className="photos-page">
      <div className="wrap photos-intro">
        <Link className="photos-back" href="/"><span aria-hidden="true">←</span> {copy("photos.back")}</Link>
        <p className="section-label">{copy("photos.label")}</p>
        <h1>{copy("photos.title")}</h1>
        <p className="photos-description" style={{whiteSpace:"pre-line"}}>{copy("photos.description")}</p>
        <div className="photos-collection-links">
          {years.map((year) => <a className="photos-year-link" href={`#year-${year.year}`} key={year.id}>{year.year} <span>{year.title}</span><span aria-hidden="true">↓</span></a>)}
          {activePhotos(content.references).length > 0 && <a className="photos-year-link" href="#proposed-look">{copy("photos.referenceLink")} <span aria-hidden="true">↓</span></a>}
        </div>
      </div>
      <CmsSections slot="photos.after-intro" />
      <ConstructionGallery />
      <ProposedLook />
      <CmsSections slot="photos.after-gallery" />
    </main>
    <SiteFooter />
  </CmsContentProvider>;
}
