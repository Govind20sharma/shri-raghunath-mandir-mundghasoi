# Shri Raghunath Mandir — Next.js

The Hindi temple website built with **Next.js 16 App Router, React 19 and TypeScript**. It combines a saffron/maroon design with owner-supplied temple photographs, worship information and responsive behavior.

## Photos page — 2026

`/photos` is a dedicated photo page with a **2026** collection of 116 owner-supplied construction photographs. It follows the verified visual sequence from roof casting to the completed shikhar and rooftop chhatris, grouped into 11 stages. The collection year is an archive label; the WhatsApp timestamps are not asserted as capture dates.

`lib/gallery-2026.ts` holds the ordered photo metadata and stage ranges, `components/construction-gallery.tsx` provides the gallery and keyboard-accessible image viewer, and `public/assets/temple/2026/` contains optimized WebP copies. Six personal/reference images from the intake are excluded from publication. The new collection appears only on `/photos`; the existing homepage hero and seven-photo gallery are retained. Shared header/footer links point to the dedicated page and return to homepage sections correctly.

## Run locally

Use Node.js **20.9 or newer** (Node.js 22 LTS recommended) and npm. Run these commands in the folder containing `package.json`:

```bash
npm ci
npm run dev
```

Open **http://localhost:3000**. On Windows PowerShell, use `npm.cmd` if the machine's script execution policy prevents running `npm`.

## Production build

```bash
npm run typecheck
npm run build
npm start
```

`npm run build` creates production output in `.next/`. `npm start` runs that build on port 3000. No API keys, database or environment variables are required.

## Deploy on Vercel

1. Push this Next.js project to a GitHub repository.
2. Import the repository in Vercel and choose the **Next.js** framework preset.
3. Set **Root Directory** to `raghunath-mandir` if your repository contains that folder. If `package.json` is at the repository root, use the root instead.
4. Keep the default build settings (`npm run build`) and deploy.

Production website: **https://shri-raghunath-mandir-mundghasoi.vercel.app**.

The project is deployed in the `govind-sharmas-projects-4d83388c` Vercel workspace and linked locally through `.vercel/project.json`. Future deployments from this checkout can use:

```bash
npx vercel deploy --prod --scope govind-sharmas-projects-4d83388c
```

The custom domain can be configured in the Vercel project's Domains settings. `.vercelignore` excludes local backups, build output, development credentials and unrelated hosting metadata from upload.

## Deploy on a Node.js host

Install dependencies, build, then start:

```bash
npm ci
npm run build
npm start -- --hostname 0.0.0.0 --port 3000
```

Use your host's process manager and HTTPS/domain configuration. This is a normal Next.js application, not a static `dist/` upload. See the [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying).

## Project structure

```text
app/
  layout.tsx       Hindi metadata and self-hosted fonts
  page.tsx         Server-rendered homepage and static sections
  globals.css      Responsive styles and theme
  icon.svg         Temple favicon
components/
  site-header.tsx       React mobile navigation
  site-footer.tsx       Server-rendered footer
  darshan-status.tsx    IST-based darshan status
  festival-section.tsx Festival cards and accessible dialogs
  ritual-section.tsx   Morning hawan and Tuesday Sundarkand cards
  temple-gallery.tsx   Seven owner-supplied temple photographs
  copy-address.tsx     Clipboard interaction and feedback
lib/
  temple.ts        Contact, location and opening-hour data
  darshan.ts       Timezone-aware status calculation
  festivals.ts    Festival descriptions
  gallery.ts      Shared photograph paths, captions and alt text
public/assets/
  temple/         Optimized photographs from the owner's WhatsApp archive
  ram-darbar.webp  Retained original devotional artwork; unused by the page
```

Edit `lib/temple.ts` for shared contact and location details. Visible morning/evening labels and explanatory text live in `app/page.tsx`; update these too when opening hours change. Edit `components/ritual-section.tsx` for worship cards, `lib/festivals.ts` for festival dialog descriptions and `lib/gallery.ts` for photo paths, captions and alt text. The hero photograph uses `heroPhoto` from the same gallery data. Edit `app/globals.css` for the design. Keep `package-lock.json` committed so deployment installs the tested versions.

