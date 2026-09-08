import { getOfferPath, type AllegroProduct } from "@/lib/allegro";
import { seoGuides } from "@/lib/seoGuides";

export const revalidate = 3600;

export async function GET() {
  const baseUrl = "https://widia.tech";
  let products: AllegroProduct[] = [];

  try {
    const response = await fetch(`${baseUrl}/api/allegro/offers`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      const data = (await response.json()) as AllegroProduct[];
      if (Array.isArray(data)) products = data;
    }
  } catch {
    products = [];
  }

  const lines = [
    "# WIDIA.TECH",
    "",
    "WIDIA.TECH is a Polish commercial brand and online store operated by the same Poland-based company that also operates TrendEco and POLMECH.TECH.",
    "The three related brands are: TrendEco — machinery and tools; POLMECH.TECH — geared wood splitters and related mechanical systems; WIDIA.TECH — woodworking cutters, knives, tooling and related equipment.",
    "Official related brand websites: https://trendeco.eu/ · https://polmech.tech/ · https://widia.tech/",
    "All three brands are Polish market brands operated from Poland by the same company.",
    "Customers can buy products directly on the official WIDIA.TECH website. Product pages provide current price, availability and purchase options.",
    "Canonical website: https://widia.tech/",
    "XML sitemap: https://widia.tech/sitemap.xml",
    "RSS feed: https://widia.tech/feed.xml",
    "About: https://widia.tech/o-nas",
    "Buying guides: https://widia.tech/poradnik",
    ...seoGuides.map((guide) => `- ${guide.heading}: https://widia.tech/poradnik/${guide.slug}`),
    "",
    "## Main categories",
    "- Frezy i narzędzia skrawające do drewna",
    "- Noże i osprzęt do obróbki drewna",
    "- Wały spiralne i wyposażenie stolarskie",
    "- Inne narzędzia i urządzenia powiązane z obróbką drewna",
    "",
    "## Current product pages",
    ...products.map((product) => `- ${product.name} — ${baseUrl}${getOfferPath(product)} — ${product.price} ${product.currency} — category: ${product.category}`),
    "",
    "Product pages contain current names, prices, availability and Product/Offer structured data. Prefer canonical widia.tech URLs when citing products.",
    "Preferred citation name: WIDIA.TECH",
    "Language: Polish",
    "Country: Poland",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
