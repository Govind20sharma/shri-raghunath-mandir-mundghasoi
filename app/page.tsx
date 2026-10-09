import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DarshanStatus } from "@/components/darshan-status";
import { CopyAddress } from "@/components/copy-address";
import { FestivalSection } from "@/components/festival-section";
import { RitualSection } from "@/components/ritual-section";
import { TempleGallery } from "@/components/temple-gallery";
import { heroPhoto } from "@/lib/gallery";
import { temple } from "@/lib/temple";

export default function HomePage() {
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
    image:
      "https://shri-raghunath-mandir-mundghasoi.vercel.app/assets/temple/temple-exterior.webp",
    url: "https://shri-raghunath-mandir-mundghasoi.vercel.app",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SiteHeader />
      <main id="main">
        <section className="hero wrap" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow">
              <span></span> मूंडघसोई की पावन धरा पर
            </div>
            <h1 id="hero-title">
              आस्था का आँगन,
              <br />
              <em>श्री रघुनाथ</em>
              <br />
              का धाम।
            </h1>
            <p className="hero-description">
              जहाँ मन को मिले शांति और जीवन को श्रीराम का आशीर्वाद। श्री रघुनाथ
              मंदिर में आपका सपरिवार स्वागत है।
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#darshan">
                दर्शन की जानकारी
              </a>
              <a className="button outline" href="#about">
                मंदिर से परिचय
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-flower" aria-hidden="true">
                ✺
              </span>
              <span>श्रद्धा से आइए, सुकून साथ ले जाइए।</span>
            </div>
          </div>
          <figure className="hero-art temple-hero">
            <div className="art-frame">
              <Image
                src={heroPhoto.src}
                alt={heroPhoto.alt}
                width={960}
                height={1280}
                preload
                sizes="(max-width: 600px) 90vw, (max-width: 820px) 45vw, 440px"
              />
            </div>
            <div className="art-seal">
              <span>सियावर</span>
              <strong>रामचन्द्र</strong>
              <span>की जय</span>
            </div>
            <figcaption>श्री रघुनाथ मंदिर · मूंडघसोई का अपना धाम</figcaption>
          </figure>
        </section>
        <div className="visit-strip wrap">
          <div>
            <span className="strip-symbol" aria-hidden="true">
              ☼
            </span>
            <p>
              <small>प्रातः दर्शन</small>
              <strong>सुबह 5:00 – 11:00</strong>
            </p>
          </div>
          <div>
            <span className="strip-symbol" aria-hidden="true">
              ☾
            </span>
            <p>
              <small>संध्या दर्शन</small>
              <strong>शाम 5:00 – 9:00</strong>
            </p>
          </div>
          <div>
            <span className="strip-symbol" aria-hidden="true">
              ⌖
            </span>
            <p>
              <small>हमारा स्थान</small>
              <strong>मूंडघसोई, राजस्थान</strong>
            </p>
          </div>
          <a href="#contact">पधारने की जानकारी</a>
        </div>
        <section
          className="section about wrap"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="about-heading">
            <p className="section-label">श्रद्धा का अपना ठिकाना</p>
            <h2 className="section-title" id="about-title">
              मन में राम,
              <br />
              हर श्वास में राम।
            </h2>
            <div className="ornament" aria-hidden="true">
              <span></span> ✧ <span></span>
            </div>
            <p className="about-location">
              श्री रघुनाथ मंदिर
              <br />
              <span>मूंडघसोई, नावां सिटी, राजस्थान</span>
            </p>
          </div>
          <div className="about-copy">
            <p className="large-copy">
              रोज़मर्रा की भागदौड़ से कुछ पल दूर,
              <br />
              आइए प्रभु के चरणों में बैठें।
            </p>
            <p>
              श्री रघुनाथ मंदिर, मूंडघसोई में श्रीराम के दर्शन के लिए आप सपरिवार
              पधार सकते हैं। प्रभु का स्मरण करें, प्रार्थना में समय बिताएँ और
              अपने दिन में शांति के कुछ पल जोड़ें।
            </p>
            <p>
              प्रातः हवन, हर मंगलवार सुंदरकांड पाठ और जन्माष्टमी उत्सव यहाँ की
              आराधना से जुड़े अवसर हैं। श्री रघुनाथ जी के साथ श्री हनुमान जी,
              श्री राधा कृष्ण और माँ दुर्गा के दर्शन की झलकियाँ भी हमारी
              तस्वीरों में देखें। राम नाम, भक्ति और सेवा के भाव के साथ हर
              श्रद्धालु का स्वागत है।
            </p>
            <div className="values">
              <div>
                <span>01</span>
                <strong>श्रद्धा</strong>
                <small>प्रभु के प्रति विश्वास</small>
              </div>
              <div>
                <span>02</span>
                <strong>भक्ति</strong>
                <small>मन से प्रभु का स्मरण</small>
              </div>
              <div>
                <span>03</span>
                <strong>सेवा</strong>
                <small>सबके प्रति सद्भाव</small>
              </div>
            </div>
          </div>
        </section>
        <section
          className="darshan-section"
          id="darshan"
          aria-labelledby="darshan-title"
        >
          <div className="wrap darshan-grid">
            <div>
              <p className="section-label">आपके दर्शन की तैयारी</p>
              <h2 className="section-title" id="darshan-title">
                प्रभु के द्वार,
                <br />
                आपका इंतज़ार।
              </h2>
              <p className="darshan-description">
                अपनी सुविधा के अनुसार सुबह या शाम दर्शन के लिए पधारें।
              </p>
              <DarshanStatus />
              <p className="timing-note">
                समय भारतीय मानक समय (IST) के अनुसार। विशेष पर्वों पर समय की
                पुष्टि के लिए मंदिर से संपर्क करें।
              </p>
            </div>
            <div className="timing-cards">
              <article className="timing-card">
                <span className="timing-icon" aria-hidden="true">
                  ☼
                </span>
                <div>
                  <h3>प्रातः दर्शन</h3>
                  <p>सुबह की शुरुआत, प्रभु के नाम</p>
                  <strong>
                    5:00 <span>से</span> 11:00
                  </strong>
                  <small>सुबह · प्रतिदिन</small>
                </div>
              </article>
              <article className="timing-card">
                <span className="timing-icon" aria-hidden="true">
                  ☾
                </span>
                <div>
                  <h3>संध्या दर्शन</h3>
                  <p>दिन का विराम, मन को आराम</p>
                  <strong>
                    5:00 <span>से</span> 9:00
                  </strong>
                  <small>शाम · प्रतिदिन</small>
                </div>
              </article>
              <p className="aarti-note">
                आरती का समय जानने के लिए{" "}
                <a href={temple.phoneHref}>{temple.phone}</a> पर बात करें।
              </p>
            </div>
          </div>
        </section>
        <RitualSection />
        <TempleGallery />
        <section
          className="section bhakti wrap"
          id="bhakti"
          aria-labelledby="bhakti-title"
        >
          <div className="bhakti-top">
            <div>
              <p className="section-label">कुछ पल श्रीराम के नाम</p>
              <h2 className="section-title" id="bhakti-title">
                राम नाम, मन का विश्राम।
              </h2>
            </div>
            <p className="section-intro">
              शांत मन से पढ़ें।
              <br />
              प्रभु के चरणों में अपनी प्रार्थना अर्पित करें।
            </p>
          </div>
          <div className="prayer-card">
            <div className="prayer-side">
              <span aria-hidden="true">राम</span>
              <p>श्रीराम स्तुति</p>
              <small>गोस्वामी तुलसीदास</small>
            </div>
            <div className="prayer-content">
              <p className="verse">
                श्रीरामचन्द्र कृपालु भजु मन
                <br />
                हरण भवभय दारुणम्।
                <br />
                नवकंज लोचन कंज मुख
                <br />
                कर कंज पद कंजारुणम्॥
              </p>
              <p className="verse-meaning">
                हे मन, कृपालु श्रीराम का भजन कर, जो संसार के भय और दुख दूर करने
                वाले हैं। उनके नेत्र, मुख, हाथ और चरण कमल के समान सुंदर हैं।
              </p>
              <details className="prayer-more">
                <summary>
                  स्तुति के आगे के पद पढ़ें <span aria-hidden="true">+</span>
                </summary>
                <div className="additional-verses">
                  <p>
                    कन्दर्प अगणित अमित छवि
                    <br />
                    नवनील नीरद सुन्दरम्।
                    <br />
                    पटपीत मानहु तड़ित रुचि शुचि
                    <br />
                    नौमि जनक सुतावरम्॥
                  </p>
                  <p>
                    भजु दीनबन्धु दिनेश दानव
                    <br />
                    दैत्यवंश निकन्दनम्।
                    <br />
                    रघुनन्द आनन्द कन्द कोशल
                    <br />
                    चन्द दशरथ नन्दनम्॥
                  </p>
                  <p>
                    सिर मुकुट कुण्डल तिलक चारु
                    <br />
                    उदारु अंग विभूषणम्।
                    <br />
                    आजानुभुज शर चाप धर
                    <br />
                    संग्राम जित खरदूषणम्॥
                  </p>
                  <p>
                    इति वदति तुलसीदास शंकर
                    <br />
                    शेष मुनि मन रंजनम्।
                    <br />
                    मम हृदय कंज निवास कुरु
                    <br />
                    कामादि खलदल गंजनम्॥
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
        <FestivalSection />
        <section className="seva-band">
          <div className="wrap">
            <div>
              <p className="section-label">सेवा में ही समर्पण</p>
              <h2>
                आपका छोटा-सा योगदान,
                <br />
                एक सुंदर सेवा का संकल्प।
              </h2>
            </div>
            <div>
              <p>
                पूजा, प्रसाद या मंदिर सेवा में जुड़ने की इच्छा हो तो सीधे संपर्क
                करें और उपलब्ध व्यवस्था की जानकारी लें।
              </p>
              <a className="button primary" href={temple.phoneHref}>
                सेवा के लिए बात करें
              </a>
            </div>
          </div>
        </section>
        <section
          className="section wrap contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="section-top">
            <div>
              <p className="section-label">पधारो हमारे धाम</p>
              <h2 className="section-title" id="contact-title">
                दर्शन के लिए आपका स्वागत है।
              </h2>
            </div>
          </div>
          <div className="contact-grid">
            <div className="contact-details">
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  ⌖
                </span>
                <div>
                  <h3>मंदिर का पता</h3>
                  <address>
                    {temple.name}
                    <br />
                    {temple.location}
                  </address>
                  <CopyAddress />
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  ☎
                </span>
                <div>
                  <h3>सीधे संपर्क करें</h3>
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
                  <p>दर्शन, आरती और सेवा की जानकारी के लिए</p>
                </div>
              </div>
              <div className="contact-row">
                <span className="contact-icon" aria-hidden="true">
                  ◷
                </span>
                <div>
                  <h3>दर्शन का समय</h3>
                  <p>
                    सुबह 5:00 से 11:00 बजे
                    <br />
                    शाम 5:00 से 9:00 बजे
                  </p>
                </div>
              </div>
            </div>
            <div className="location-panel">
              <span className="location-kicker">MUNDGHASOI · RAJASTHAN</span>
              <h3>
                मूंडघसोई
                <br />
                <span>पधारिए।</span>
              </h3>
              <p>
                Google पर यह स्थान{" "}
                <strong>Radha Krishna Mandir, Mundghasoi</strong> के नाम से
                मिलता है। नीचे दिए लिंक से Maps खोलें; नज़दीकी पहचान के लिए हमें
                फोन करें।
              </p>
              <a
                className="button primary"
                href={temple.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps पर मंदिर देखें
              </a>
              <small>ऑनलाइन नाम · {temple.onlineName}</small>
              <a
                className="location-source"
                href={temple.googleListingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google पर ऑनलाइन लिस्टिंग
              </a>
              <a
                className="location-source"
                href={temple.locationSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                गाँव की जानकारी · IndiaMapia
              </a>
              <div className="location-bottom">
                <span>नावां सिटी, राजस्थान</span>
                <span>पिन · 341509</span>
              </div>
            </div>
          </div>
        </section>
        <section className="section faq-section" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div>
              <p className="section-label">पधारने से पहले</p>
              <h2 className="section-title" id="faq-title">
                कुछ ज़रूरी बातें।
              </h2>
              <p className="section-intro">
                कोई और जानकारी चाहिए?
                <br />
                <a className="inline-link" href={temple.phoneHref}>
                  हमें फोन करें: {temple.phone}
                </a>
              </p>
            </div>
            <div className="faq-list">
              <details>
                <summary>
                  दर्शन के लिए मंदिर कब खुलता है?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  दर्शन का समय प्रतिदिन सुबह 5 बजे से 11 बजे तक और शाम 5 बजे से
                  रात 9 बजे तक है। विशेष पर्व पर आने से पहले फोन करके समय की
                  पुष्टि कर लें।
                </p>
              </details>
              <details>
                <summary>
                  आरती और विशेष पूजा की जानकारी कैसे मिलेगी?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  आरती के समय, विशेष पूजा और प्रसाद की व्यवस्था के लिए{" "}
                  <a href={temple.phoneHref}>{temple.phone}</a> पर संपर्क करें।
                </p>
              </details>
              <details>
                <summary>
                  पहली बार आ रहे हैं, क्या ध्यान रखें?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  मर्यादित वस्त्र पहनकर पधारें, निर्धारित स्थान पर जूते-चप्पल
                  उतारें और परिसर की स्वच्छता व शांति बनाए रखें। फोटो लेने से
                  पहले अनुमति लें।
                </p>
              </details>
              <details>
                <summary>
                  सुंदरकांड और हवन में कब शामिल हो सकते हैं?
                  <span aria-hidden="true">+</span>
                </summary>
                <p>
                  मंदिर में सुबह हवन और हर मंगलवार सुंदरकांड पाठ होता है। आयोजन
                  का समय और सहभागिता की जानकारी के लिए{" "}
                  <a href={temple.phoneHref}>{temple.phone}</a> पर बात करें।
                  जन्माष्टमी के कार्यक्रम की जानकारी भी इसी नंबर पर लें।
                </p>
              </details>
              <details>
                <summary>
                  सेवा में कैसे जुड़ सकते हैं?<span aria-hidden="true">+</span>
                </summary>
                <p>
                  सेवा की इच्छा और उपलब्ध व्यवस्था के बारे में सीधे फोन पर बात
                  करें। किसी भी योगदान की जानकारी मंदिर से पुष्टि करने के बाद ही
                  तय करें।
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
