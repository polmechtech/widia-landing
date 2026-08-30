"use client";

import { useEffect, useState } from "react";
import type { AllegroProduct } from "@/lib/allegro";
import { texts, type SiteLocale } from "@/lib/locales";
import ProductCatalog from "@/components/ProductCatalog";
import LocalizedProductCatalog from "@/components/LocalizedProductCatalog";

const allegroLanguages: Partial<Record<SiteLocale, string>> = {
  cs: "cs-CZ",
  sk: "sk-SK",
  hu: "hu-HU",
};

export default function CatalogLoader({ locale }: { locale?: SiteLocale }) {
  const [products, setProducts] = useState<AllegroProduct[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const language = locale ? allegroLanguages[locale] : undefined;
    const query = language ? `?language=${encodeURIComponent(language)}` : "";

    fetch(`/api/allegro/offers${query}`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid catalog response");
        if (!cancelled) setProducts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (error) {
    const message = locale ? texts[locale].noProducts : "Nie udało się obecnie pobrać aktywnych ofert Allegro.";
    return <section className="bg-white px-4 py-16 text-center text-zinc-600 sm:px-6 sm:py-20">{message}</section>;
  }

  if (products === null) {
    return <section className="bg-white px-4 py-16 text-center text-zinc-500 sm:px-6 sm:py-20">Ładowanie aktualnych ofert Allegro…</section>;
  }

  if (locale) {
    return <LocalizedProductCatalog products={products} locale={locale} />;
  }

  return <ProductCatalog products={products} erliPrices={{}} />;
}
