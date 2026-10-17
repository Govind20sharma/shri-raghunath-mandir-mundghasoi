
import { CmsContentProvider, CmsText } from "@/components/cms-content-provider";
import { CmsSections } from "@/components/cms-sections";
import { getPageContent } from "@/lib/cms/server";
import { activePhotos, formatDarshanHour } from "@/lib/cms/model";
import { getCmsScheduleValues } from "@/lib/cms/copy-fields";
import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DarshanStatus } from "@/components/darshan-status";
import { CopyAddress } from "@/components/copy-address";
import { FestivalSection } from "@/components/festival-section";
import { RitualSection } from "@/components/ritual-section";
import { TempleGallery } from "@/components/temple-gallery";

export default async function HomePage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const params = await searchParams;
  const content = await getPageContent(params.preview === "1");
  const temple = content.settings;
  const photos = activePhotos(content.homePhotos);
  const heroPhoto = photos.find(photo => photo.id === content.heroPhotoId) ?? photos[0];
  const schedule = getCmsScheduleValues(temple);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: temple.name,
    alternateName: temple.onlineName,
    description:
      "मूंडघसोई का श्री रघुनाथ मंदिर, जो Google पर Radha Krishna Mandir के नाम से सूचीबद्ध है।",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mundghasoi",
      postalCode: "341509",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    telephone: temple.contacts.map((contact) => contact.phoneHref.slice(4)),
    image: heroPhoto?.src,
    url: "https://shri-raghunath-mandir-mundghasoi.vercel.app",
  };

  return (
    <CmsContentProvider content={content}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="main">
        <section className="hero wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span></span> <CmsText id="home.text001" /></div>
            <h1 id="hero-title">
              <CmsText id="home.text002" /><br />
              <em><CmsText id="home.text003" /></em>
              <br />
              <CmsText id="home.text004" /></h1>
            <p className="hero-description">
              <CmsText id="home.text005" /></p>
            <div className="hero-actions">
              <a className="button primary" href="#darshan">
                <CmsText id="home.text006" /></a>
              <a className="button outline" href="#about">
                <CmsText id="home.text007" /></a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-flower" aria-hidden="true">
                ✺
              </span>
              <span><CmsText id="home.text008" /></span>
            </div>
          </div>
          {heroPhoto && <figure className="hero-art temple-hero">
            <div className="art-frame">
              <Image
                src={heroPhoto.src}
                alt={heroPhoto.alt}
                width={heroPhoto.width}
                height={heroPhoto.height}
                preload
                sizes="(max-width: 600px) 90vw, (max-width: 820px) 45vw, 440px"
              />
            </div>
            <div className="art-seal">
              <span><CmsText id="home.text009" /></span>
              <strong><CmsText id="home.text010" /></strong>
              <span><CmsText id="home.text011" /></span>
            </div>
            <figcaption><CmsText id="home.text012" /></figcaption>
          </figure>}
        </section>
        <div className="visit-strip wrap">
          <div>
            <span className="strip-symbol" aria-hidden="true">
              ☼
            </span>
            <p>
              <small><CmsText id="home.text013" /></small>
              <strong><CmsText id="schedule.morning" values={schedule} /></strong>
            </p>
          </div>
          <div>
            <span className="strip-symbol" aria-hidden="true">
              ☾
            </span>
            <p>
              <small><CmsText id="home.text015" /></small>
              <strong><CmsText id="schedule.evening" values={schedule} /></strong>
            </p>
          </div>
          <div>
            <span className="strip-symbol" aria-hidden="true">
              ⌖
            </span>
            <p>
              <small><CmsText id="home.text017" /></small>
              <strong><CmsText id="home.text018" /></strong>
            </p>
          </div>
          <a href="#contact"><CmsText id="home.text019" /></a>
        </div>
        <section
          className="section about wrap"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-heading">
            <p className="section-label"><CmsText id="home.text020" /></p>
            <h2 className="section-title" id="about-title">
              <CmsText id="home.text021" /><br />
              <CmsText id="home.text022" /></h2>
            <div className="ornament" aria-hidden="true">
              <span></span> ✧ <span></span>
            </div>
            <p className="about-location">
              {temple.name}<br />
              <span>{temple.location}</span>
            </p>
          </div>
          <div className="about-copy">
            <p className="large-copy">
              <CmsText id="home.text025" /><br />
              <CmsText id="home.text026" /></p>
            <p>
              <CmsText id="home.text027" /></p>
            <p>
              <CmsText id="home.text028" /></p>
            <div className="values">
              <div>
                <span>01</span>
                <strong><CmsText id="home.text029" /></strong>
                <small><CmsText id="home.text030" /></small>
              </div>
              <div>
                <span>02</span>
                <strong><CmsText id="home.text031" /></strong>
                <small><CmsText id="home.text032" /></small>
              </div>
              <div>
                <span>03</span>
                <strong><CmsText id="home.text033" /></strong>
                <small><CmsText id="home.text034" /></small>
              </div>
            </div>
          </div>
        </section>
        <CmsSections slot="home.after-about" />
        <section
          className="darshan-section"
          id="darshan"
          aria-labelledby="darshan-title"
        >
          <div className="wrap darshan-grid">
            <div>
              <p className="section-label"><CmsText id="home.text035" /></p>
              <h2 className="section-title" id="darshan-title">
                <CmsText id="home.text036" /><br />
                <CmsText id="home.text037" /></h2>
              <p className="darshan-description">
                <CmsText id="home.text038" /></p>
              <DarshanStatus />
              <p className="timing-note">
                <CmsText id="home.text039" /></p>
            </div>
            <div className="timing-cards">
              <article className="timing-card">
                <span className="timing-icon" aria-hidden="true">
                  ☼
                </span>
                <div>
                  <h3><CmsText id="home.text040" /></h3>
                  <p><CmsText id="home.text041" /></p>
                  <strong>
                    {formatDarshanHour(temple.darshan.morning.opens)} <span><CmsText id="home.text042" /></span> {formatDarshanHour(temple.darshan.morning.closes)}
                  </strong>
                  <small><CmsText id="home.text043" /></small>
                </div>
              </article>
              <article className="timing-card">
                <span className="timing-icon" aria-hidden="true">
                  ☾
                </span>
                <div>
                  <h3><CmsText id="home.text044" /></h3>
                  <p><CmsText id="home.text045" /></p>
                  <strong>
                    {formatDarshanHour(temple.darshan.evening.opens)} <span><CmsText id="home.text046" /></span> {formatDarshanHour(temple.darshan.evening.closes)}
                  </strong>
                  <small><CmsText id="home.text047" /></small>
                </div>
              </article>
              <p className="aarti-note">
                <CmsText id="home.text048" />{" "}
                <a href={temple.phoneHref}>{temple.phone}</a> <CmsText id="home.text049" /></p>
            </div>
          </div>
        </section>
        <RitualSection />
        <TempleGallery />
        <CmsSections slot="home.after-gallery" />
        <section
          className="section bhakti wrap"
          id="bhakti"
          aria-labelledby="bhakti-title"
        >
          <div className="bhakti-top">
            <div>
              <p className="section-label"><CmsText id="home.text050" /></p>
              <h2 className="section-title" id="bhakti-title">
                <CmsText id="home.text051" /></h2>
            </div>
            <p className="section-intro">
              <CmsText id="home.text052" /><br />
              <CmsText id="home.text053" /></p>
          </div>
          <div className="prayer-card">
            <div className="prayer-side">
              <span aria-hidden="true"><CmsText id="home.text054" /></span>
              <p><CmsText id="home.text055" /></p>
              <small><CmsText id="home.text056" /></small>
            </div>
            <div className="prayer-content">
              <p className="verse">
                <CmsText id="home.text057" /><br />
                <CmsText id="home.text058" /><br />
                <CmsText id="home.text059" /><br />
                <CmsText id="home.text060" /></p>
              <p className="verse-meaning">
                <CmsText id="home.text061" /></p>
              <details className="prayer-more">
                <summary>
                  <CmsText id="home.text062" /><span aria-hidden="true">+</span>
                </summary>
                <div className="additional-verses">
                  <p>
                    <CmsText id="home.text063" /><br />
                    <CmsText id="home.text064" /><br />
                    <CmsText id="home.text065" /><br />
                    <CmsText id="home.text066" /></p>
                  <p>
                    <CmsText id="home.text067" /><br />
                    <CmsText id="home.text068" /><br />
                    <CmsText id="home.text069" /><br />
                    <CmsText id="home.text070" /></p>
                  <p>
                    <CmsText id="home.text071" /><br />
                    <CmsText id="home.text072" /><br />
                    <CmsText id="home.text073" /><br />
                    <CmsText id="home.text074" /></p>
                  <p>
                    <CmsText id="home.text075" /><br />
                    <CmsText id="home.text076" /><br />
                    <CmsText id="home.text077" /><br />
                    <CmsText id="home.text078" /></p>
                </div>
              </details>
            </div>
          </div>
        </section>
        <FestivalSection />
        <section className="seva-band">
          <div className="wrap">
            <div>
              <p className="section-label"><CmsText id="home.text079" /></p>
              <h2>
                <CmsText id="home.text080" /><br />
                <CmsText id="home.text081" /></h2>
            </div>
            <div>
              <p>
                <CmsText id="home.text082" /></p>
              <a className="button primary" href={temple.phoneHref}>
                <CmsText id="home.text083" /></a>
            </div>
          </div>
        </section>
        <CmsSections slot="home.before-contact" />
        <section
          className="section wrap contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="section-top">
            <div>
              <p className="section-label"><CmsText id="home.text084" /></p>
              <h2 className="section-title" id="contact-title">
                <CmsText id="home.text085" /></h2>
            </div>
          </div>
          <div className="contact-grid">
            <div className="contact-details">
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  ⌖
                </span>
                <div>
                  <h3><CmsText id="home.text086" /></h3>
                  <address>
                    {temple.name}
                    <br />
                    {temple.address.startsWith(temple.name) ? temple.address.slice(temple.name.length).replace(/^[,，\s]+/, "") : temple.address}
                  </address>
                  <CopyAddress />
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  ☎
                </span>
                <div>
                  <h3><CmsText id="home.text087" /></h3>
                  <div className="contact-people">
                    {temple.contacts.map((contact) => (
                      <a key={contact.phone} href={contact.phoneHref}>
                        <span>
                          <strong>{contact.name}</strong>
                          <small>{contact.role}</small>
                        </span>
                        <span className="phone-number">
                          {contact.displayPhone}
                        </span>
                      </a>
                    ))}
                  </div>
                  <p><CmsText id="home.text088" /></p>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  ◷
                </span>
                <div>
                  <h3><CmsText id="home.text089" /></h3>
                  <p>
                    <CmsText id="schedule.morningContact" values={schedule} /><br />
                    <CmsText id="schedule.eveningContact" values={schedule} /></p>
                </div>
              </div>
            </div>
            <div className="location-panel">
              <span className="location-kicker"><CmsText id="home.text092" /></span>
              <h3>
                <CmsText id="home.text093" /><br />
                <span><CmsText id="home.text094" /></span>
              </h3>
              <p>
                <CmsText id="home.text095" />{" "}
                <strong>{temple.onlineName}</strong> <CmsText id="home.text097" /></p>
              <a
                className="button primary"
                href={temple.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CmsText id="home.text098" /></a>
              <small><CmsText id="home.text099" />{temple.onlineName}</small>
              <a
                className="location-source"
                href={temple.googleListingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CmsText id="home.text100" /></a>
              <a
                className="location-source"
                href={temple.locationSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CmsText id="home.text101" /></a>
              <div className="location-bottom">
                <span><CmsText id="home.text102" /></span>
                <span><CmsText id="home.text103" /></span>
              </div>
            </div>
          </div>
        </section>
        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div>
              <p className="section-label"><CmsText id="home.text104" /></p>
              <h2 className="section-title" id="faq-title">
                <CmsText id="home.text105" /></h2>
              <p className="section-intro">
                <CmsText id="home.text106" /><br />
                <a className="inline-link" href={temple.phoneHref}>
                  <CmsText id="home.text107" />{temple.phone}
                </a>
              </p>
            </div>
            <div className="faq-list">
              <details>
                <summary>
                  <CmsText id="home.text108" /><span aria-hidden="true">+</span>
                </summary>
                <p>
                  <CmsText id="schedule.faq" values={schedule} /></p>
              </details>
              <details>
                <summary>
                  <CmsText id="home.text110" /><span aria-hidden="true">+</span>
                </summary>
                <p>
                  <CmsText id="home.text111" />{" "}
                  <a href={temple.phoneHref}>{temple.phone}</a> <CmsText id="home.text112" /></p>
              </details>
              <details>
                <summary>
                  <CmsText id="home.text113" /><span aria-hidden="true">+</span>
                </summary>
                <p>
                  <CmsText id="home.text114" /></p>
              </details>
              <details>
                <summary>
                  <CmsText id="home.text115" /><span aria-hidden="true">+</span>
                </summary>
                <p>
                  <CmsText id="home.text116" />{" "}
                  <a href={temple.phoneHref}>{temple.phone}</a> <CmsText id="home.text117" /></p>
              </details>
              <details>
                <summary>
                  <CmsText id="home.text118" /><span aria-hidden="true">+</span>
                </summary>
                <p>
                  <CmsText id="home.text119" /></p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </CmsContentProvider>
  );
}
