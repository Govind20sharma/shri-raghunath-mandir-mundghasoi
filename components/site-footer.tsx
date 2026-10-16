import { temple } from "@/lib/temple";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <a className="brand footer-brand" href="/#home">
          <span className="brand-mark" aria-hidden="true">
            ॐ
          </span>
          <span>
            <strong>श्री रघुनाथ मंदिर</strong>
            <small>मूंडघसोई · राजस्थान</small>
          </span>
        </a>
        <p>॥ सियावर रामचन्द्र की जय ॥</p>
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
          श्री रघुनाथ मंदिर, मूंडघसोई
        </small>
        <div>
          <a href="/#darshan">दर्शन समय</a>
          <a href="/#contact">संपर्क</a>
          <a
            href="https://indiapostgdsonline.gov.in/MasterPDF/Post_Details.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            डाक क्षेत्र का स्रोत
          </a>
        </div>
        <a href="/photos">मंदिर की झलकियाँ देखें</a>
      </div>
    </footer>
  );
}
