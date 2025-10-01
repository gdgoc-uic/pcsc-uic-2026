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
  metadataBase: new URL("https://pcsc-uic-2026.local"),
  openGraph: {
    title: "PCSC 2026 — Philippine Computing Science Congress",
    description:
      "Join researchers, educators, and students for talks, workshops, and papers in computing and ICT.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
