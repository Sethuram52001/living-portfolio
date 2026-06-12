import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Living Portfolio",
  description: "Milestone 0 foundation for Sethuram's living portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
