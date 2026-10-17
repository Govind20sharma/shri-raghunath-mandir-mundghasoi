"use client";

import Image from "next/image";
import { useCmsContent, useCmsCopy } from "@/components/cms-content-provider";
import { activePhotos } from "@/lib/cms/model";

export function ProposedLook() {
  const content = useCmsContent();
  const copy = useCmsCopy();
  const images = activePhotos(content.references);
  if (!images.length) return null;
  return <section className="wrap proposed-look-section" id="proposed-look" aria-labelledby="proposed-look-title">
    <div className="proposed-look-heading">
      <p className="section-label">{copy("photos.references.label")}</p>
      <h2 className="section-title" id="proposed-look-title">{copy("photos.references.title")}</h2>
      <p className="proposed-look-intro">{copy("photos.references.intro")}</p>
    </div>
    <div className="proposed-look-grid">{images.map((image) => <a className="proposed-look-card" key={image.id} href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`${image.title} — संदर्भ की बड़ी तस्वीर नए टैब में देखें`}>
      <figure><span className="proposed-look-image"><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 700px) 90vw, 600px" /><span className="proposed-look-badge">{copy("photos.references.badge")}</span></span>
        <figcaption><h3>{image.title}</h3><p>{image.caption}</p><span className="text-button">{copy("photos.references.view")} <span aria-hidden="true">↗</span></span></figcaption>
      </figure>
    </a>)}</div>
  </section>;
}
