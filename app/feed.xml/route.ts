import type { AllegroProduct } from "@/lib/allegro";

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (char) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  }[char] ?? char));
}

export async function GET() {
  let products: AllegroProduct[] = [];
  try {
    const response = await fetch("https://widia.tech/api/allegro/offers", { next: { revalidate: 3600 } });
    if (response.ok) products = await response.json();
  } catch {}

  const items = products.map((product) => `
    <item>
      <title>${escapeXml(product.name)}</title>
      <link>${escapeXml(product.url)}</link>
      <guid isPermaLink="true">${escapeXml(product.url)}</guid>
      <description>${escapeXml(`${product.price} ${product.currency}; dostępność: ${product.stock} szt.`)}</description>
      <category>${escapeXml(product.category)}</category>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0"><channel>
    <title>Widia.tech — aktualne oferty</title>
    <link>https://widia.tech</link>
    <description>Aktualne produkty Widia.tech dostępne na Allegro.</description>
    <language>pl-PL</language>${items}
  </channel></rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600" } });
}
