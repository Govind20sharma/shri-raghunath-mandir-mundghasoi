"use client";

import { useId, useRef, type ChangeEvent } from "react";
import { activePhotos, type CmsPhoto } from "@/lib/cms/model";
import styles from "./admin.module.css";

type PhotoEditorProps = {
  photos: CmsPhoto[];
  onChange: (photos: CmsPhoto[]) => void;
  onUpload: (files: File[]) => Promise<void>;
  uploading: boolean;
  uploadDisabled?: boolean;
  heroPhotoId?: string;
  onHeroChange?: (id: string) => void;
  reference?: boolean;
};

export function PhotoEditor({ photos, onChange, onUpload, uploading, uploadDisabled, heroPhotoId, onHeroChange, reference }: PhotoEditorProps) {
  const visible = activePhotos(photos);
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  function update(id: string, patch: Partial<CmsPhoto>) {
    onChange(photos.map((photo) => photo.id === id ? { ...photo, ...patch } : photo));
  }
  function move(id: string, to: number) {
    const list = [...visible];
    const index = list.findIndex((photo) => photo.id === id);
    if (index < 0 || to < 0 || to >= list.length || index === to) return;
    const [photo] = list.splice(index, 1);
    list.splice(to, 0, photo);
    onChange([...list.map((item, order) => ({ ...item, order })), ...photos.filter((item) => item.deletedAt)]);
  }
  async function chooseFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    event.target.value = "";
    if (files.length) await onUpload(files);
  }
  return (
    <div>
      <div className={styles.uploadBox}>
        <div><strong>{reference ? "संदर्भ तस्वीरें जोड़ें" : "नई तस्वीरें जोड़ें"}</strong><p>JPG, PNG या WebP · एक साथ कई तस्वीरें चुनें। तस्वीरें अधिकतम 1600px में तैयार होंगी।</p></div>
        <input ref={fileRef} id={inputId} className={styles.fileInput} type="file" accept="image/jpeg,image/png,image/webp" multiple disabled={uploading || uploadDisabled} onChange={chooseFiles} />
        <button className={styles.primary} type="button" disabled={uploading || uploadDisabled} onClick={() => fileRef.current?.click()}>{uploading ? "Upload हो रहा है…" : "तस्वीरें चुनें"}</button>
      </div>
      <p className={styles.help}>तस्वीर खींचकर क्रम बदलें या ↑ ↓ बटन दबाएँ। हटाई गई तस्वीर “Trash” में मिल जाएगी।{reference ? " ये तस्वीरें वेबसाइट पर संदर्भ के रूप में दिखाई जाएँगी।" : ""}</p>
      {visible.length === 0 && <div className={styles.empty}>अभी कोई तस्वीर नहीं है। ऊपर से तस्वीरें जोड़ें।</div>}
      <div className={styles.photoGrid}>
        {visible.map((photo, index) => (
          <article className={styles.photoCard} key={photo.id} onDragOver={(event) => { if (!uploading) event.preventDefault(); }} onDrop={(event) => { event.preventDefault(); const id = event.dataTransfer.getData("text/x-mandir-photo"); if (id) move(id, index); }}>
            <div className={styles.photoToolbar}>
              <button className={styles.dragHandle} type="button" draggable={!uploading} onDragStart={(event) => { event.dataTransfer.setData("text/x-mandir-photo", photo.id); event.dataTransfer.effectAllowed = "move"; }} aria-label={`${photo.title || "तस्वीर"} का क्रम खींचकर बदलें`} title="खींचकर क्रम बदलें">⠿ <span>{String(index + 1).padStart(3, "0")}</span></button>
              <div className={styles.buttonRow}>
                <button type="button" className={styles.iconButton} disabled={index === 0 || uploading} onClick={() => move(photo.id, index - 1)} aria-label={`${photo.title || "तस्वीर"} ऊपर करें`}>↑</button>
                <button type="button" className={styles.iconButton} disabled={index === visible.length - 1 || uploading} onClick={() => move(photo.id, index + 1)} aria-label={`${photo.title || "तस्वीर"} नीचे करें`}>↓</button>
              </div>
            </div>
            <a className={styles.photoPreview} href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`${photo.title || "तस्वीर"} नए टैब में देखें`}><img src={photo.src} alt={photo.alt || "तस्वीर का preview"} loading="lazy" /></a>
            <div className={styles.photoFields}>
              {onHeroChange && <label className={styles.checkLabel}><input type="radio" name="hero-photo" checked={heroPhotoId === photo.id} onChange={() => onHeroChange(photo.id)} />मुख्य पृष्ठ की बड़ी तस्वीर (Hero)</label>}
              <label>शीर्षक<input value={photo.title} maxLength={180} onChange={(event) => update(photo.id, { title: event.target.value })} /></label>
              <label>नीचे दिखने वाला विवरण<textarea rows={2} value={photo.caption} maxLength={1200} onChange={(event) => update(photo.id, { caption: event.target.value })} /></label>
              <label>Alt text <span className={styles.optional}>तस्वीर में क्या है</span><textarea rows={2} value={photo.alt} maxLength={400} onChange={(event) => update(photo.id, { alt: event.target.value })} /></label>
              <button type="button" className={styles.dangerText} disabled={uploading} onClick={() => update(photo.id, { deletedAt: new Date().toISOString() })}>तस्वीर Trash में भेजें</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
