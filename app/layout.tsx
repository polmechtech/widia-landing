import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CartButton from "@/components/CartButton";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const siteUrl = "https://widia.tech";
const whatsappLink = "https://wa.me/48512077770?text=Dzień%20dobry%2C%20mam%20pytanie%20o%20ofertę%20Widia.tech.";
const originalFavicon = "data:image/x-icon;base64,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";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Widia.tech — maszyny i narzędzia", template: "%s | Widia.tech" },
  description: "Maszyny i narzędzia dla meblarstwa, budownictwa i obróbki drewna. Aktualne ceny i dostępność z ofert Widia.tech na Allegro.",
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  icons: { icon: [{ url: originalFavicon, type: "image/x-icon" }], shortcut: originalFavicon },
  openGraph: { type: "website", locale: "pl_PL", url: siteUrl, siteName: "Widia.tech", title: "Widia.tech — maszyny i narzędzia", description: "Aktualny katalog maszyn i narzędzi Widia.tech. Zakup, płatność i dostawa realizowane przez Allegro." },
  twitter: { card: "summary_large_image", title: "Widia.tech — maszyny i narzędzia", description: "Aktualny katalog ofert Widia.tech dostępnych na Allegro." },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "commerce",
};

const organizationJsonLd = {
  "@context": "https://schema.org", "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "WIDIA.TECH", url: siteUrl,
  email: "info@widia.tech", telephone: "+48512077770",
  address: { "@type": "PostalAddress", streetAddress: "Jagielska 25/27", postalCode: "02-886", addressLocality: "Warszawa", addressCountry: "PL" },
  areaServed: { "@type": "Country", name: "Poland" },
  knowsAbout: ["frezy do drewna", "frezy na płytki wymienne", "wały spiralne", "noże do grubościówek", "strugi Rebir", "obróbka drewna"],
  contactPoint: { "@type": "ContactPoint", telephone: "+48512077770", email: "info@widia.tech", contactType: "customer service", areaServed: "PL", availableLanguage: ["pl"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
        <CartButton />
        <CookieConsent />
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="Skontaktuj się przez WhatsApp" title="WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl ring-4 ring-white/80 transition hover:scale-105 hover:bg-green-500 active:scale-95 sm:bottom-7 sm:right-7">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 fill-current"><path d="M6.62 10.79a15.5 15.5 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" /></svg>
        </a>
      </body>
    </html>
  );
}
