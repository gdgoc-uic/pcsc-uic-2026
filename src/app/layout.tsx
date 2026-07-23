import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "./components/layouts/SiteHeader";
import SiteFooter from "./components/layouts/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PCSC 2026 — Philippine Computing Science Congress",
  description:
    "Official site for the Philippine Computing Science Congress. Program, workshops, accepted papers, registration, and venue details.",
  metadataBase: new URL("https://pcsc2026.uic.edu.ph"),
  openGraph: {
    title: "PCSC 2026 — Philippine Computing Science Congress",
    description:
      "Join researchers, educators, and students for talks, workshops, and papers in computing and ICT.",
    type: "website",
    images: [
      {
        url: "/meta-img.jpg",
        alt: "26th Philippine Computing Science Congress",
      },
    ],
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <SiteHeader />
        <div className="overflow-x-hidden">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
