import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CrisisWidget from "@/components/CrisisWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faith Marie Foundation | AI-Powered Mental Health Research",
  description: "Advancing mental health research through AI — making the latest findings on grief, trauma, PTSD, depression, and anxiety accessible to everyone. In memory of Faith Marie.",
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
        {children}
        <CrisisWidget />
      </body>
    </html>
  );
}
