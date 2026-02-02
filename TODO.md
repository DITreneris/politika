# TODO - MVP (Must)

> Data: 2026-02-02
> Tikslas: Stabilus, patikimas MVP be kritinių lūžimų

## ✅ Implementuota (2026-02-02)

- [x] **Error Boundary komponentas** - `src/components/ui/ErrorBoundary.tsx` su retry funkcija
- [x] **Fallback UI klaidoms** - Aiškus pranešimas + "Bandyti dar kartą" / "Atnaujinti puslapį"
- [x] **Loading states** - `LoadingSpinner` komponentas su 3 dydžiais
- [x] **Lazy loading** - React.lazy() + Suspense visiems dideliems komponentams
- [x] **TypeScript tipai** - Centralizuoti tipai `src/types/modules.ts` (30+ interfeisų)
- [x] **Komponentų refaktorinimas** - SlideContent.tsx išskaidytas, shared komponentai
- [x] **Copy button bug fix** - Individualus state kiekvienam mygtukui
- [x] **Tailwind safelist** - Dinaminės spalvų klasės veikia produkcijoje

## Must (privaloma MVP)

- [ ] Klaidų logavimas (bent console, vėliau Sentry)
- [ ] Progress duomenų versijavimas (schema v1/v2)
- [ ] localStorage validacija prieš naudojimą
- [ ] Automatinė migracija senų duomenų formatui
- [ ] Testų bazė (Vitest + RTL)
- [ ] 2-4 unit testai kritiniams utils (progress, auto-save)
- [ ] Vienas smoke/integration testas pagrindiniam flow
- [ ] CI testų paleidimas (GitHub Actions)

## Definition of Done

- [x] Nėra „white screen" kritinių klaidų atveju - **ErrorBoundary implementuotas**
- [ ] Sena localStorage struktūra nesugadina app'o - **Reikia validacijos**
- [ ] Bent minimalus testų paketas praeina CI - **Reikia testų bazės**

## 📊 Quick Wins Status (2026-02-02)

| # | Quick Win | Statusas | Failai |
|---|-----------|----------|--------|
| 1️⃣ | Tailwind safelist | ✅ Baigta | `tailwind.config.js` |
| 2️⃣ | Copy button fix | ✅ Baigta | `src/components/slides/shared/CopyButton.tsx` |
| 3️⃣ | SlideContent split | ✅ Baigta | `src/components/slides/shared/*` |
| 4️⃣ | Loading/Error states | ✅ Baigta | `src/components/ui/*` |
| 5️⃣ | TypeScript types | ✅ Baigta | `src/types/modules.ts` |

## 🔄 Kitas Žingsnis

**Prioritetas:** localStorage validacija + testų bazė

