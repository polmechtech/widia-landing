export type FunnyStory={slug:string;hero:string;character:string;product:string;href:string;story:string};
export const funnyStories:FunnyStory[]=[
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
