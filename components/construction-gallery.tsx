"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { constructionPhotos, constructionStages } from "@/lib/gallery-2026";

export function ConstructionGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const isOpen = selectedIndex !== null;
  const selected = isOpen ? constructionPhotos[selectedIndex] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  function openPhoto(index: number, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setSelectedIndex(index);
  }

  function closeGallery() {
    setSelectedIndex(null);
    triggerRef.current?.focus();
  }

  function movePhoto(direction: number) {
    setSelectedIndex((index) =>
      index === null
        ? null
        : (index + direction + constructionPhotos.length) % constructionPhotos.length,
    );
  }

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (
      event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom
    ) dialogRef.current?.close();
  }

  return (
    <>
      <section className="wrap construction-collection" id="year-2026" aria-labelledby="collection-2026-title">
        <div className="construction-year-heading">
          <div className="construction-year" aria-hidden="true">2026</div>
          <div>
            <p className="section-label">2026 का फोटो संग्रह</p>
            <h2 id="collection-2026-title">निर्माण से तैयार मंदिर तक।</h2>
            <p>छत की ढलाई, शिखर की चिनाई, साज-सज्जा और मंदिर के दर्शन — क्रम से देखें।</p>
            <span className="construction-total">{constructionPhotos.length} तस्वीरें · {constructionStages.length} पड़ाव</span>
          </div>
          <button className="button primary" type="button" aria-haspopup="dialog" onClick={(event) => openPhoto(0, event.currentTarget)}>
            पहली तस्वीर से देखें <span aria-hidden="true">↗</span>
          </button>
        </div>

        <nav className="construction-jump-links" aria-label="निर्माण के पड़ाव">
          {constructionStages.map((stage, index) => (
            <a href={`#${stage.id}`} key={stage.id}>
              <span>{String(index + 1).padStart(2, "0")}</span> {stage.title}
            </a>
          ))}
        </nav>

        {constructionStages.map((stage, stageIndex) => (
          <section className="construction-stage" id={stage.id} key={stage.id} aria-labelledby={`${stage.id}-title`}>
            <div className="construction-stage-heading">
              <span className="construction-stage-number" aria-hidden="true">{String(stageIndex + 1).padStart(2, "0")}</span>
              <div>
                <h3 id={`${stage.id}-title`}>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
              <span className="construction-stage-range">{String(stage.start).padStart(3, "0")}–{String(stage.end).padStart(3, "0")}</span>
            </div>
            <div className="gallery-grid construction-grid">
              {constructionPhotos.filter((photo) => photo.stageId === stage.id).map((photo) => (
                <button type="button" className="gallery-card" key={photo.id} aria-label={`${String(photo.id).padStart(3, "0")} — ${photo.title} — बड़ी तस्वीर देखें`} aria-haspopup="dialog" onClick={(event) => openPhoto(photo.id - 1, event.currentTarget)}>
                  <span className="gallery-image">
                    <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 600px) 43vw, (max-width: 1000px) 44vw, 285px" />
                    <span className="gallery-expand" aria-hidden="true">↗</span>
                  </span>
                  <span className="gallery-caption"><span className="gallery-count">{String(photo.id).padStart(3, "0")}</span><strong>{photo.title}</strong></span>
                </button>
              ))}
            </div>
          </section>
        ))}
        <div className="construction-endnote">
          <span aria-hidden="true">॥</span>
          <p>हर ईंट में सेवा, हर तस्वीर में श्रद्धा।</p>
          <a className="text-button" href="/#contact">मंदिर पधारें <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <dialog className="gallery-dialog construction-dialog" ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId} onClose={closeGallery} onClick={onBackdropClick} onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          movePhoto(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
        <div className="gallery-dialog-top">
          <span>2026 · {selected ? String(selected.id).padStart(3, "0") : "000"} / {constructionPhotos.length}</span>
          <button className="gallery-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="तस्वीर बंद करें">×</button>
        </div>
        {selected && <Image className="gallery-full-image" src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} sizes="(max-width: 600px) 90vw, 800px" />}
        <div className="gallery-dialog-bottom">
          <button className="gallery-arrow" type="button" onClick={() => movePhoto(-1)} aria-label="पिछली तस्वीर">←</button>
          <div aria-live="polite"><h2 id={titleId}>{selected?.title}</h2><p id={descriptionId}>{selected?.caption}</p></div>
          <button className="gallery-arrow" type="button" onClick={() => movePhoto(1)} aria-label="अगली तस्वीर">→</button>
        </div>
      </dialog>
    </>
  );
}
