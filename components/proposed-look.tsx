import Image from "next/image";

const referenceImages = [
  {
    src: "/assets/temple/proposed/future-exterior-reference.webp",
    width: 1600,
    height: 900,
    title: "बाहरी रंग और सजावट",
    alt: "क्रीम और लाल रंग, सुनहरी किनारियों, छतरियों और सीढ़ियों वाले मंदिर के बाहरी रूप की संदर्भ तस्वीर",
    caption:
      "क्रीम रंग की दीवारें, लाल और सुनहरी किनारियाँ, सजी हुई छतरियाँ और सुंदर प्रवेश द्वार — बाहरी स्वरूप के लिए हमारी प्रेरणा।",
  },
  {
    src: "/assets/temple/proposed/future-interior-reference.webp",
    width: 1086,
    height: 1448,
    title: "अंदर की सजावट और रोशनी",
    alt: "संगमरमर के फर्श, सुनहरी सजावट, गर्म रोशनी और लाल पर्दों वाले मंदिर के अंदर की संदर्भ तस्वीर",
    caption:
      "छत पर सुनहरी सजावट और गर्म रोशनी, गर्भगृह के पास लाल पर्दे और संगमरमर का प्रार्थना परिसर — अंदर की साज-सज्जा की परिकल्पना।",
  },
] as const;

export function ProposedLook() {
  return (
    <section
      className="wrap proposed-look-section"
      id="proposed-look"
      aria-labelledby="proposed-look-title"
    >
      <div className="proposed-look-heading">
        <p className="section-label">भावी स्वरूप की परिकल्पना</p>
        <h2 className="section-title" id="proposed-look-title">
          हमारे मंदिर का प्रस्तावित स्वरूप।
        </h2>
        <p className="proposed-look-intro">
          हम अपने मंदिर को आगे इस तरह सजाना चाहते हैं। ये दोनों तस्वीरें
          बाहरी रूप और अंदर की सजावट के लिए संदर्भ के रूप में साझा की गई हैं।
        </p>
      </div>
      <div className="proposed-look-grid">
        {referenceImages.map((image) => (
          <a
            className="proposed-look-card"
            key={image.src}
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${image.title} — संदर्भ की बड़ी तस्वीर नए टैब में देखें`}
          >
            <figure>
              <span className="proposed-look-image">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 700px) 90vw, 600px"
                />
                <span className="proposed-look-badge">संदर्भ तस्वीर</span>
              </span>
              <figcaption>
                <h3>{image.title}</h3>
                <p>{image.caption}</p>
                <span className="text-button">
                  बड़ी तस्वीर देखें <span aria-hidden="true">↗</span>
                </span>
              </figcaption>
            </figure>
          </a>
        ))}
      </div>
    </section>
  );
}
