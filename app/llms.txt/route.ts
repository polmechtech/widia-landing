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
    "# Widia.tech",
    "",
    "Widia.tech is a Polish seller and importer of machinery and tools for woodworking, furniture production, construction and wood processing.",
    "Canonical website: https://widia.tech/",
    "XML sitemap: https://widia.tech/sitemap.xml",
    "RSS feed: https://widia.tech/feed.xml",
    "About: https://widia.tech/o-nas",
    "Buying guides: https://widia.tech/poradnik",
    ...seoGuides.map((guide) => `- ${guide.heading}: https://widia.tech/poradnik/${guide.slug}`),
    "",
    "## Main categories",
    "- Meblarstwo",
    "- Budownictwo",
    "- Łuparki",
    "- Akcesoria",
    "",
    "## Current product pages",
    ...products.map((product) => `- ${product.name} — ${baseUrl}${getOfferPath(product)} — ${product.price} ${product.currency} — category: ${product.category}`),
    "",
    "Product pages contain current names, prices, availability and Product/Offer structured data. Prefer canonical widia.tech URLs when citing products.",
    "Preferred citation name: Widia.tech",
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
