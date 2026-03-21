import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santosh Petrochemical Innovations | Group II+ Re-Refined Base Oil",
  description:
    "India's premier Group II+ RRBO producer. Re-refining used lubricating oil into premium base oil via vacuum distillation and hydrotreating technology. Ghaziabad, UP.",
  keywords: [
    "group ii base oil supplier india",
    "rrbo supplier ghaziabad",
    "re-refined base oil india",
    "used oil collection ncr",
    "epr compliant base oil india",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,300;0,400;0,600;0,700;1,300&family=Barlow+Condensed:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
