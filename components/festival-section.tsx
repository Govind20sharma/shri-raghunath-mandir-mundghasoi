"use client";

import { CmsText, useCmsContent, useCmsCopy } from "@/components/cms-content-provider";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { festivalInformation, type FestivalId } from "@/lib/festivals";

export function FestivalSection() {
  const { settings: temple } = useCmsContent();
  const copy = useCmsCopy();
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
              <p className="section-label"><CmsText id="festivals.text001" /></p>
              <h2 className="section-title" id="utsav-title">
                <CmsText id="festivals.text002" /></h2>
            </div>
            <p className="section-intro">
              <CmsText id="festivals.text003" /><br />
              <CmsText id="festivals.text004" /></p>
          </div>
          <div className="festival-grid festival-grid-four">
            <article className="festival-card">
              <div className="festival-number">
                <span><CmsText id="festivals.text005" /></span>
                <strong><CmsText id="festivals.text006" /></strong>
                <small><CmsText id="festivals.text007" /></small>
              </div>
              <div className="festival-copy">
                <h3><CmsText id="festivals.text008" /></h3>
                <p>
                  <CmsText id="festivals.text009" /></p>
                <button
                  className="text-button"
                  data-festival="ramnavami"
                  onClick={(event) =>
                    openFestival("ramnavami", event.currentTarget)
                  }
                  aria-haspopup="dialog"
                >
                  <CmsText id="festivals.text010" /><span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
            <article className="festival-card">
              <div className="festival-number">
                <span><CmsText id="festivals.text011" /></span>
                <strong><CmsText id="festivals.text012" /></strong>
                <small><CmsText id="festivals.text013" /></small>
              </div>
              <div className="festival-copy">
                <h3><CmsText id="festivals.text014" /></h3>
                <p>
                  <CmsText id="festivals.text015" /></p>
                <button
                  className="text-button"
                  data-festival="dussehra"
                  onClick={(event) =>
                    openFestival("dussehra", event.currentTarget)
                  }
                  aria-haspopup="dialog"
                >
                  <CmsText id="festivals.text016" /><span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
            <article className="festival-card">
              <div className="festival-number">
                <span><CmsText id="festivals.text017" /></span>
                <strong><CmsText id="festivals.text018" /></strong>
                <small><CmsText id="festivals.text019" /></small>
              </div>
              <div className="festival-copy">
                <h3><CmsText id="festivals.text020" /></h3>
                <p>
                  <CmsText id="festivals.text021" /></p>
                <button
                  className="text-button"
                  data-festival="diwali"
                  onClick={(event) =>
                    openFestival("diwali", event.currentTarget)
                  }
                  aria-haspopup="dialog"
                >
                  <CmsText id="festivals.text022" /><span aria-hidden="true">+</span>
                </button>
              </div>
            </article>
            <article className="festival-card">
              <div className="festival-number">
                <span><CmsText id="festivals.text023" /></span>
                <strong><CmsText id="festivals.text024" /></strong>
                <small><CmsText id="festivals.text025" /></small>
              </div>
              <div className="festival-copy">
                <h3><CmsText id="festivals.text026" /></h3>
                <p>
                  <CmsText id="festivals.text027" /></p>
                <button
                  className="text-button"
                  data-festival="janmashtami"
                  onClick={(event) =>
                    openFestival("janmashtami", event.currentTarget)
                  }
                  aria-haspopup="dialog"
                >
                  <CmsText id="festivals.text028" /><span aria-hidden="true">+</span>
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
            aria-label={copy("festival.close")}
          >
            ×
          </button>
          <p className="section-label"><CmsText id="festivals.text029" /></p>
          <h2 id="festival-dialog-title">{selectedId && copy(`festival.${selectedId}.title`, selected?.title)}</h2>
          <p id="festival-dialog-description">{selectedId && copy(`festival.${selectedId}.description`, selected?.description)}</p>
          <div className="dialog-note">
            <CmsText id="festivals.text030" /></div>
          <a className="button primary" href={temple.phoneHref}>
            {temple.phone} <CmsText id="festivals.text031" /></a>
        </div>
      </dialog>
    </>
  );
}
