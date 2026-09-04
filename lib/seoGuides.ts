export type SeoGuide = { slug: string; title: string; description: string; heading: string; sections: { heading: string; text: string }[]; links: { label: string; href: string }[] };

export const seoGuides: SeoGuide[] = [
  { slug: "frez-na-plytki-wymienne-do-drewna", title: "Frez na płytki wymienne do drewna", description: "Jak dobrać frez na płytki wymienne do materiału, wrzeciona i operacji.", heading: "Frez na płytki wymienne do drewna — kryteria wyboru", sections: [
    { heading: "Wymiary i mocowanie", text: "Sprawdź średnicę korpusu, długość roboczą, średnicę trzpienia lub otworu oraz kierunek obrotów. Narzędzie musi być zgodne z wrzecionem i zakresem obrotów maszyny; przypadkowe tuleje i redukcje pogarszają bezpieczeństwo oraz bicie." },
    { heading: "Płytka do materiału", text: "Geometrię i gatunek węglika dobiera się do drewna litego, sklejki, MDF albo płyty laminowanej. Płytki powinny pochodzić z jednego kompletu i równo przylegać do oczyszczonych gniazd." },
    { heading: "Montaż i próba", text: "Przed montażem odłącz maszynę, obejrzyj korpus i śruby, a płytki dokręć zalecanym momentem. Po złożeniu wykonaj próbę bez materiału i przerwij pracę przy nietypowych drganiach lub hałasie." }
  ], links: [{ label: "Frezy na płytki", href: "/kategoria/frez-na-plytki-wymienne" }, { label: "Katalog WIDIA.TECH", href: "/" }] },
  { slug: "wal-spiralny-do-strugarki", title: "Wał spiralny do strugarki — jak wybrać?", description: "Dobór wału spiralnego do strugarki i grubościówki.", heading: "Wał spiralny do strugarki i grubościówki — dobór", sections: [
    { heading: "Zgodność z maszyną", text: "Najważniejsze są całkowita długość wału, średnica, długość robocza, czopy pod łożyska, koło napędowe i kierunek obrotów. Model maszyny pomaga w identyfikacji, ale przed zamówieniem warto potwierdzić wymiary rzeczywistego wału." },
    { heading: "Układ płytek", text: "Spiralne rozmieszczenie płytek rozkłada kontakt ostrza z materiałem. Liczba płytek wpływa na koszt obsługi i jakość powierzchni, ale efekt zależy także od posuwu, prędkości obrotowej i prawidłowego ustawienia stołów." },
    { heading: "Po montażu", text: "Sprawdź bicie, łożyska, napięcie pasa, osłony i swobodny obrót. Gniazda czyść z żywicy i wiórów; nierówne dokręcenie nawet jednej płytki może pogorszyć powierzchnię obrabianego drewna." }
  ], links: [{ label: "Wały spiralne", href: "/kategoria/waly-spiralne" }, { label: "Kontakt", href: "/o-nas" }] },
  { slug: "noze-do-grubosciowki-jak-dobrac", title: "Noże do grubościówki — jak dobrać?", description: "Wymiary, materiał i ustawienie noży do grubościówki.", heading: "Noże do grubościówki i strugarki — jak dobrać komplet", sections: [
    { heading: "Zmierz stary nóż", text: "Potrzebne są długość, szerokość, grubość, kształt krawędzi i rozmieszczenie otworów lub rowków. Nazwa maszyny nie zawsze wystarcza, ponieważ producent mógł stosować różne wały w kolejnych seriach." },
    { heading: "Materiał ostrza", text: "Stal szybkotnąca dobrze sprawdza się w drewnie litym, a węglik jest odporniejszy przy materiałach abrazyjnych i płytach. Najlepszy wybór zależy od materiału, ilości pracy i możliwości prawidłowego ostrzenia." },
    { heading: "Równe ustawienie", text: "Wszystkie noże muszą znajdować się na tej samej wysokości i być równomiernie dokręcone. Po wymianie obróć wał ręcznie, zamknij osłony i wykonaj próbę bez materiału." }
  ], links: [{ label: "Noże do grubościówek", href: "/kategoria/noze-do-grubosiowek" }, { label: "Dostawa", href: "/dostawa" }] },
  { slug: "frez-nasadzany-czy-trzpieniowy", title: "Frez nasadzany czy trzpieniowy?", description: "Porównanie frezów nasadzanych i trzpieniowych do drewna.", heading: "Frez nasadzany czy trzpieniowy — który wybrać", sections: [
    { heading: "Frez trzpieniowy", text: "Frez trzpieniowy mocuje się w tulei lub uchwycie i stosuje do rowków, kopiowania, krawędzi oraz pracy na CNC lub frezarce ręcznej. Średnica trzpienia i minimalna głębokość mocowania muszą odpowiadać oprawce." },
    { heading: "Frez nasadzany", text: "Frez nasadzany pracuje na wrzecionie frezarki dolnowrzecionowej. Umożliwia zastosowanie sztywnego korpusu i większej szerokości roboczej, ale wymaga zgodnej średnicy otworu, pierścieni dystansowych i osłony." },
    { heading: "Decyzja", text: "Wybór wynika z operacji, maszyny, materiału i wymaganej wydajności. Nie przekraczaj maksymalnych obrotów podanych na narzędziu i nie pracuj korpusem z pęknięciem lub wyczuwalnym biciem." }
  ], links: [{ label: "Frezy nasadzane", href: "/kategoria/frez-nasadzany-prosty" }, { label: "Frezy kopiące", href: "/kategoria/frezy-kopiace" }] },
  { slug: "wymiana-nozy-w-grubosciowce", title: "Wymiana noży w grubościówce", description: "Bezpieczna procedura wymiany i ustawienia noży w grubościówce.", heading: "Wymiana noży w grubościówce — bezpieczna procedura", sections: [
    { heading: "Przygotowanie", text: "Odłącz maszynę od zasilania i zabezpiecz ją przed uruchomieniem. Oczyść wał, kliny i śruby, zachowaj kolejność elementów oraz porównaj nowy nóż ze starym przed montażem." },
    { heading: "Ustawienie", text: "Noże ustawiaj przyrządem zalecanym dla danego wału. Różnica wysokości powoduje pasy, wyrwania i drgania. Śruby dokręcaj stopniowo, od środka ku krawędzi, kontrolując położenie ostrza." },
    { heading: "Kontrola", text: "Po montażu obróć wał ręcznie i upewnij się, że nic nie koliduje. Załóż osłony, uruchom maszynę bez materiału i zatrzymaj ją natychmiast przy nietypowym dźwięku, drganiu lub zapachu przegrzania." }
  ], links: [{ label: "Noże do grubościówek", href: "/kategoria/noze-do-grubosiowek" }, { label: "Zwroty i gwarancja", href: "/zwroty-i-reklamacje" }] }
];
export const getSeoGuide = (slug: string) => seoGuides.find((guide) => guide.slug === slug);
