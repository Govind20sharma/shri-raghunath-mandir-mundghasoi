"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { festivalInformation, type FestivalId } from "@/lib/festivals";
import { temple } from "@/lib/temple";

export function FestivalSection() {
  const [selectedId, setSelectedId] = useState<FestivalId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const selected = selectedId ? festivalInformation[selectedId] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [selected]);

  function openFestival(id: FestivalId, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelectedId(id);
  }

  function closeFestival() {
    setSelectedId(null);
    triggerRef.current?.focus();
  }

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      event.currentTarget.close();
    }
  }

  return (
    <>
      <section
        className="utsav-section section"
        id="utsav"
        aria-labelledby="utsav-title"
      >
        <div className="wrap">
          <div className="section-top">
            <div>
              <p className="section-label">हमारी सांस्कृतिक परंपरा</p>
              <h2 className="section-title" id="utsav-title">
                भक्ति के रंग, पर्वों के संग।
              </h2>
            </div>
            <p className="section-intro">
              आराधना और उत्सव की परंपराओं का भाव जानें।
              <br />
              मंदिर के आयोजन की जानकारी फोन पर लें।
            </p>
          </div>
          <div className="festival-grid festival-grid-four">
            <article className="festival-card">
              <div className="festival-number">
                <span>चैत्र</span>
                <strong>नवमी</strong>
                <small>धर्म और मर्यादा का उत्सव</small>
              </div>
              <div className="festival-copy">
                <h3>श्री राम नवमी</h3>
                <p>
                  भगवान श्रीराम के जन्मोत्सव का पावन पर्व। राम नाम, प्रार्थना और
                  उनके आदर्शों के स्मरण का दिन।
                </p>
                <button
                  className="text-button"
                  data-festival="ramnavami"
                  onClick={(event) =>
                    openFestival("ramnavami", event.currentTarget)
                  }
                  aria-haspopup="dialog"
                >
                  पर्व का महत्व जानें <span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
            <article className="festival-card">
              <div className="festival-number">
                <span>आश्विन</span>
                <strong>दशमी</strong>
                <small>सत्य और सदाचार की विजय</small>
              </div>
              <div className="festival-copy">
                <h3>विजयादशमी</h3>
                <p>
                  बुराई पर अच्छाई की जीत का संदेश। श्रीराम के साहस, धैर्य और
                  सत्य के मार्ग से प्रेरणा लेने का पर्व।
                </p>
                <button
                  className="text-button"
                  data-festival="dussehra"
                  onClick={(event) =>
                    openFestival("dussehra", event.currentTarget)
                  }
                  aria-haspopup="dialog"
                >
                  पर्व का महत्व जानें <span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
            <article className="festival-card">
              <div className="festival-number">
                <span>कार्तिक</span>
                <strong>अमावस्या</strong>
                <small>आशा और उजाले का स्वागत</small>
              </div>
              <div className="festival-copy">
                <h3>दीपावली</h3>
                <p>
                  श्रीराम के अयोध्या लौटने की स्मृति से जुड़ा प्रकाश पर्व। दीप
                  जलाने और खुशियाँ बाँटने का अवसर।
                </p>
                <button
                  className="text-button"
                  data-festival="diwali"
                  onClick={(event) =>
                    openFestival("diwali", event.currentTarget)
                  }
                  aria-haspopup="dialog"
                >
                  पर्व का महत्व जानें <span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
            <article className="festival-card">
              <div className="festival-number">
                <span>कृष्ण जन्मोत्सव</span>
                <strong>जन्माष्टमी</strong>
                <small>प्रेम और भक्ति का उत्सव</small>
              </div>
              <div className="festival-copy">
                <h3>श्री कृष्ण जन्माष्टमी</h3>
                <p>
                  मंदिर में मनाया जाने वाला श्री कृष्ण जन्मोत्सव। श्रद्धा और
                  आनंद के इस पर्व के आयोजन की जानकारी मंदिर से लें।
                </p>
                <button
                  className="text-button"
                  data-festival="janmashtami"
                  onClick={(event) =>
                    openFestival("janmashtami", event.currentTarget)
                  }
                  aria-haspopup="dialog"
                >
                  उत्सव की जानकारी <span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
      <dialog
        ref={dialogRef}
        onClose={closeFestival}
        onClick={onBackdropClick}
        id="festival-dialog"
        aria-labelledby="festival-dialog-title"
      >
        <div className="dialog-content">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="dialog-close"
            aria-label="बंद करें"
          >
            ×
          </button>
          <p className="section-label">पर्व और परंपरा</p>
          <h2 id="festival-dialog-title">{selected?.title}</h2>
          <p id="festival-dialog-description">{selected?.description}</p>
          <div className="dialog-note">
            मंदिर में होने वाले आयोजन, पूजा और समय की जानकारी फोन पर लें।
          </div>
          <a className="button primary" href={temple.phoneHref}>
            {temple.phone} पर बात करें
          </a>
        </div>
      </dialog>
    </>
  );
}
