"use client";

import { activePhotos, type CmsContent, type CmsPhoto, type CmsSection, type CmsSettings } from "@/lib/cms/model";
import { cmsCopyFields } from "@/lib/cms/copy-fields";
import styles from "./admin.module.css";

type ChangeContent = (update: (content: CmsContent) => void) => void;

const sectionSlots: { value: CmsSection["slot"]; label: string }[] = [
  { value: "home.after-about", label: "मुख्य पृष्ठ · परिचय के बाद" },
  { value: "home.after-gallery", label: "मुख्य पृष्ठ · तस्वीरों के बाद" },
  { value: "home.before-contact", label: "मुख्य पृष्ठ · संपर्क से पहले" },
  { value: "photos.after-intro", label: "Photos पृष्ठ · परिचय के बाद" },
  { value: "photos.after-gallery", label: "Photos पृष्ठ · संग्रह के बाद" },
];

export function CopyEditor({ content, change }: { content: CmsContent; change: ChangeContent }) {
  const groups = [...new Set(cmsCopyFields.map((field) => field.group))];
  return <>
    <div className={styles.panelHeading}><div><h2>वेबसाइट के सभी शब्द</h2><p>मेन्यू, headings, बटन और विवरण बदलें। हर field के नीचे उसकी अक्षर सीमा दी गई है।</p></div></div>
    <div className={styles.copyGroups}>
      {groups.map((group) => <details className={styles.copyGroup} key={group} open={groups.length < 3}>
        <summary>{group}<span>{cmsCopyFields.filter((field) => field.group === group).length} शब्द / विवरण</span></summary>
        <div className={styles.formGrid}>
          {cmsCopyFields.filter((field) => field.group === group).map((field) => <label key={field.key}>{field.label}
            <textarea rows={field.maxLength > 250 ? 3 : 2} value={content.copy[field.key] ?? field.defaultValue} maxLength={field.maxLength} onChange={(event) => change((draft) => { draft.copy[field.key] = event.target.value; })} />
            <span className={styles.fieldHint}>{(content.copy[field.key] ?? field.defaultValue).length} / {field.maxLength}</span>
          </label>)}
        </div>
      </details>)}
    </div>
  </>;
}

function timeValue(hour: number) {
  const minutes = Math.round(hour * 60);
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}

export function SettingsEditor({ content, change }: { content: CmsContent; change: ChangeContent }) {
  const settings = content.settings;
  const fields: { key: keyof Omit<CmsSettings, "contacts" | "darshan">; label: string; max: number; type?: string; hint?: string }[] = [
    { key: "name", label: "मंदिर का नाम", max: 100 },
    { key: "onlineName", label: "ऑनलाइन नाम / Google पर नाम", max: 120 },
    { key: "location", label: "गाँव / स्थान", max: 240 },
    { key: "address", label: "पूरा पता", max: 600 },
    { key: "phone", label: "मुख्य फ़ोन नंबर", max: 40 },
    { key: "displayPhone", label: "वेबसाइट पर दिखने वाला फ़ोन नंबर", max: 60 },
    { key: "phoneHref", label: "फ़ोन लिंक", max: 34, hint: "उदाहरण: tel:+919876543210" },
    { key: "mapsUrl", label: "Google Maps लिंक", max: 2000, type: "url" },
    { key: "googleListingUrl", label: "Google Listing लिंक", max: 2000, type: "url" },
    { key: "locationSource", label: "स्थान के स्रोत का लिंक", max: 2000, type: "url" },
    { key: "timeZone", label: "दर्शन समय का Time zone", max: 80, hint: "भारत के लिए Asia/Kolkata" },
  ];
  return <>
    <div className={styles.panelHeading}><div><h2>मंदिर की जानकारी</h2><p>नाम, पता, संपर्क और दर्शन का समय वेबसाइट पर यहीं से बदलें।</p></div></div>
    <section className={styles.formSection} aria-labelledby="temple-details"><h3 id="temple-details">नाम और पता</h3><div className={styles.formGrid}>
      {fields.map((field) => <label key={field.key}>{field.label}<input type={field.type || "text"} value={settings[field.key]} maxLength={field.max} onChange={(event) => change((draft) => { draft.settings[field.key] = event.target.value; if (field.key === "phone") { draft.settings.displayPhone = event.target.value; draft.settings.phoneHref = `tel:${event.target.value.replace(/[^0-9+]/g, "")}`; } })} />{field.hint && <span className={styles.fieldHint}>{field.hint}</span>}</label>)}
    </div></section>
    <section className={styles.formSection} aria-labelledby="darshan-settings"><h3 id="darshan-settings">दर्शन का समय</h3><p className={styles.help}>सुबह और शाम के समय 24-hour clock में चुनें। वेबसाइट पर दर्शन की स्थिति इसी से चलेगी।</p><div className={styles.formGrid}>
      {(["morning", "evening"] as const).map((period) => (["opens", "closes"] as const).map((edge) => <label key={`${period}-${edge}`}>{period === "morning" ? "सुबह" : "शाम"} · {edge === "opens" ? "खुलने का समय" : "बंद होने का समय"}<input type="time" value={timeValue(settings.darshan[period][edge])} onChange={(event) => { const [hour, minute] = event.target.value.split(":").map(Number); if (Number.isFinite(hour) && Number.isFinite(minute)) change((draft) => { draft.settings.darshan[period][edge] = hour + minute / 60; }); }} /></label>))}
    </div></section>
    <section className={styles.formSection} aria-labelledby="contacts-settings"><div className={styles.panelHeading}><h3 id="contacts-settings">संपर्क व्यक्ति</h3><button className={styles.secondary} type="button" disabled={settings.contacts.length >= 12} onClick={() => change((draft) => { draft.settings.contacts.push({ name: "नया संपर्क", nameEnglish: "", role: "", phone: "", displayPhone: "", phoneHref: "" }); })}>+ संपर्क जोड़ें</button></div>
      {settings.contacts.map((contact, index) => <div className={styles.itemBox} key={index}><div className={styles.formGrid}>
        {([{ key: "name", label: "नाम" }, { key: "nameEnglish", label: "English नाम" }, { key: "role", label: "भूमिका" }, { key: "phone", label: "फ़ोन नंबर" }, { key: "displayPhone", label: "दिखने वाला फ़ोन नंबर" }, { key: "phoneHref", label: "फ़ोन लिंक (tel:+91…)" }] as const).map((field) => <label key={field.key}>{field.label}<input value={contact[field.key]} maxLength={field.key === "role" ? 160 : field.key === "phone" ? 40 : field.key === "displayPhone" ? 60 : field.key === "phoneHref" ? 34 : 100} onChange={(event) => change((draft) => { draft.settings.contacts[index][field.key] = event.target.value; if (field.key === "phone") { draft.settings.contacts[index].displayPhone = event.target.value; draft.settings.contacts[index].phoneHref = `tel:${event.target.value.replace(/[^0-9+]/g, "")}`; } })} /></label>)}
      </div><button className={styles.dangerText} type="button" disabled={settings.contacts.length <= 1} onClick={() => change((draft) => { draft.settings.contacts.splice(index, 1); })}>यह संपर्क हटाएँ</button></div>)}
    </section>
  </>;
}

