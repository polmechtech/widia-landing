import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { countryToLocale } from "@/lib/locales";
import CatalogLoader from "@/components/CatalogLoader";
import { seoCategories } from "@/lib/seoCategories";
const langs=[["/","🇵🇱","PL"],["/en","🇬🇧","EN"],["/cs","🇨🇿","CZ"],["/sk","🇸🇰","SK"],["/hu","🇭🇺","HU"],["/ro","🇷🇴","RO"]];
export default async function Home(){
 const h=await headers(); const country=(h.get("x-vercel-ip-country")??"PL").toUpperCase(); if(country!=="PL") redirect("/"+(countryToLocale[country]??"en"));
 const jsonLd={"@context":"https://schema.org","@type":"WebSite",name:"Widia.tech",url:"https://widia.tech",inLanguage:"pl-PL"};
 return <main className="min-h-screen bg-white text-zinc-950"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
  <header className="bg-zinc-950 px-4 py-6 text-white sm:px-6 sm:py-10"><div className="mx-auto max-w-7xl">
   <div className="flex flex-wrap items-center justify-between gap-4"><a href="/" className="text-3xl font-black tracking-tight sm:text-5xl">WIDIA.TECH</a><div className="flex flex-wrap gap-2">{langs.map(([href,flag,label])=><a key={label} href={href} className="rounded-full border border-zinc-700 px-3 py-2 text-sm font-black hover:border-orange-400"><span className="mr-1">{flag}</span>{label}</a>)}<a href="https://wa.me/48512077770" className="rounded-full bg-green-600 px-4 py-2 text-sm font-black">WhatsApp</a></div></div>
   <h1 className="mt-8 max-w-4xl text-3xl font-black leading-tight text-orange-400 sm:text-6xl">Narzędzia do obróbki drewna i płyt meblowych</h1><p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-xl">Frezy, wały spiralne, strugi Rebir i noże do grubościówek dla warsztatów i profesjonalnej produkcji.</p>
   <div className="mt-6 inline-flex rounded-2xl border border-green-500/60 bg-green-950/60 px-4 py-3 text-lg font-black text-green-300">DARMOWA DOSTAWA W POLSCE</div>
   
  </div></header><CatalogLoader/><footer className="border-t border-zinc-200 px-4 py-8 text-sm text-zinc-600"><div className="mx-auto flex max-w-7xl flex-wrap gap-5"><a href="/o-nas">O firmie i kontakt</a><a href="/poradnik">Poradnik obróbki drewna</a><a href="/dostawa">Dostawa DPD</a><a href="/regulamin">Regulamin</a><a href="/polityka-prywatnosci">Polityka prywatności</a></div></footer></main>;
}
