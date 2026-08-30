import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { seoCategories } from "@/lib/seoCategories";
import { countryToLocale } from "@/lib/locales";
import CatalogLoader from "@/components/CatalogLoader";

const whatsappLink = "https://wa.me/48512077770?text=Dzień%20dobry%2C%20mam%20pytanie%20o%20ofertę%20Widia.tech.";
const languageLinks = [
  { href: "/", flag: "🇵🇱", label: "PL", title: "Polski" },
  { href: "/en", flag: "🇬🇧", label: "EN", title: "English" },
  { href: "/cs", flag: "🇨🇿", label: "CZ", title: "Čeština" },
  { href: "/sk", flag: "🇸🇰", label: "SK", title: "Slovenčina" },
  { href: "/hu", flag: "🇭🇺", label: "HU", title: "Magyar" },
  { href: "/ro", flag: "🇷🇴", label: "RO", title: "Română" },
];

export default async function Home() {
  const requestHeaders = await headers();
  const country = (requestHeaders.get("x-vercel-ip-country") ?? "PL").toUpperCase();
  if (country !== "PL") redirect(`/${countryToLocale[country] ?? "en"}`);

  const websiteJsonLd = { "@context": "https://schema.org", "@type": "WebSite", name: "Widia.tech", url: "https://widia.tech", inLanguage: "pl-PL" };
  return <main className="min-h-screen bg-white text-zinc-950"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
    <section className="mx-auto max-w-7xl px-4 pb-7 pt-6 sm:px-6 sm:py-10"><div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between"><div><img src="/widia-logo.svg" alt="WIDIA.TECH German Technology" className="h-auto w-[300px] max-w-full sm:w-[430px]" /><p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-zinc-900 sm:mt-6 sm:text-xl">Maszyny i narzędzia dostępne w sprzedaży przez Allegro oraz bezpośrednio w Widia.tech.</p><p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 sm:mt-4 sm:text-base">Piły formatowe i stołowe, piły do betonu, przecinarki, maszyny stolarskie, łuparki i akcesoria.</p></div><div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3"><nav aria-label="Wybierz język" className="flex flex-wrap items-center gap-2">{languageLinks.map((language) => <a key={language.label} href={language.href} title={language.title} aria-label={language.title} className="inline-flex min-h-12 items-center gap-1 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm font-black text-zinc-800 shadow-sm transition hover:border-orange-400 hover:bg-orange-50 sm:rounded-full"><span className="text-xl leading-none" aria-hidden="true">{language.flag}</span><span>{language.label}</span></a>)}</nav><div className="flex items-center gap-2 sm:ml-auto sm:gap-3"><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-2xl bg-green-600 px-3 py-3 text-center text-sm font-bold text-white transition hover:bg-green-500 sm:rounded-full sm:px-5">WhatsApp<span className="hidden sm:inline"> +48 512 077 770</span></a></div></div></div>
    <nav aria-label="Najczęściej szukane produkty" className="mt-5 grid grid-cols-3 gap-2 sm:mt-7">{seoCategories.map((category) => <a key={category.slug} href={`/kategoria/${category.slug}`} className="flex min-h-12 items-center justify-center rounded-2xl border border-orange-500 bg-white px-2 py-2 text-center text-xs font-black leading-tight text-orange-600 transition hover:bg-orange-500 hover:text-white sm:px-4 sm:text-sm">{category.keyword}</a>)}</nav><a href="/o-nas" className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-orange-600 sm:mt-4">O firmie i kontakt →</a></section>
    <CatalogLoader />
    <footer className="border-t border-zinc-200 bg-white px-4 py-8 text-sm text-zinc-600 sm:px-6"><div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-3"><a href="/o-nas" className="hover:text-zinc-950">O firmie i kontakt</a><a href="/dostawa" className="hover:text-zinc-950">Dostawa</a><a href="/zwroty-i-reklamacje" className="hover:text-zinc-950">Zwroty, reklamacja, gwarancja</a><a href="/regulamin" className="hover:text-zinc-950">Regulamin sklepu</a><a href="/polityka-prywatnosci" className="hover:text-zinc-950">Polityka prywatności i RODO</a></div></footer>
  </main>;
}
