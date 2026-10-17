
"use client";

import { CmsText, useCmsContent } from "@/components/cms-content-provider";

export function RitualSection() {
  const { settings: temple } = useCmsContent();
  return (
    <section
      id="anushthan"
      className="section rituals-section wrap"
      aria-labelledby="rituals-title"
    >
      <div className="section-top">
        <div>
          <p className="section-label"><CmsText id="rituals.text001" /></p>
          <h2 className="section-title" id="rituals-title">
            <CmsText id="rituals.text002" /></h2>
        </div>
        <p className="section-intro">
          <CmsText id="rituals.text003" /></p>
      </div>

      <div className="ritual-grid">
        <article className="ritual-card">
          <div className="ritual-kicker">
            <span><CmsText id="rituals.text004" /></span>
            <span className="ritual-number" aria-hidden="true">
              <CmsText id="rituals.text005" /></span>
          </div>
          <h3><CmsText id="rituals.text006" /></h3>
          <p className="ritual-description">
            <CmsText id="rituals.text007" /></p>
          <div className="ritual-footer">
            <span><CmsText id="rituals.text008" /></span>
            <a className="text-button" href={temple.phoneHref}>
              <CmsText id="rituals.text009" /><span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

        <article className="ritual-card">
          <div className="ritual-kicker">
            <span><CmsText id="rituals.text010" /></span>
            <span className="ritual-number" aria-hidden="true">
              <CmsText id="rituals.text011" /></span>
          </div>
          <h3><CmsText id="rituals.text012" /></h3>
          <p className="ritual-description">
            <CmsText id="rituals.text013" /></p>
          <div className="ritual-footer">
            <span><CmsText id="rituals.text014" /></span>
            <a className="text-button" href={temple.phoneHref}>
              <CmsText id="rituals.text015" /><span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
