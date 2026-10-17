"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { googleIdToken, signOutFirebase, type PublicFirebaseConfig } from "@/lib/cms/firebase-client";
import { activePhotos, type CmsAlbum, type CmsContent, type CmsDraft, type CmsPhoto } from "@/lib/cms/model";
import { CopyEditor, SectionsEditor, SettingsEditor } from "./content-editors";
import { PhotoEditor } from "./photo-editor";
import { apiRequest, uploadPhoto } from "./upload";
import styles from "./admin.module.css";

type AdminStatus = {
  configured: boolean;
  firebaseConfigured: boolean;
  cloudinaryConfigured: boolean;
  firebaseConfig: PublicFirebaseConfig | null;
  user: { email: string } | null;
};
type Tab = "overview" | "photos" | "home" | "references" | "copy" | "sections" | "settings" | "trash";
type UploadTarget = "home" | "references" | `album:${string}` | `section:${string}`;
const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Dashboard", icon: "⌂" },
  { id: "photos", label: "साल और Photo संग्रह", icon: "▦" },
  { id: "home", label: "मुख्य पृष्ठ की तस्वीरें", icon: "▧" },
  { id: "references", label: "प्रस्तावित स्वरूप", icon: "◇" },
  { id: "copy", label: "वेबसाइट के शब्द", icon: "✎" },
  { id: "sections", label: "Sections", icon: "+" },
  { id: "settings", label: "मंदिर की जानकारी", icon: "⚙" },
  { id: "trash", label: "Trash / वापस लाएँ", icon: "↶" },
];

function errorText(error: unknown) {
  if (!(error instanceof Error)) return "कुछ गड़बड़ी हुई। दोबारा कोशिश करें।";
  if (error.message.includes("auth/popup-closed-by-user")) return "Google sign-in बंद हो गया। फिर से Sign in दबाएँ।";
  if (error.message.includes("auth/popup-blocked")) return "Browser ने sign-in window रोक दी। इस साइट के लिए pop-ups allow करके फिर कोशिश करें।";
  if (error.message.includes("auth/unauthorized-domain")) return "यह domain Firebase Authentication में authorized नहीं है। Firebase console में इस वेबसाइट का domain जोड़ें।";
  return error.message;
}