Google Fonts are downloaded at build time by `next/font` and served locally to visitors. The build environment needs outbound access to Google Fonts and the npm registry during setup.

## Confirmed content

- Temple name and village: supplied by owner. Google Search currently indexes the place as `Radha Krishna Mandir, Mundghasoi`; this is shown as an alternate online name while the site title remains Shri Raghunath Mandir.
- Darshan hours: 05:00–11:00 and 17:00–21:00 IST, supplied by owner.
- Primary public contact: Ajay Sharma, +91 96363 47023, supplied by owner.
- Secondary public contact: Dinesh Sharma, +91 95304 00229, supplied by owner.
- Morning hawan: confirmed by owner; no exact start time or daily frequency supplied.
- Sundarkand: every Tuesday, confirmed by owner; no exact start time supplied.
- Janmashtami: celebrated at this temple, confirmed by owner; no dated programme or detailed schedule supplied.
- Temple photographs: all seven images supplied by owner in `WhatsApp Unknown 2026-10-09 at 18.09.17.zip`.
- Mundghasoi postal code 341509: India Post record, https://indiapostgdsonline.gov.in/MasterPDF/Post_Details.pdf.
- Nawa locality reference: Rajasthan government record, https://ric.rajasthan.gov.in/includes/C2%2C%2025.1.16%20to%2029.1.16.pdf.

Temple-specific history, establishment year, exact aarti/hawan/Sundarkand times, dated festival programmes and exact temple coordinates have not been confirmed and are not asserted. Maps searches the exact public listing name `Radha Krishna Mandir, Mundghasoi`; visitors can call for the nearest landmark. Darshan status follows the owner-provided schedule, not a live temple feed. Ram Navami, Vijayadashami and Diwali cards provide general religious context; they do not announce events at this temple. The Janmashtami card reflects the owner's confirmation that the festival is celebrated here. Phone links let visitors confirm programme details. No payment, donation collection or booking backend is implied.

## Owner-supplied location reference

https://indiamapia.com/Nagaur/Mundghasoi.html was supplied by the owner. The page identifies Mundghasoi, Nawa City, Rajasthan and PIN 341509. These details are used in the address and named village directions, with a source link in the location panel. Its latitude/longitude and nearest-station assertions have not been adopted: its coordinates (27.52733, 74.6833) conflict with an indexed BBNL government entry for Moondgasoi (27.064000, 75.215806), and neither identifies the temple entrance. The page uses the older Nagaur district label; the visitor address avoids an unverified current district claim.

## Interactions

Mobile navigation, temple photo gallery, morning hawan and Tuesday Sundarkand information, expandable stuti and FAQs, accessible festival dialogs, telephone links, Google Maps directions and clipboard address copying. Darshan status uses Asia/Kolkata regardless of the visitor's timezone. No visitor information is stored.

## Temple photography and retained artwork

The hero and gallery use the owner's actual temple photographs from `WhatsApp Unknown 2026-10-09 at 18.09.17.zip`. The archive filename identifies the supplied bundle; its timestamp is not treated as the photographs' capture date. The seven optimized 960 × 1280 WebP assets are:

- `public/assets/temple/temple-exterior.webp`: illuminated temple exterior; also used as the hero photograph.
- `public/assets/temple/shri-raghunath-darshan-yellow.webp`: sanctum and yellow devotional attire.
- `public/assets/temple/hanuman.webp`: Shri Hanuman Ji.
- `public/assets/temple/radha-krishna.webp`: Shri Radha Krishna.
- `public/assets/temple/maa-durga.webp`: Maa Durga.
- `public/assets/temple/shri-raghunath-darshan-pink.webp`: sanctum and pink/red devotional attire.
- `public/assets/temple/prayer-hall.webp`: interior prayer area.

Paths, Hindi titles, alt text and captions are centralized in `lib/gallery.ts`. The intake originals are preserved locally in `.sites-runtime/photo-intake/` and excluded from deployment and the distributable source ZIP. No unverified photograph of another temple is presented as this temple.

`public/assets/ram-darbar.webp` derives from one original AI-generated devotional artwork, 1536 × 1024. It is retained as an unused asset; the current homepage uses the owner's actual photographs. Fonts: Hind and Noto Serif Devanagari, self-hosted through `next/font`, with system fallbacks.
