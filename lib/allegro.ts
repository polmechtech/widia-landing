export type ProductCategory =
  | "Frez nasadzany prosty"
  | "Frez na płytki wymienne"
  | "Frezy kopiące"
  | "Wały spiralne"
  | "Strugi Rebir"
  | "Noże do grubościówek"
  | "Inne";

export type AllegroProduct = {
  id: string; name: string; image: string; price: string; currency: string; stock: number; url: string; category: ProductCategory; description?: string; descriptionSections?: Array<{items?: Array<{type?: string; url?: string; content?: string}>}>; gpsr?: ProductGpsr;
};
export type GpsrAddress = { street?: string; postalCode?: string; city?: string; countryCode?: string };
export type GpsrContact = { email?: string; phoneNumber?: string; formUrl?: string };
export type GpsrParty = { name: string; address?: GpsrAddress; contact?: GpsrContact };
export type GpsrAttachment = { id: string; name?: string; url?: string };
export type ProductGpsr = { manufacturer?: GpsrParty; responsiblePerson?: GpsrParty; safetyInformation?: { type: string; description?: string; attachments?: GpsrAttachment[] } };
export const WIDIA_UI_VERSION = "dpd-free-v1";
export function classifyProduct(name: string): ProductCategory {
 const n=name.toLocaleLowerCase("pl-PL");
 if(n.includes("rebir")||n.includes("strug")) return "Strugi Rebir";
 if(n.includes("grubościów")||n.includes("grubosciow")||n.includes("noż")||n.includes("noz")) return "Noże do grubościówek";
 if(n.includes("wał spiral")||n.includes("wal spiral")||n.includes("spiral")) return "Wały spiralne";
 if(n.includes("frez")&&(n.includes("płytk")||n.includes("plytk")||n.includes("wymien"))) return "Frez na płytki wymienne";
 if(n.includes("frez")&&(n.includes("kop")||n.includes("rowkuj")||n.includes("gniazd"))) return "Frezy kopiące";
 if(n.includes("frez")||n.includes("głowic")||n.includes("glowic")) return "Frez nasadzany prosty";
 return "Inne";
}

/** Product titles are normalized only for display; original Allegro titles and URLs remain unchanged. */
export function getDisplayProductName(name: string): string {
  const normalized = name.toLocaleLowerCase("pl-PL")
    .replace(/\bwidia\.tech\b/gi, "WIDIA.TECH")
    .replace(/\bpolmech\.tech\b/gi, "POLMECH.TECH")
    .replace(/\btrendeco\b/gi, "TrendEco")
    .replace(/\brebir\b/gi, "Rebir")
    .replace(/\bcnc\b/gi, "CNC")
    .replace(/\bmdf\b/gi, "MDF")
    .replace(/\b(hm|hss|hw)\b/gi, (_, code: string) => code.toUpperCase())
    .replace(/\b(\d+(?:[,.]\d+)?)\s*kw\b/gi, "$1 kW")
    .replace(/\b(\d+(?:[,.]\d+)?)\s*v\b/gi, "$1 V")
    .replace(/\b(\d+(?:[,.]\d+)?)\s*w\b/gi, "$1 W")
    .replace(/\b(\d+(?:[,.]\d+)?)\s*mm\b/gi, "$1 mm");
  return normalized.replace(/^([^\p{L}]*)(\p{L})/u, (_, prefix: string, first: string) =>
    prefix + first.toLocaleUpperCase("pl-PL"));
}

export function getAllegroDescriptionImages(product: AllegroProduct): string[] {
  const sections = Array.isArray(product.descriptionSections) ? product.descriptionSections : [];
  const urls = sections.flatMap(section => Array.isArray(section?.items) ? section.items : [])
    .filter(item => item.type === "IMAGE" && typeof item.url === "string")
    .map(item => item.url!.trim())
    .filter(url => /^https:\/\//i.test(url) && url !== product.image);
  return [...new Set(urls)];
}

export function slugifyOfferName(name:string){return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ł/g,"l").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-+/g,"-").slice(0,140)||"oferta";}
export function getOfferPath(product:Pick<AllegroProduct,"id"|"name">){return `/oferta/${slugifyOfferName(product.name)}-${product.id}`;}
export function extractOfferId(slug:string){return slug.match(/-(\d+)$/)?.[1]??null;}
export function mapAllegroOffers(data:any):AllegroProduct[]{const offers=Array.isArray(data?.offers)?data.offers:[];return offers.map((offer:any)=>({id:String(offer.id),name:String(offer.name??""),image:offer.primaryImage?.url??"",price:offer.sellingMode?.price?.amount??"",currency:offer.sellingMode?.price?.currency??"PLN",stock:Number(offer.stock?.available??0),url:`https://allegro.pl/oferta/${offer.id}`,category:classifyProduct(String(offer.name??"")),description:Array.isArray(offer.description?.sections)?offer.description.sections.flatMap((section:any)=>Array.isArray(section?.items)?section.items.map((item:any)=>String(item?.content??"").trim()).filter(Boolean):[]).join("\n\n"):typeof offer.description==="string"?offer.description:undefined,gpsr:(offer.gpsr??offer.productSafety??undefined)})).filter((product:AllegroProduct)=>product.stock>0);}
