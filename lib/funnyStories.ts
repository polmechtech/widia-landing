export type FunnyStory={slug:string;hero:string;character:string;product:string;href:string;story:string};
export const funnyStories:FunnyStory[]=[
  {
    "slug": "lukasz-i-tabliczka-prosze-pukac-2026-11-09",
    "hero": "Łukasz i tabliczka „Proszę pukać”",
    "character": "Łukasz z Poznania",
    "product": "Frezy do drewna",
    "href": "/kategoria/frez-na-plytki-wymienne",
    "story": "Łukasz z Poznania dostał zamówienie na drewnianą tabliczkę do drzwi pracowni: „Proszę pukać”. Starannie dobrał frez do drewna, wykonał próbne frezowanie liter i wygładził krawędzie. Klient odebrał tabliczkę, lecz po godzinie wrócił. „Napis jest piękny, tylko nikt nie puka!”. Łukasz obejrzał drzwi i zauważył, że tabliczka wisi od wewnątrz. Przewiesił ją na drugą stronę. Nazajutrz klient zadzwonił zadowolony: „Teraz pukają wszyscy, nawet żona!”. „To dobrze” — odparł Łukasz. „W Poznaniu za skuteczność nie doliczamy, ale za drugą tabliczkę już tak”. Klient zamówił drugą: „Proszę wejść”. Tym razem od razu ustalili, po której stronie ma wisieć."
  },

  {
    "slug": "lukasz-i-taca-na-okruszki-2026-11-02",
    "hero": "Łukasz i taca na okruszki",
    "character": "Łukasz z Poznania",
    "product": "Frezy do drewna",
    "href": "/kategoria/frez-na-plytki-wymienne",
    "story": "Łukasz z Poznania robił drewnianą tacę na niedzielne ciasto dla babci. Wyfrezował delikatny rowek przy krawędzi, żeby okruszki nie spadały na obrus. Babcia obejrzała tacę i spytała: „Tyle frezowania drewna, żeby nie zamiatać?”. Łukasz uśmiechnął się i podał makowiec. Po pierwszym kawałku rowek zapełnił się okruszkami, a obrus pozostał czysty. Dziadek obejrzał dzieło i stwierdził: „W Poznaniu nawet okruszek ma swoje miejsce”. Babcia przyznała mu rację, po czym poprosiła o drugą tacę. „Po co?” — zdziwił się Łukasz. „Na sernik. Nie będziemy przecież mieszać okruszków”. I tak z jednego rowka zrobiły się dwie rodzinne tradycje."
  },

  {
    "slug": "lukasz-i-szczesliwa-trzynastka-2026-10-26",
    "hero": "Łukasz i szczęśliwa trzynastka",
    "character": "Łukasz z Poznania",
    "product": "Frezy do drewna",
    "href": "/kategoria/frez-na-plytki-wymienne",
    "story": "Łukasz z Poznania frezował drewniane numerki do szatni na osiedlowy bal. Organizatorka zamówiła czterdzieści sztuk, ale numer trzynaście kazała pominąć: „Na wszelki wypadek”. Łukasz dobrał frez do drewna, przygotował szablon i wykonał równe rowki w każdym numerku. W dniu balu zjawił się dodatkowy gość. „Brakuje numerka!” — zawołała organizatorka. Łukasz wyjął z kieszeni trzynastkę, którą zrobił po godzinach. „W Poznaniu nic się nie marnuje, nawet przesądy”. Gość oddał płaszcz do szatni, a Łukasz dostał w podziękowaniu kawałek sernika. Powiedział, że trzynastka jednak przynosi szczęście — szczególnie gdy ciasto jest na koszt organizatora."
  },
  {
    "slug": "lukasz-i-frez-od-spraw-niemozliwych",
    "hero": "Łukasz i frez od spraw niemożliwych",
    "character": "Łukasz z Poznania",
    "product": "Frezy do drewna",
    "href": "/kategoria/frez-na-plytki-wymienne",
    "story": "Łukasz z Poznania frezował właśnie elementy dębowego stołu, kiedy wpadł kolega Mirek. „Zrobisz mi taki sam, tylko taniej, szybciej i najlepiej wczoraj?”. Łukasz spojrzał na rysunek. Kształt był tak wymyślny, że nawet ołówek chciał przejść na urlop. Dobrał odpowiedni frez z płytkami wymiennymi, sprawdził mocowanie i obroty, założył osłony i wykonał próbę. Potem spokojnie wyfrezował elementy. Mirek aż zamilkł — co w Poznaniu uznano za dodatkową oszczędność energii. „Ile jestem winien?” — zapytał. „Za stół według cennika. Za ciszę gratis”. Stół wyszedł świetnie, a Mirek obiecał następny projekt narysować przed terminem."
  }
];
export const getFunnyStory=(slug:string)=>funnyStories.find(x=>x.slug===slug);
