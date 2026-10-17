
"use client";

import { CmsText, useCmsContent } from "@/components/cms-content-provider";

export function SiteFooter() {
  const { settings: temple } = useCmsContent();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <a className="brand footer-brand" href="/#home">
          <span className="brand-mark" aria-hidden="true">
            <CmsText id="footer.text001" /></span>
          <span>
            <strong>{temple.name}</strong>
            <small><CmsText id="footer.text003" /></small>
          </span>
        </a>
        <p><CmsText id="footer.text004" /></p>
        <div className="footer-contacts">
          {temple.contacts.map((contact) => (
            <a key={contact.phone} href={contact.phoneHref}>
              {contact.name} · {contact.displayPhone}
            </a>
          ))}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <small>
          ©{" "}
          <span id="year">
            {new Intl.DateTimeFormat("en", {
              timeZone: temple.timeZone,
              year: "numeric",
            }).format(new Date())}
          </span>{" "}
          <CmsText id="footer.text005" values={{ name: temple.name }} /></small>
        <div>
          <a href="/#darshan"><CmsText id="footer.text006" /></a>
          <a href="/#contact"><CmsText id="footer.text007" /></a>
          <a
            href="https://indiapostgdsonline.gov.in/MasterPDF/Post_Details.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CmsText id="footer.text008" /></a>
        </div>
        <a href="/photos"><CmsText id="footer.text009" /></a>
      </div>
    </footer>
  );
}
