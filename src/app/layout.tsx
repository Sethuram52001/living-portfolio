import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { siteUrl } from "@/config/site";
import { loadSiteContent } from "@/lib/content/loaders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-app",
});

const site = loadSiteContent();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.metadata.title,
    template: `%s | ${site.metadata.name}`,
  },
  description: site.metadata.description,
  icons: {
    icon: [
      {
        url: site.person.profileImage,
        type: "image/webp",
      },
    ],
    shortcut: site.person.profileImage,
  },
  openGraph: {
    title: site.metadata.title,
    description: site.metadata.description,
    url: siteUrl,
    siteName: site.metadata.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: site.metadata.title,
    description: site.metadata.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AppShell site={site}>{children}</AppShell>
      </body>
    </html>
  );
}
