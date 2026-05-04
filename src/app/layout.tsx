import type { Metadata } from "next";
import "./globals.css";
import CrisisWidget from "@/components/CrisisWidget";

export const metadata: Metadata = {
  title: "Faith Marie Foundation | Grief & Mental Health Resources",
  description: "Helping every family navigating grief and mental health find the resources and guidance they need. In memory of Faith Marie.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <CrisisWidget />
      </body>
    </html>
  );
}
