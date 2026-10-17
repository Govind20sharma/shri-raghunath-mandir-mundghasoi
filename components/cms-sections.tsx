"use client";

import Image from "next/image";
import { useCmsContent } from "@/components/cms-content-provider";
import type { CmsContent, CmsSection } from "@/lib/cms/model";

export function CmsSections({ slot, content: suppliedContent }: { slot: CmsSection["slot"]; content?: CmsContent }) {
  const currentContent = useCmsContent();
  const content = suppliedContent ?? currentContent;
  const sections = content.sections.filter(section => section.published && section.slot === slot).sort((a, b) => a.order - b.order);
  return <>{sections.map(section => (
    <section className="section wrap cms-public-section" key={section.id} aria-labelledby={`cms-${section.id}-title`} style={{ overflowWrap: "anywhere" }}>
      <h2 className="section-title" id={`cms-${section.id}-title`}>{section.title}</h2>
      {section.body && <p className={section.type === "notice" ? "dialog-note" : "section-intro"} style={{ whiteSpace: "pre-line", maxWidth: "none", overflowWrap: "anywhere" }}>{section.body}</p>}
      {section.type === "cards" && <div className="ritual-grid" style={{ marginTop: 24 }}>{section.items.map(item => <article className="ritual-card" key={item.id}><h3>{item.title}</h3><p className="ritual-description" style={{ whiteSpace: "pre-line", overflowWrap: "anywhere" }}>{item.body}</p></article>)}</div>}
      {section.type === "image-text" && section.image && !section.image.deletedAt && <figure style={{ marginTop: 24, maxWidth: 900 }}><Image src={section.image.src} alt={section.image.alt} width={section.image.width} height={section.image.height} sizes="(max-width: 900px) 90vw, 900px" style={{ width: "100%", height: "auto", maxHeight: 650, objectFit: "contain" }} />{section.image.caption && <figcaption style={{ color: "var(--muted)", marginTop: 12, whiteSpace: "pre-line" }}>{section.image.caption}</figcaption>}</figure>}
    </section>
  ))}</>;
}
