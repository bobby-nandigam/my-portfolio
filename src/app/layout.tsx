import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = "https://bobbynandigam.in";
const description =
  "Software Engineer building scalable backend APIs, ML-integrated services, and cloud-native systems where latency, reliability, and failure boundaries matter.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bobby Nandigam — Software Engineer",
    template: "%s — Bobby Nandigam",
  },
  description,
  keywords: [
    "Bobby Nandigam",
    "Software Engineer",
    "Backend Systems",
    "ML Engineering",
    "Cloud Infrastructure",
    "GraphRAG",
    "FastAPI",
    "Python",
  ],
  authors: [{ name: "Bobby Nandigam", url: siteUrl }],
  creator: "Bobby Nandigam",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Bobby Nandigam — Software Engineer",
    description,
    siteName: "Bobby Nandigam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bobby Nandigam — Software Engineer",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f3ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