export function SectionsEditor({ content, change, uploadSection, uploading, uploadDisabled }: { content: CmsContent; change: ChangeContent; uploadSection: (sectionId: string, file: File) => Promise<void>; uploading: boolean; uploadDisabled: boolean }) {
  const sections = [...content.sections].sort((a, b) => a.order - b.order);
  const availablePhotos = Array.from(new Map([...activePhotos(content.homePhotos), ...activePhotos(content.references), ...content.albums.flatMap((album) => activePhotos(album.photos)), ...content.sections.flatMap((section) => section.image && !section.image.deletedAt ? [section.image] : [])].map((photo) => [photo.id, photo])).values());
  function edit(id: string, patch: Partial<CmsSection>) {
    change((draft) => { const section = draft.sections.find((item) => item.id === id); if (section) Object.assign(section, patch); });
  }
  function move(index: number, direction: number) {
    const list = [...sections];
    const [item] = list.splice(index, 1);
    list.splice(index + direction, 0, item);
    change((draft) => { draft.sections = list.map((section, order) => ({ ...section, order })); });
  }
  function editImage(id: string, patch: Partial<CmsPhoto>) {
    const image = sections.find((section) => section.id === id)?.image;
    if (image) edit(id, { image: { ...image, ...patch } });
  }
  return <>
    <div className={styles.panelHeading}><div><h2>नए Section बनाएँ</h2><p>टेक्स्ट, सूचना, cards या तस्वीर के साथ विवरण जोड़ें। वेबसाइट की तय शैली में दिखेगा।</p></div><button type="button" className={styles.primary} onClick={() => change((draft) => { draft.sections.push({ id: crypto.randomUUID(), slot: "photos.after-gallery", type: "text", title: "नया Section", body: "", order: draft.sections.length, published: false, items: [] }); })}>+ Section जोड़ें</button></div>
    {sections.length === 0 && <div className={styles.empty}>अभी अतिरिक्त Section नहीं हैं। ऊपर से पहला Section जोड़ सकते हैं।</div>}
    {sections.map((section, index) => <section key={section.id} className={styles.itemBox} aria-label={`${section.title || "नया"} Section`}>
      <div className={styles.panelHeading}><strong>Section {index + 1}</strong><div className={styles.buttonRow}><button type="button" className={styles.iconButton} disabled={index === 0} onClick={() => move(index, -1)} aria-label="Section ऊपर करें">↑</button><button type="button" className={styles.iconButton} disabled={index === sections.length - 1} onClick={() => move(index, 1)} aria-label="Section नीचे करें">↓</button><label className={styles.checkLabel}><input type="checkbox" checked={section.published} onChange={(event) => edit(section.id, { published: event.target.checked })} />वेबसाइट पर दिखाएँ</label></div></div>
      <div className={styles.formGrid}><label>कहाँ दिखेगा<select value={section.slot} onChange={(event) => edit(section.id, { slot: event.target.value as CmsSection["slot"] })}>{sectionSlots.map((slot) => <option key={slot.value} value={slot.value}>{slot.label}</option>)}</select></label><label>Section का प्रकार<select value={section.type} onChange={(event) => edit(section.id, { type: event.target.value as CmsSection["type"] })}><option value="text">टेक्स्ट</option><option value="notice">सूचना</option><option value="cards">Cards</option><option value="image-text">तस्वीर + विवरण</option></select></label><label className={styles.fullWidth}>शीर्षक<input value={section.title} maxLength={180} onChange={(event) => edit(section.id, { title: event.target.value })} /></label><label className={styles.fullWidth}>विवरण<textarea rows={4} value={section.body} maxLength={5000} onChange={(event) => edit(section.id, { body: event.target.value })} /></label></div>
      {section.type === "cards" && <div className={styles.sectionItems}><div className={styles.panelHeading}><h4>Cards</h4><button type="button" className={styles.secondary} onClick={() => edit(section.id, { items: [...section.items, { id: crypto.randomUUID(), title: "नया Card", body: "" }] })}>+ Card जोड़ें</button></div>{section.items.map((item, itemIndex) => <div className={styles.itemBox} key={item.id}><label>Card का शीर्षक<input value={item.title} maxLength={180} onChange={(event) => edit(section.id, { items: section.items.map((old) => old.id === item.id ? { ...old, title: event.target.value } : old) })} /></label><label>Card का विवरण<textarea value={item.body} rows={3} maxLength={1600} onChange={(event) => edit(section.id, { items: section.items.map((old) => old.id === item.id ? { ...old, body: event.target.value } : old) })} /></label><div className={styles.buttonRow}><button type="button" className={styles.secondary} disabled={itemIndex === 0} onClick={() => { const items = [...section.items]; [items[itemIndex - 1], items[itemIndex]] = [items[itemIndex], items[itemIndex - 1]]; edit(section.id, { items }); }}>↑ ऊपर</button><button type="button" className={styles.secondary} disabled={itemIndex === section.items.length - 1} onClick={() => { const items = [...section.items]; [items[itemIndex + 1], items[itemIndex]] = [items[itemIndex], items[itemIndex + 1]]; edit(section.id, { items }); }}>↓ नीचे</button><button type="button" className={styles.dangerText} onClick={() => edit(section.id, { items: section.items.filter((old) => old.id !== item.id) })}>Card हटाएँ</button></div></div>)}</div>}
      {section.type === "image-text" && <div className={styles.sectionImage}><label>मौजूदा तस्वीर चुनें<select value={section.image?.id || ""} onChange={(event) => edit(section.id, { image: availablePhotos.find((photo) => photo.id === event.target.value) })}><option value="">तस्वीर चुनें</option>{availablePhotos.map((photo) => <option key={photo.id} value={photo.id}>{photo.title || photo.id}</option>)}</select></label><p className={styles.help}>इस Section को Save करने के लिए तस्वीर चुनें या नीचे से नई तस्वीर Upload करें।</p>{section.image && <><a href={section.image.src} target="_blank" rel="noopener noreferrer" aria-label="Section की तस्वीर नए टैब में देखें"><img src={section.image.src} alt={section.image.alt || "Section की तस्वीर"} /></a><div className={styles.formGrid}><label>तस्वीर का शीर्षक<input value={section.image.title} maxLength={180} onChange={(event) => editImage(section.id, { title: event.target.value })} /></label><label>Alt text<input value={section.image.alt} maxLength={400} onChange={(event) => editImage(section.id, { alt: event.target.value })} /></label><label className={styles.fullWidth}>तस्वीर का विवरण<textarea rows={2} value={section.image.caption} maxLength={1200} onChange={(event) => editImage(section.id, { caption: event.target.value })} /></label></div><button type="button" className={styles.dangerText} onClick={() => edit(section.id, { image: undefined })}>Section की तस्वीर हटाएँ</button></>}<label className={styles.uploadLabel}>{section.image ? "तस्वीर बदलें" : "तस्वीर जोड़ें"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading || uploadDisabled} onChange={async (event) => { const file = event.target.files?.[0]; event.target.value = ""; if (file) await uploadSection(section.id, file); }} /></label></div>}
      <p className={styles.help}>यह Section {section.published ? "अगली Publish के बाद दिखेगा।" : "अभी छिपा रहेगा। दिखाने के लिए checkbox चुनें।"}</p>
      <button type="button" className={styles.dangerText} disabled={uploading} onClick={() => change((draft) => { draft.sections = draft.sections.filter((old) => old.id !== section.id); })}>यह Section हटाएँ</button>
    </section>)}
  </>;
}
