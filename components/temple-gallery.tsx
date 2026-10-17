"use client";

import { CmsText, useCmsContent, useCmsCopy } from "@/components/cms-content-provider";

import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { activePhotos } from "@/lib/cms/model";

export function TempleGallery() {
  const { homePhotos } = useCmsContent();
  const templePhotos = activePhotos(homePhotos);
  const copy = useCmsCopy();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = selectedIndex !== null;
  const selected = isOpen ? templePhotos[selectedIndex] : null;

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

  function movePhoto(direction: number) {
    setSelectedIndex((index) =>
      index === null
        ? null
        : (index + direction + templePhotos.length) % templePhotos.length,
    );
  }

  function closeGallery() {
    setSelectedIndex(null);
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
    )
      event.currentTarget.close();
  }

  return (
    <>
      <section
        className="section gallery-section wrap"
        id="gallery"
        aria-labelledby="gallery-title"
      >
        <div className="section-top">
          <div>
            <p className="section-label"><CmsText id="homeGallery.text001" /></p>
            <h2 className="section-title" id="gallery-title">
              <CmsText id="homeGallery.text002" /></h2>
          </div>
          <p className="section-intro">
            <CmsText id="homeGallery.text003" /><br />
            <CmsText id="homeGallery.text004" /></p>
        </div>
        <div className="gallery-grid">
          {templePhotos.map((photo, index) => (
            <button
              type="button"
              className="gallery-card"
              key={photo.id}
              data-photo={index}
              aria-label={`${photo.title} — ${copy("gallery.viewLarge")}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setSelectedIndex(index);
              }}
            >
              <span className="gallery-image">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 600px) 45vw, (max-width: 1000px) 42vw, 280px"
                />
                <span className="gallery-expand" aria-hidden="true">
                  ↗
                </span>
              </span>
              <span className="gallery-caption">
                <span className="gallery-count">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <strong>{photo.title}</strong>
              </span>
            </button>
          ))}
          <div className="gallery-invitation">
            <span className="gallery-om" aria-hidden="true">
              <CmsText id="homeGallery.text005" /></span>
            <p className="section-label"><CmsText id="homeGallery.text006" /></p>
            <h3>
              <CmsText id="homeGallery.text007" /><br />
              <CmsText id="homeGallery.text008" /></h3>
            <a className="text-button" href="/#contact">
              <CmsText id="homeGallery.text009" /><span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
      <dialog
        className="gallery-dialog"
        id="gallery-dialog"
        ref={dialogRef}
        aria-labelledby="gallery-dialog-title"
        aria-describedby="gallery-dialog-description"
        onClose={closeGallery}
        onClick={onBackdropClick}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            movePhoto(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="gallery-dialog-top">
          <span>
            {isOpen ? selectedIndex + 1 : 0} / {templePhotos.length}
          </span>
          <button
            className="gallery-close"
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label={copy("gallery.close")}
          >
            ×
          </button>
        </div>
        {selected && (
          <Image
            className="gallery-full-image"
            src={selected.src}
            alt={selected.alt}
            width={selected.width}
            height={selected.height}
            sizes="(max-width: 600px) 90vw, 600px"
          />
        )}
        <div className="gallery-dialog-bottom">
          <button
            className="gallery-arrow"
            type="button"
            onClick={() => movePhoto(-1)}
            aria-label={copy("gallery.previous")}
          >
            ←
          </button>
          <div aria-live="polite">
            <h2 id="gallery-dialog-title">{selected?.title}</h2>
            <p id="gallery-dialog-description">{selected?.caption}</p>
          </div>
          <button
            className="gallery-arrow"
            type="button"
            onClick={() => movePhoto(1)}
            aria-label={copy("gallery.next")}
          >
            →
          </button>
        </div>
      </dialog>
    </>
  );
}
