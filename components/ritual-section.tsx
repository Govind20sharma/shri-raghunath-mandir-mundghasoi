import { temple } from "@/lib/temple";

export function RitualSection() {
  return (
    <section
      id="anushthan"
      className="section rituals-section wrap"
      aria-labelledby="rituals-title"
    >
      <div className="section-top">
        <div>
          <p className="section-label">पूजन एवं अनुष्ठान</p>
          <h2 className="section-title" id="rituals-title">
            भक्ति से जुड़ने के मंगल अवसर
          </h2>
        </div>
        <p className="section-intro">
          प्रातः हवन और प्रत्येक मंगलवार सुंदरकांड पाठ में सम्मिलित होकर श्री
          रघुनाथ जी के चरणों में अपनी श्रद्धा अर्पित करें।
        </p>
      </div>

      <div className="ritual-grid">
        <article className="ritual-card">
          <div className="ritual-kicker">
            <span>प्रातःकाल</span>
            <span className="ritual-number" aria-hidden="true">
              ॐ
            </span>
          </div>
          <h3>सुबह का हवन</h3>
          <p className="ritual-description">
            मंदिर में सुबह हवन होता है। पवित्र अग्नि में आहुति अर्पित करने की यह
            आराधना श्रद्धा, प्रार्थना और मंगल कामना का अवसर है।
          </p>
          <div className="ritual-footer">
            <span>समय और सहभागिता की जानकारी</span>
            <a className="text-button" href={temple.phoneHref}>
              मंदिर से संपर्क करें <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

        <article className="ritual-card">
          <div className="ritual-kicker">
            <span>हर मंगलवार</span>
            <span className="ritual-number" aria-hidden="true">
              राम
            </span>
          </div>
          <h3>सुंदरकांड पाठ</h3>
          <p className="ritual-description">
            प्रत्येक मंगलवार मंदिर में सुंदरकांड पाठ होता है। श्री हनुमान जी की
            रामभक्ति, साहस और सेवा के प्रसंगों का स्मरण करते हुए पाठ में
            सम्मिलित हों।
          </p>
          <div className="ritual-footer">
            <span>पाठ के समय की जानकारी</span>
            <a className="text-button" href={temple.phoneHref}>
              मंदिर से संपर्क करें <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
