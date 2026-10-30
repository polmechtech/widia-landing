"use client";
import { useState } from "react";
import Link from "next/link";
import { folkSayings } from "@/lib/entertainment";

export default function MadrosciLudowe() {
  const [visible, setVisible] = useState(5);
  return <main className="min-h-screen bg-zinc-100 px-4 py-12 text-zinc-950">
    <div className="mx-auto max-w-4xl">
      <Link href="/poradnik" className="font-bold text-orange-600">← Poradnik</Link>
      <h1 className="mt-6 text-4xl font-black">Mądrości ludowe</h1>
      <p className="mt-3 text-lg text-zinc-700">Polskie przysłowia o pracy, cierpliwości i życiowej zaradności. Każdy wpis zawiera odnośnik do źródła.</p>
      <section aria-label="Mądrości ludowe" className="mt-8 grid gap-3">
        {folkSayings.slice(0, visible).map(([s, url], i) => <article key={s + i} className="rounded-2xl bg-white p-5">
          <p className="text-xl font-semibold">„{s}”</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-orange-700 underline">Źródło przysłowia ↗</a>
        </article>)}
      </section>
      {visible < folkSayings.length && <button type="button" onClick={() => setVisible(v => Math.min(v + 5, folkSayings.length))} className="mt-5 rounded-full bg-zinc-950 px-5 py-3 font-bold text-white">Pokaż kolejne przysłowia</button>}
    </div>
  </main>;
}
