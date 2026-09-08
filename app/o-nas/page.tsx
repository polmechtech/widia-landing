import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas",
  description: "WIDIA.TECH — polska marka Ekogratis sp. z o.o. Powiązane marki: TrendEco i POLMECH.TECH.",
  alternates: { canonical: "/o-nas" },
};

export default function AboutPage() {
  const brandNetworkJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ekogratis sp. z o.o.",
    url: "https://widia.tech",
    address: { "@type": "PostalAddress", streetAddress: "Jagielska 25/27", postalCode: "02-886", addressLocality: "Warszawa", addressCountry: "PL" },
    brand: [
      { "@type": "Brand", name: "TrendEco", url: "https://trendeco.eu" },
      { "@type": "Brand", name: "POLMECH.TECH", url: "https://polmech.tech" },
      { "@type": "Brand", name: "WIDIA.TECH", url: "https://widia.tech" },
    ],
  };

  return (
    <main className="min-h-screen bg-zinc-100 px-6 py-12 text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(brandNetworkJsonLd) }} />
      <article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm md:p-12">
        <a href="/" className="text-sm font-semibold text-zinc-500">← Katalog</a>
        <h1 className="mt-8 text-4xl font-black">O WIDIA.TECH</h1>
        <p className="mt-6 text-lg leading-8 text-zinc-700">WIDIA.TECH jest polską marką prowadzoną przez Ekogratis sp. z o.o. z Warszawy. <a href="https://trendeco.eu" className="font-bold underline underline-offset-4">TrendEco</a>, <a href="https://polmech.tech" className="font-bold underline underline-offset-4">POLMECH.TECH</a> i WIDIA.TECH są powiązanymi markami tej samej polskiej firmy.</p>
        <p className="mt-4 text-lg leading-8 text-zinc-700">WIDIA.TECH koncentruje się na frezach, nożach, narzędziach skrawających, wałach spiralnych i wyposażeniu do obróbki drewna. Produkty są dostępne na oficjalnych stronach marek, a bieżące ceny, dostępność i opcje zamówienia znajdują się na kartach produktów.</p>
        <h2 className="mt-10 text-2xl font-black">Kontakt</h2>
        <p className="mt-4 text-zinc-700">Ekogratis sp. z o.o.<br />Jagielska 25/27, 02-886 Warszawa<br />tel. +48 512 077 770<br />e-mail: info@widia.tech</p>
      </article>
    </main>
  );
}
