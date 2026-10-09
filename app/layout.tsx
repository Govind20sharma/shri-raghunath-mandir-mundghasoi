import type { Metadata, Viewport } from "next";
import { Hind, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const bodyFont = Hind({
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-body",
});

const headingFont = Noto_Serif_Devanagari({
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "श्री रघुनाथ मंदिर | मूंडघसोई, राजस्थान",
  description:
    "श्री रघुनाथ मंदिर, मूंडघसोई, राजस्थान। दर्शन सुबह 5–11 और शाम 5–9 बजे। प्रातः हवन, हर मंगलवार सुंदरकांड और जन्माष्टमी। संपर्क: 9636347023।",
  metadataBase: new URL("https://shri-raghunath-mandir-mundghasoi.vercel.app"),
  applicationName: "श्री रघुनाथ मंदिर",
  keywords: [
    "श्री रघुनाथ मंदिर मूंडघसोई",
    "Radha Krishna Mandir Mundghasoi",
    "मूंडघसोई मंदिर",
    "Mundghasoi temple",
  ],
  openGraph: {
    title: "श्री रघुनाथ मंदिर | मूंडघसोई, राजस्थान",
    description:
      "श्री रघुनाथ मंदिर में आपका सपरिवार स्वागत है। दर्शन समय, भक्ति, पर्व और संपर्क की जानकारी।",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "/assets/temple/temple-exterior.webp",
        width: 960,
        height: 1280,
        alt: "श्री रघुनाथ मंदिर, मूंडघसोई",
      },
    ],
  },
};

export const viewport: Viewport = { themeColor: "#681f24" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hi" className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