function displayDate(value: string | null) {
  if (!value) return "अभी नहीं";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("hi-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(date);
}

function allPhotoGroups(content: CmsContent) {
  return [
    { target: "home" as UploadTarget, label: "मुख्य पृष्ठ", photos: content.homePhotos },
    { target: "references" as UploadTarget, label: "प्रस्तावित स्वरूप", photos: content.references },
    ...content.albums.map((album) => ({ target: `album:${album.id}` as UploadTarget, label: `${content.years.find((year) => year.id === album.yearId)?.year || ""} · ${album.title}`, photos: album.photos })),
  ];
}

function replacePhotos(content: CmsContent, target: UploadTarget, update: (photos: CmsPhoto[]) => CmsPhoto[]) {
  if (target === "home") {
    content.homePhotos = update(content.homePhotos);
    if (!activePhotos(content.homePhotos).some((photo) => photo.id === content.heroPhotoId)) content.heroPhotoId = activePhotos(content.homePhotos)[0]?.id || "";
  } else if (target === "references") content.references = update(content.references);
  else if (target.startsWith("album:")) {
    const album = content.albums.find((item) => item.id === target.slice(6));
    if (album) album.photos = update(album.photos);
  }
}

function SetupStatus({ status }: { status: AdminStatus }) {
  if (status.configured) return null;
  return <section className={styles.setupBox} aria-labelledby="setup-title"><h2 id="setup-title">Admin setup पूरा करें</h2><p>यह पृष्ठ तैयार है। Save, Publish और photo upload के लिए नीचे दिख रही services connect होनी चाहिए।</p><ul><li><strong>Firebase / Google sign-in:</strong> {status.firebaseConfigured ? "जुड़ा हुआ है ✓" : "अभी configure नहीं है"}</li><li><strong>Cloudinary photo storage:</strong> {status.cloudinaryConfigured ? "जुड़ा हुआ है ✓" : "अभी configure नहीं है"}</li></ul>{!status.firebaseConfigured && <p>Firebase project में Google sign-in चालू करें, इस वेबसाइट का domain authorize करें और server configuration जोड़ें। Owner account: <strong>govindsharma5768@gmail.com</strong>.</p>}{!status.cloudinaryConfigured && <p>Cloudinary account की cloud name, API key और API secret server environment में जोड़ें। API secret इस पृष्ठ में नहीं भरना है।</p>}<p className={styles.help}>Project की CMS setup guide में सभी server settings मिलेंगी। Setup के बाद इस पृष्ठ को Refresh करें।</p><button type="button" className={styles.secondary} onClick={() => window.location.reload()}>Setup फिर जाँचें</button></section>;
}

export function AdminDashboard() {
  const [status, setStatus] = useState<AdminStatus | null>(null);
  const [draft, setDraft] = useState<CmsDraft | null>(null);
  const [savedContent, setSavedContent] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const [busy, setBusy] = useState<"signin" | "saving" | "publishing" | "loading" | "logout" | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [conflict, setConflict] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [selectedYearId, setSelectedYearId] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState("");
  const [newYear, setNewYear] = useState("2025");
  const [uploading, setUploading] = useState<UploadTarget | null>(null);
  const [uploadProgress, setUploadProgress] = useState("");
  const dirty = draft !== null && JSON.stringify(draft.content) !== savedContent;

  const setLoadedDraft = useCallback((loaded: CmsDraft) => {
    setDraft(loaded);
    setSavedContent(JSON.stringify(loaded.content));
    setConflict(false);
  }, []);

  const refreshStatus = useCallback(async () => {
    const current = await apiRequest<AdminStatus>("/api/admin/status");
    setStatus(current);
    if (current.user) setLoadedDraft(await apiRequest<CmsDraft>("/api/admin/content"));
    return current;
  }, [setLoadedDraft]);

  useEffect(() => {
    refreshStatus().catch((err: unknown) => setError(errorText(err))).finally(() => setInitialLoading(false));
  }, [refreshStatus]);

  useEffect(() => {
    if (!dirty && !uploading) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, uploading]);

  function change(update: (content: CmsContent) => void) {
    setDraft((previous) => {
      if (!previous) return previous;
      const content = structuredClone(previous.content);
      update(content);
      return { ...previous, content };
    });
    setNotice("");
  }

  function handleError(err: unknown) {
    setError(errorText(err));
    if (err instanceof Error && "status" in err && err.status === 409) setConflict(true);
    if (err instanceof Error && "status" in err && err.status === 401) {
      setStatus((previous) => previous ? { ...previous, user: null } : previous);
      setError("Sign-in की समय सीमा पूरी हो गई है। फिर से Google sign-in करें। आपके खुले बदलाव अभी इस tab में हैं।");
    }
  }

  async function signIn() {
    if (!status?.firebaseConfig) return;
    setBusy("signin"); setError(""); setNotice("");
    try {
      const idToken = await googleIdToken(status.firebaseConfig);
      await apiRequest("/api/admin/session", { method: "POST", body: JSON.stringify({ idToken }) });
      if (draft && dirty) {
        const current = await apiRequest<AdminStatus>("/api/admin/status");
        setStatus(current);
        setNotice("फिर से Sign-in हो गया। इस tab के बदलाव सुरक्षित हैं; अब Save Draft कर सकते हैं।");
      } else {
        await refreshStatus();
        setNotice("Google account से sign-in हो गया।");
      }
    } catch (err) { handleError(err); await signOutFirebase().catch(() => undefined); }
    finally { setBusy(null); }
  }

  async function logout() {
    if (dirty && !window.confirm("कुछ बदलाव Save नहीं हुए हैं। Sign out करने से ये बदलाव खो जाएँगे। पहले JSON backup या Save कर सकते हैं। Sign out करें?")) return;
    setBusy("logout"); setError("");
    try {
      await apiRequest("/api/admin/session", { method: "DELETE" });
      await signOutFirebase().catch(() => undefined);
      setDraft(null); setSavedContent(""); setStatus((previous) => previous ? { ...previous, user: null } : previous);
      setNotice("Sign out हो गया।");
    } catch (err) { handleError(err); }
    finally { setBusy(null); }
  }

  async function loadLatest() {
    if (dirty && !window.confirm("नया saved draft लोड करने पर इस tab के बिना Save वाले बदलाव हटेंगे। ज़रूरत हो तो पहले JSON backup लें। नया draft लोड करें?")) return;
    setBusy("loading"); setError("");
    try { setLoadedDraft(await apiRequest<CmsDraft>("/api/admin/content")); setNotice("नया saved draft लोड हो गया।"); }
    catch (err) { handleError(err); }
    finally { setBusy(null); }
  }

  async function saveDraft() {
    if (!draft || !dirty || busy || uploading) return;
    setBusy("saving"); setError(""); setNotice("");
    try {
      const saved = await apiRequest<CmsDraft>("/api/admin/content", { method: "PUT", body: JSON.stringify({ content: draft.content, revision: draft.revision }) });
      setLoadedDraft(saved); setNotice("Draft Save हो गया। वेबसाइट पर दिखाने से पहले Preview देख सकते हैं।");
    } catch (err) { handleError(err); }
    finally { setBusy(null); }
  }

  async function publish() {
    if (!draft || dirty || busy || uploading || conflict) return;
    setBusy("publishing"); setError(""); setNotice("");
    try {
      const published = await apiRequest<CmsDraft>("/api/admin/publish", { method: "POST", body: JSON.stringify({ revision: draft.revision }) });
      setLoadedDraft(published);
      setNotice("Publish हो गया। बदलाव अब live वेबसाइट पर दिखेंगे।");
    } catch (err) { handleError(err); }
    finally { setBusy(null); }
  }

  async function upload(target: UploadTarget, files: File[]) {
    if (uploading || !files.length) return;
    setUploading(target); setError(""); setNotice("");
    const failures: string[] = [];
    let completed = 0;
    for (let index = 0; index < files.length; index += 1) {
      setUploadProgress(`${index + 1} / ${files.length} · ${files[index].name}`);
      try {
        const photo = await uploadPhoto(files[index]);
        change((content) => {
          if (target.startsWith("section:")) {
            const section = content.sections.find((item) => item.id === target.slice(8));
            if (section) section.image = { ...photo, order: 0 };
          } else replacePhotos(content, target, (photos) => [...photos, { ...photo, order: Math.max(-1, ...photos.map((item) => item.order)) + 1 }]);
        });
        completed += 1;
      } catch (err) { failures.push(`${files[index].name}: ${errorText(err)}`); }
    }
    setUploading(null); setUploadProgress("");
    if (completed) setNotice(`${completed} तस्वीरें जुड़ गईं। शीर्षक और Alt text जाँचें, फिर Save Draft करें।`);
    if (failures.length) setError(failures.join("\n"));
  }

  function exportBackup() {
    if (!draft) return;
    const data = { exportedAt: new Date().toISOString(), ...draft };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
    const anchor = document.createElement("a"); anchor.href = url;
    anchor.download = `mandir-content-revision-${draft.revision}.json`; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const content = draft?.content;
  const years = content ? [...content.years].sort((a, b) => a.order - b.order) : [];
  const selectedYear = years.find((year) => year.id === selectedYearId) || years[0];
  const albums = content ? content.albums.filter((album) => album.yearId === selectedYear?.id).sort((a, b) => a.order - b.order) : [];
  const selectedAlbum = albums.find((album) => album.id === selectedAlbumId) || albums[0];
  const photoGroups = content ? allPhotoGroups(content) : [];
  const photoCount = photoGroups.reduce((total, group) => total + activePhotos(group.photos).length, 0);
  const trash = photoGroups.flatMap((group) => group.photos.filter((photo) => photo.deletedAt).map((photo) => ({ ...group, photo })));
  const editingLocked = Boolean(busy || uploading);

  function addYear() {
    if (!content) return;
    const yearNumber = Number(newYear);
    if (!Number.isInteger(yearNumber) || yearNumber < 1900 || yearNumber > 2200) { setError("1900 से 2200 के बीच सही साल लिखें।"); return; }
    if (content.years.some((year) => year.year === yearNumber)) { setError("यह साल पहले से मौजूद है। नीचे उसे चुनें।"); return; }
    const id = `year-${yearNumber}`;
    change((next) => { next.years.push({ id, year: yearNumber, title: `${yearNumber} का फोटो संग्रह`, description: "", order: next.years.length, published: true }); });
    setSelectedYearId(id); setSelectedAlbumId(""); setError("");
  }

  function editAlbum(patch: Partial<CmsAlbum>) {
    if (!selectedAlbum) return;
    change((next) => { const album = next.albums.find((item) => item.id === selectedAlbum.id); if (album) Object.assign(album, patch); });
  }

  function reorderYears(id: string, direction: number) {
    const index = years.findIndex((year) => year.id === id);
    if (index < 0 || index + direction < 0 || index + direction >= years.length) return;
    const next = [...years]; [next[index], next[index + direction]] = [next[index + direction], next[index]];
    change((draft) => { draft.years = next.map((year, order) => ({ ...year, order })); });
  }

  function reorderAlbum(id: string, direction: number) {
    const index = albums.findIndex((album) => album.id === id);
    if (index < 0 || index + direction < 0 || index + direction >= albums.length) return;
    const next = [...albums]; [next[index], next[index + direction]] = [next[index + direction], next[index]];
    change((draft) => { next.forEach((album, order) => { const original = draft.albums.find((item) => item.id === album.id); if (original) original.order = order; }); });
  }

  return <div className={styles.root}>
    <a className={styles.skipLink} href="#admin-content">प्रबंधन सामग्री पर जाएँ</a>
    <header className={styles.header}>
      <Link className={styles.brand} href="/"><span aria-hidden="true">ॐ</span><div><strong>श्री रघुनाथ मंदिर</strong><small>वेबसाइट प्रबंधन</small></div></Link>
      <div className={styles.headerActions}><a href="/photos" target="_blank" rel="noopener noreferrer">Live वेबसाइट ↗</a>{status?.user && <><span className={styles.email}>{status.user.email}</span><button className={styles.secondary} type="button" disabled={editingLocked} onClick={logout}>Sign out</button></>}</div>
    </header>

    {initialLoading ? <main id="admin-content" className={styles.login}><div className={styles.loading} role="status">Admin की स्थिति जाँची जा रही है…</div></main> : !status?.user ? <main id="admin-content" className={styles.login}>
      <div className={styles.loginCard}><p className={styles.eyebrow}>मंदिर वेबसाइट प्रबंधन</p><h1>अपनी वेबसाइट अपने हाथ में।</h1><p>साल के अनुसार फोटो संग्रह बनाएँ, तस्वीरें जोड़ें, शब्द और मंदिर की जानकारी बदलें। बदलाव Preview करके Publish करें।</p><div className={styles.ownerBox}>इस वेबसाइट के owner account से sign-in करें।<strong>govindsharma5768@gmail.com</strong></div><button className={styles.googleButton} type="button" disabled={!status?.firebaseConfigured || !status.firebaseConfig || Boolean(busy)} onClick={signIn}><span aria-hidden="true">G</span>{busy === "signin" ? "Google sign-in खुल रहा है…" : "Google से Sign in करें"}</button>{error && <p className={styles.error} role="alert">{error}</p>}{notice && <p className={styles.notice} role="status">{notice}</p>}{draft && dirty && <div className={styles.ownerBox}>इस tab में आपके बिना Save वाले बदलाव मौजूद हैं। फिर से Sign-in करें या पहले backup डाउनलोड करें।<button className={styles.secondary} type="button" onClick={exportBackup}>बदलावों का JSON backup</button></div>}<p className={styles.help}>Google login सुरक्षित session बनाता है। वेबसाइट के बदलाव केवल authorized owner कर सकते हैं।</p></div>
      {status && <SetupStatus status={status} />}
      {!status && <button type="button" className={styles.secondary} onClick={() => window.location.reload()}>दोबारा जाँचें</button>}
    </main> : <div className={styles.workspace}>
      <aside className={styles.sidebar}><p className={styles.sidebarLabel}>प्रबंधन</p><nav aria-label="Admin के भाग">{tabs.map((item) => <button type="button" key={item.id} aria-current={tab === item.id ? "page" : undefined} className={tab === item.id ? styles.activeTab : ""} onClick={() => setTab(item.id)}><span aria-hidden="true">{item.icon}</span>{item.label}{item.id === "trash" && trash.length > 0 && <small>{trash.length}</small>}</button>)}</nav><p className={styles.sidebarNote}>1. बदलाव करें<br />2. Save Draft<br />3. Preview देखें<br />4. Publish करें</p></aside>
      <main id="admin-content" className={styles.main}>
        <div className={styles.saveBar}><div><strong>{busy === "saving" ? "Save हो रहा है…" : busy === "publishing" ? "Publish हो रहा है…" : dirty ? "बिना Save वाले बदलाव" : "Draft सुरक्षित है"}</strong><small>{draft ? `Revision ${draft.revision} · आखिरी Save: ${displayDate(draft.updatedAt)}` : "Draft लोड किया जा रहा है…"}</small></div><div className={styles.saveActions}><button className={styles.secondary} type="button" disabled={!draft || editingLocked} onClick={loadLatest}>Saved draft लोड करें</button><button className={styles.primary} type="button" disabled={!draft || !dirty || editingLocked || conflict} onClick={saveDraft}>{busy === "saving" ? "Save हो रहा है…" : "Save Draft"}</button><button className={styles.publish} type="button" disabled={!draft || dirty || editingLocked || conflict} onClick={publish} title={dirty ? "पहले Save Draft करें" : "Saved draft live वेबसाइट पर दिखाएँ"}>{busy === "publishing" ? "Publish हो रहा है…" : "Publish"}</button></div></div>
        {dirty && <p className={styles.saveHint}>Preview और Publish में आखिरी saved draft दिखेगा। पहले Save Draft करें।</p>}
        {error && <div className={styles.error} role="alert">{error}{conflict && <p>किसी दूसरे tab या session में नया draft Save हुआ है। पहले अपना JSON backup लें, फिर “Saved draft लोड करें” और बदलाव दोबारा जोड़ें।</p>}</div>}
        {notice && <div className={styles.notice} role="status">{notice}</div>}
        {uploading && <div className={styles.uploadProgress} role="status" aria-live="polite"><strong>तस्वीर तैयार और Upload हो रही है…</strong><span>{uploadProgress}</span><small>पूरा होने तक इस tab को खुला रखें।</small></div>}
        {!status.configured && <SetupStatus status={status} />}
        {!draft || !content ? <div className={styles.empty}><p>Draft नहीं खुल सका। ऊपर दिया error देखें या दोबारा लोड करें।</p><button type="button" className={styles.secondary} disabled={Boolean(busy)} onClick={loadLatest}>Draft दोबारा लोड करें</button></div> : <fieldset className={styles.editorFieldset} disabled={editingLocked}>
          {tab === "overview" && <section><div className={styles.panelHeading}><div><p className={styles.eyebrow}>आपका प्रबंधन पृष्ठ</p><h1>नमस्ते, गोविंद जी।</h1><p>फ़ोटो से लेकर शब्दों तक, पूरी वेबसाइट यहाँ से सँभालें।</p></div></div><div className={styles.stats}><div><strong>{years.length}</strong><span>साल</span></div><div><strong>{content.albums.length}</strong><span>फोटो संग्रह</span></div><div><strong>{photoCount}</strong><span>तस्वीरें</span></div><div><strong>{content.sections.length}</strong><span>अतिरिक्त Sections</span></div></div><div className={styles.dashboardGrid}><section className={styles.infoCard}><h2>बदलाव कैसे करें</h2><ol><li>बाईं तरफ से अपनी जानकारी या तस्वीरों का भाग चुनें।</li><li>बदलाव के बाद <strong>Save Draft</strong> दबाएँ।</li><li>Preview में मुख्य पृष्ठ और Photos पृष्ठ जाँचें।</li><li>तैयार होने पर <strong>Publish</strong> दबाएँ।</li></ol><p className={styles.help}>Save करने से live वेबसाइट नहीं बदलती। Publish करने पर saved बदलाव live होंगे।</p></section><section className={styles.infoCard}><h2>Draft और Live वेबसाइट</h2><p>आखिरी Publish: <strong>{displayDate(draft.publishedAt)}</strong></p><div className={styles.previewLinks}><a className={styles.secondary} href="/?preview=1" target="_blank" rel="noopener noreferrer">मुख्य पृष्ठ Preview ↗</a><a className={styles.secondary} href="/photos?preview=1" target="_blank" rel="noopener noreferrer">Photos Preview ↗</a></div><p className={styles.help}>Preview इसी signed-in browser में खुलेगा। बिना Save वाले बदलाव वहाँ नहीं दिखेंगे।</p><button className={styles.secondary} type="button" onClick={exportBackup}>JSON backup डाउनलोड करें</button></section></div><div className={styles.quickActions}><button type="button" className={styles.secondary} onClick={() => setTab("photos")}>+ नया साल या फोटो संग्रह</button><button type="button" className={styles.secondary} onClick={() => setTab("sections")}>+ नया Section</button><button type="button" className={styles.secondary} onClick={() => setTab("copy")}>वेबसाइट के शब्द बदलें</button></div></section>}

          {tab === "photos" && <section><div className={styles.panelHeading}><div><h2>साल और फोटो संग्रह</h2><p>2025, 2026 जैसे साल बनाएँ। हर साल में निर्माण, दर्शन या उत्सव के अलग संग्रह रख सकते हैं।</p></div></div><div className={styles.addYear}><label>नया साल<input type="number" min="1900" max="2200" value={newYear} onChange={(event) => setNewYear(event.target.value)} /></label><button className={styles.primary} type="button" onClick={addYear}>+ साल जोड़ें</button></div><div className={styles.yearTabs} role="group" aria-label="साल चुनें">{years.map((year) => <button type="button" key={year.id} className={selectedYear?.id === year.id ? styles.selectedPill : styles.pill} onClick={() => { setSelectedYearId(year.id); setSelectedAlbumId(""); }}>{year.year}{!year.published && <small>छिपा हुआ</small>}</button>)}</div>
            {selectedYear ? <><div className={styles.itemBox}><div className={styles.panelHeading}><h3>{selectedYear.year} की जानकारी</h3><div className={styles.buttonRow}><button type="button" className={styles.iconButton} disabled={years[0]?.id === selectedYear.id} onClick={() => reorderYears(selectedYear.id, -1)} aria-label="साल ऊपर करें">↑</button><button type="button" className={styles.iconButton} disabled={years[years.length - 1]?.id === selectedYear.id} onClick={() => reorderYears(selectedYear.id, 1)} aria-label="साल नीचे करें">↓</button><label className={styles.checkLabel}><input type="checkbox" checked={selectedYear.published} onChange={(event) => change((next) => { const year = next.years.find((item) => item.id === selectedYear.id); if (year) year.published = event.target.checked; })} />यह साल दिखाएँ</label></div></div><div className={styles.formGrid}><label>साल का शीर्षक<input value={selectedYear.title} maxLength={160} onChange={(event) => change((next) => { const year = next.years.find((item) => item.id === selectedYear.id); if (year) year.title = event.target.value; })} /></label><label>साल का विवरण<textarea rows={2} value={selectedYear.description} maxLength={1600} onChange={(event) => change((next) => { const year = next.years.find((item) => item.id === selectedYear.id); if (year) year.description = event.target.value; })} /></label></div>{albums.length === 0 && <button type="button" className={styles.dangerText} onClick={() => change((next) => { next.years = next.years.filter((item) => item.id !== selectedYear.id); })}>खाली साल हटाएँ</button>}</div>
              <div className={styles.panelHeading}><h3>इस साल के संग्रह</h3><button type="button" className={styles.secondary} onClick={() => { const id = crypto.randomUUID(); change((next) => { next.albums.push({ id, yearId: selectedYear.id, title: "नया फोटो संग्रह", description: "", kind: "darshan", order: albums.length, published: true, photos: [] }); }); setSelectedAlbumId(id); }}>+ नया संग्रह</button></div><div className={styles.albumTabs} role="group" aria-label="फोटो संग्रह चुनें">{albums.map((album) => <button type="button" className={selectedAlbum?.id === album.id ? styles.selectedPill : styles.pill} key={album.id} onClick={() => setSelectedAlbumId(album.id)}>{album.title}<small>{activePhotos(album.photos).length} तस्वीरें{!album.published ? " · छिपा हुआ" : ""}</small></button>)}</div>
              {selectedAlbum ? <><div className={styles.itemBox}><div className={styles.panelHeading}><h3>संग्रह की जानकारी</h3><div className={styles.buttonRow}><button type="button" className={styles.iconButton} disabled={albums[0]?.id === selectedAlbum.id} onClick={() => reorderAlbum(selectedAlbum.id, -1)} aria-label="संग्रह ऊपर करें">↑</button><button type="button" className={styles.iconButton} disabled={albums[albums.length - 1]?.id === selectedAlbum.id} onClick={() => reorderAlbum(selectedAlbum.id, 1)} aria-label="संग्रह नीचे करें">↓</button><label className={styles.checkLabel}><input type="checkbox" checked={selectedAlbum.published} onChange={(event) => editAlbum({ published: event.target.checked })} />यह संग्रह दिखाएँ</label></div></div><div className={styles.formGrid}><label>संग्रह का शीर्षक<input value={selectedAlbum.title} maxLength={180} onChange={(event) => editAlbum({ title: event.target.value })} /></label><label>तस्वीरों का प्रकार<select value={selectedAlbum.kind} onChange={(event) => editAlbum({ kind: event.target.value as CmsAlbum["kind"] })}><option value="construction">निर्माण</option><option value="darshan">दर्शन</option><option value="festival">उत्सव</option><option value="reference">संदर्भ / प्रस्तावित स्वरूप</option></select></label><label className={styles.fullWidth}>संग्रह का विवरण<textarea rows={3} value={selectedAlbum.description} maxLength={1800} onChange={(event) => editAlbum({ description: event.target.value })} /></label></div>{selectedAlbum.photos.length === 0 && <button type="button" className={styles.dangerText} onClick={() => change((next) => { next.albums = next.albums.filter((item) => item.id !== selectedAlbum.id); })}>खाली संग्रह हटाएँ</button>}</div><PhotoEditor key={selectedAlbum.id} photos={selectedAlbum.photos} onChange={(photos) => editAlbum({ photos })} onUpload={(files) => upload(`album:${selectedAlbum.id}`, files)} uploading={uploading === `album:${selectedAlbum.id}`} uploadDisabled={!status.cloudinaryConfigured} reference={selectedAlbum.kind === "reference"} /></> : <div className={styles.empty}>इस साल का पहला संग्रह बनाएँ, फिर तस्वीरें जोड़ें।</div>}
            </> : <div className={styles.empty}>ऊपर साल जोड़कर अपना पहला फोटो संग्रह बनाएँ।</div>}
          </section>}

          {tab === "home" && <section><div className={styles.panelHeading}><div><h2>मुख्य पृष्ठ की तस्वीरें</h2><p>मुख्य पृष्ठ की gallery यहाँ से बदलें। Hero के लिए एक तस्वीर चुनें। साल के संग्रह यहाँ अपने आप नहीं जुड़ेंगे।</p></div></div><PhotoEditor photos={content.homePhotos} heroPhotoId={content.heroPhotoId} onHeroChange={(id) => change((next) => { next.heroPhotoId = id; })} onChange={(photos) => change((next) => replacePhotos(next, "home", () => photos))} onUpload={(files) => upload("home", files)} uploading={uploading === "home"} uploadDisabled={!status.cloudinaryConfigured} /></section>}
          {tab === "references" && <section><div className={styles.panelHeading}><div><h2>मंदिर का प्रस्तावित स्वरूप</h2><p>Photos पृष्ठ पर अलग “संदर्भ तस्वीर” के रूप में दिखेगा। वर्तमान मंदिर की तस्वीरों से यह संग्रह अलग रखा जाता है।</p></div></div><PhotoEditor photos={content.references} onChange={(photos) => change((next) => { next.references = photos; })} onUpload={(files) => upload("references", files)} uploading={uploading === "references"} uploadDisabled={!status.cloudinaryConfigured} reference /></section>}
          {tab === "copy" && <CopyEditor content={content} change={change} />}
          {tab === "settings" && <SettingsEditor content={content} change={change} />}
          {tab === "sections" && <SectionsEditor content={content} change={change} uploadSection={(id, file) => upload(`section:${id}`, [file])} uploading={Boolean(uploading)} uploadDisabled={!status.cloudinaryConfigured} />}
          {tab === "trash" && <section><div className={styles.panelHeading}><div><h2>Trash से तस्वीर वापस लाएँ</h2><p>यहाँ की तस्वीरें वेबसाइट पर नहीं दिखेंगी। Restore करने के बाद Save और Publish करें।</p></div><button type="button" className={styles.secondary} onClick={exportBackup}>JSON backup लें</button></div>{trash.length === 0 ? <div className={styles.empty}>Trash खाली है।</div> : <div className={styles.trashGrid}>{trash.map(({ target, label, photo }) => <article className={styles.trashCard} key={`${target}:${photo.id}`}><img src={photo.src} alt={photo.alt || photo.title} loading="lazy" /><div><small>{label}</small><h3>{photo.title || "तस्वीर"}</h3><p>हटाई गई: {displayDate(photo.deletedAt || null)}</p><button className={styles.secondary} type="button" onClick={() => change((next) => replacePhotos(next, target, (photos) => photos.map((item) => item.id === photo.id ? { ...item, deletedAt: undefined } : item)))}>↶ वापस लाएँ</button></div></article>)}</div>}<p className={styles.help}>Restore से तस्वीर अपने संग्रह में लौट जाएगी। यह पृष्ठ storage से तस्वीरें स्थायी रूप से नहीं मिटाता।</p></section>}
        </fieldset>}
        <footer className={styles.adminFooter}><span>मंदिर वेबसाइट प्रबंधन</span><div><a href="/?preview=1" target="_blank" rel="noopener noreferrer">मुख्य पृष्ठ Preview ↗</a><a href="/photos?preview=1" target="_blank" rel="noopener noreferrer">Photos Preview ↗</a><button type="button" disabled={!draft} onClick={exportBackup}>JSON backup</button></div></footer>
      </main>
    </div>}
  </div>;
}
