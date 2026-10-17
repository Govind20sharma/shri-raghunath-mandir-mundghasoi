"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { useCmsContent, useCmsCopy } from "@/components/cms-content-provider";
import { activePhotos } from "@/lib/cms/model";

export function ConstructionGallery() {
  const content = useCmsContent();
  const copy = useCmsCopy();
  const years = content.years.filter((year) => year.published).sort((a, b) => a.order - b.order).map((year) => ({
    ...year,
    albums: content.albums.filter((album) => album.yearId === year.id && album.published).sort((a, b) => a.order - b.order)
      .map((album) => ({ ...album, photos: activePhotos(album.photos) })).filter((album) => album.photos.length),
  })).filter((year) => year.albums.length);
  const photos = years.flatMap((year) => year.albums.flatMap((album) => album.photos.map((photo) => ({ ...photo, key: `${album.id}/${photo.id}`, year: year.year }))));
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selectedIndex = photos.findIndex((photo) => photo.key === selectedKey);
  const selected = photos[selectedIndex];
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const isOpen = Boolean(selected);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; if (dialog.open) dialog.close(); };
  }, [isOpen]);

  function openPhoto(key: string, trigger: HTMLButtonElement) { triggerRef.current = trigger; setSelectedKey(key); }
  function closeGallery() { setSelectedKey(null); triggerRef.current?.focus(); }
  function movePhoto(direction: number) {
    if (photos.length) setSelectedKey(photos[(selectedIndex + direction + photos.length) % photos.length].key);
  }
  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialogRef.current?.close();
  }

  return <>
    {years.map((year) => {
      const yearPhotos = year.albums.flatMap((album) => album.photos);
      let photoNumber = 0;
      return <section className="wrap construction-collection" id={`year-${year.year}`} key={year.id} aria-labelledby={`${year.id}-title`}>
        <div className="construction-year-heading">
          <div className="construction-year" aria-hidden="true">{year.year}</div>
          <div>
            <p className="section-label">{copy("photos.yearLabel", undefined, { year: year.year })}</p>
            <h2 id={`${year.id}-title`}>{year.title}</h2>
            <p>{year.description}</p>
            <span className="construction-total">{copy("photos.count", undefined, { photos: yearPhotos.length, albums: year.albums.length })}</span>
          </div>
          <button className="button primary" type="button" aria-haspopup="dialog" onClick={(event) => openPhoto(`${year.albums[0].id}/${yearPhotos[0].id}`, event.currentTarget)}>
            {copy("photos.first")} <span aria-hidden="true">↗</span>
          </button>
        </div>
        <nav className="construction-jump-links" aria-label={`${year.year} के संग्रह`}>
          {year.albums.map((album, index) => <a href={`#album-${album.id}`} key={album.id}><span>{String(index + 1).padStart(2, "0")}</span> {album.title}</a>)}
        </nav>
        {year.albums.map((album, albumIndex) => {
          const start = photoNumber + 1;
          photoNumber += album.photos.length;
          return <section className="construction-stage" id={`album-${album.id}`} key={album.id} aria-labelledby={`album-${album.id}-title`}>
            <div className="construction-stage-heading">
              <span className="construction-stage-number" aria-hidden="true">{String(albumIndex + 1).padStart(2, "0")}</span>
              <div><h3 id={`album-${album.id}-title`}>{album.title}</h3><p>{album.description}</p>{album.kind === "reference" && <span className="construction-total">{copy("photos.references.badge")}</span>}</div>
              <span className="construction-stage-range">{String(start).padStart(3, "0")}–{String(photoNumber).padStart(3, "0")}</span>
            </div>
            <div className="gallery-grid construction-grid">
              {album.photos.map((photo, index) => <button type="button" className="gallery-card" key={photo.id} aria-label={`${String(start + index).padStart(3, "0")} — ${photo.title} — बड़ी तस्वीर देखें`} aria-haspopup="dialog" onClick={(event) => openPhoto(`${album.id}/${photo.id}`, event.currentTarget)}>
                <span className="gallery-image"><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 600px) 43vw, (max-width: 1000px) 44vw, 285px" /><span className="gallery-expand" aria-hidden="true">↗</span></span>
                <span className="gallery-caption"><span className="gallery-count">{String(start + index).padStart(3, "0")}</span><strong>{photo.title}</strong></span>
              </button>)}
            </div>
          </section>;
        })}
        <div className="construction-endnote"><span aria-hidden="true">॥</span><p>{copy("photos.endnote")}</p><a className="text-button" href="/#contact">{copy("photos.visit")} <span aria-hidden="true">↗</span></a></div>
      </section>;
    })}
    <dialog className="gallery-dialog construction-dialog" ref={dialogRef} aria-labelledby={titleId} aria-describedby={descriptionId} onClose={closeGallery} onClick={onBackdropClick} onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); movePhoto(event.key === "ArrowLeft" ? -1 : 1); }
    }}>
      <div className="gallery-dialog-top"><span>{selected?.year} · {selectedIndex + 1} / {photos.length}</span><button className="gallery-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="तस्वीर बंद करें">×</button></div>
      {selected && <Image className="gallery-full-image" src={selected.src} alt={selected.alt} width={selected.width} height={selected.height} sizes="(max-width: 600px) 90vw, 800px" />}
      <div className="gallery-dialog-bottom"><button className="gallery-arrow" type="button" onClick={() => movePhoto(-1)} aria-label="पिछली तस्वीर">←</button><div aria-live="polite"><h2 id={titleId}>{selected?.title}</h2><p id={descriptionId}>{selected?.caption}</p></div><button className="gallery-arrow" type="button" onClick={() => movePhoto(1)} aria-label="अगली तस्वीर">→</button></div>
    </dialog>
  </>;
}
