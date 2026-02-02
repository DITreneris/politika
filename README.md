# Prompt Anatomija - Interaktyvus DI Mokymas

Interaktyvus mokymas apie DI (dirbtinio intelekto) prompt struktūrą su 3 moduliais, praktinėmis užduotimis ir apklausa. Orientuotas į verslo problemų sprendimą.

## 🎯 Apie projektą

Šis projektas yra interaktyvus mokymo kursas, kuris moko kurti efektyvius DI promptus naudojant **6 blokų sistemą**:

| Blokas | Paskirtis |
|--------|-----------|
| 1️⃣ **Meta blokas** | Rolė, kontekstas ir tikslas |
| 2️⃣ **Input blokas** | Duomenys, faktai ir apribojimai |
| 3️⃣ **Output blokas** | Formatas, struktūra ir reikalavimai |
| 4️⃣ **Reasoning blokas** | Mąstymo seka ir logika |
| 5️⃣ **Quality Control** | Kokybės kriterijai |
| 6️⃣ **Advanced Parameters** | Temperature, reasoning gylis |

## ✨ Funkcijos

### Mokymo Turinys
- **3 moduliai**: Teorija → Testas → Praktika
- **13 teorinių skaidrių** su apibrėžimais, promptų tipais ir 6 blokais
- **10 testo klausimų** su paaiškinimais
- **4 praktiniai verslo scenarijai**: E-commerce, Marketing, HR, SaaS
- **Promptų biblioteka** su kopijavimo funkcija

### Techninės Funkcijos
- **Progreso sekimas** (localStorage)
- **Automatinis juodraščių išsaugojimas** (debounced auto-save)
- **Tamsusis/šviesusis režimas** (system preference detection)
- **Responsive dizainas** (mobile-first)
- **Klaviatūros navigacija** (←/→ skaidrėms, Escape grįžti)
- **Šventimo animacijos** (confetti)
- **Error Boundary** (globalus error handling)
- **Loading States** (Suspense + lazy loading)
- **TypeScript** (pilnas type safety)

### Dizainas
- **Navy/Gold spalvų schema** (verslo orientuota)
- **Plus Jakarta Sans** šriftas
- **Tailwind CSS** su custom animacijomis
- **Modernūs gradientai ir šešėliai**

## 🚀 Greitas startas

### Reikalavimai

- Node.js 18+ 
- npm arba yarn

### Instaliacija

```bash
# Klonuokite repozitoriją
git clone https://github.com/DITreneris/anatomija.git

# Įeikite į projekto katalogą
cd anatomija

# Įdiekite dependencies
npm install

# Paleiskite development serverį
npm run dev
```

Aplikacija bus prieinama adresu: `http://localhost:3000`

### Build produkcijai

```bash
# Sukurkite produkcijos build
npm run build

# Peržiūrėkite build
npm run preview
```

## 📦 Deployment ir GitHub Pages

### GitHub Pages (rekomenduojama)
1. GitHub repo: Settings → Pages
2. **Source**: pasirinkite **"GitHub Actions"**
3. Push į `main` automatiškai deployina

Prieiga:
- `https://ditreneris.github.io/anatomija/`

### Base path
`vite.config.ts` produkcijoje naudoja base path `/anatomija/`.
Jei keičiate repo pavadinimą, atnaujinkite base.

### Vercel / Netlify
- Vercel: `vercel`
- Netlify: Build `npm run build`, publish `dist`

## 🧭 GitHub inicializacija (pirmas kartas)
```bash
git init
git add .
git commit -m "Initial commit: Prompt Anatomija"
git remote add origin https://github.com/DITreneris/anatomija.git
git branch -M main
git push -u origin main
```

## 📁 Projekto struktūra

```
prompt-anatomy-training/
├── src/
│   ├── components/          # React komponentai
│   │   ├── App.tsx         # Pagrindinis komponentas (lazy loading)
│   │   ├── HomePage.tsx    # Pradinis puslapis
│   │   ├── ModulesPage.tsx # Modulių sąrašas
│   │   ├── ModuleView.tsx  # Modulio peržiūra
│   │   ├── SlideContent.tsx # Skaidrių turinys (refaktorintas)
│   │   ├── QuizPage.tsx    # Baigiamasis testas
│   │   ├── PromptLibrary.tsx # Promptų biblioteka
│   │   ├── Celebration.tsx # Šventimo animacijos
│   │   ├── CircularProgress.tsx # Progreso indikatorius
│   │   ├── slides/         # Skaidrių komponentai
│   │   │   ├── shared/     # Bendri komponentai
│   │   │   │   ├── CopyButton.tsx      # Kopijavimo mygtukas
│   │   │   │   ├── TemplateBlock.tsx   # Šablonų blokas
│   │   │   │   └── PracticalTask.tsx   # Praktinė užduotis
│   │   │   └── index.ts    # Re-exports
│   │   └── ui/             # UI komponentai
│   │       ├── LoadingSpinner.tsx      # Loading indikatorius
│   │       ├── ErrorBoundary.tsx       # Error handling
│   │       └── index.ts
│   ├── types/              # TypeScript tipai
│   │   └── modules.ts      # Modulių tipai (30+ interfeisų)
│   ├── data/
│   │   ├── modules.json    # Modulių turinys
│   │   └── promptLibrary.json # Promptų šablonai
│   ├── utils/
│   │   ├── progress.ts     # Progreso valdymas
│   │   └── useAutoSave.ts  # Auto-save hook
│   ├── main.tsx            # Entry point
│   └── index.css           # Global stiliai
├── public/                  # Statiniai failai
├── index.html              # HTML template
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind konfigūracija (su safelist)
├── vite.config.ts          # Vite konfigūracija
├── turinio_pletra.md       # Turinio dokumentacija
├── TODO.md                 # TODO sąrašas
└── README.md               # Ši dokumentacija
```

## 📚 Modulių Struktūra

### Modulis 1: 6 Blokų Sistema (Teorija)
13 skaidrių:
1. Įvadas į Prompt Inžineriją
2. Ką Reiškia "Promptas"? (apibrėžimai)
3. Pagrindiniai Promptų Tipai (3 tipai)
4. Hierarchinė Struktūra (6 blokų apžvalga)
5-10. Kiekvienas iš 6 blokų detaliai
11. Pilnas Prompt Pavyzdys
12. Prieš vs Po palyginimas
13. Santrauka

### Modulis 2: Žinių Patikrinimas (Testas)
- 10 klausimų apie 6 blokų sistemą
- Klausimai sugrupuoti pagal blokus
- Kiekvienas turi paaiškinimą
- Rezultatai procentais

### Modulis 3: Praktinis Pritaikymas
4 verslo scenarijai:
- 📊 Pardavimų Analizė (E-commerce)
- 📈 Marketingo Planas (B2B)
- 👥 HR Dokumentas (Darbuotojų apklausa)
- 🚀 Produkto Aprašymas (SaaS)

## ⚙️ Konfigūracija

### Modulių duomenų keitimas

Visi modulių duomenys yra `src/data/modules.json` faile. Galite lengvai:
- Pridėti/pašalinti skaidres
- Keisti tekstus
- Pridėti naujus verslo pavyzdžius
- Keisti testo klausimus

**Nereikia keisti kodo!** Tiesiog redaguokite JSON failą.

### Spalvų schema

Spalvos konfigūruojamos `tailwind.config.js`:

```javascript
colors: {
  brand: {
    // Navy mėlyna (pagrindinis)
    500: '#6366f1',
    600: '#4f46e5',
    // ...
  },
  accent: {
    // Auksinė/Amber (akcentas)
    500: '#f59e0b',
    600: '#d97706',
    // ...
  }
}
```

## 🌐 Deployment

### Vercel (rekomenduojama)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Įkelkite dist/ katalogą į Netlify
```

### GitHub Pages

```bash
npm run build
# Naudokite GitHub Actions arba įkelkite dist/ rankiniu būdu
```

## 🛠️ Technologijos

| Technologija | Paskirtis |
|--------------|-----------|
| **React 18** | UI biblioteka |
| **TypeScript** | Type safety |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Lucide React** | Ikonos |
| **canvas-confetti** | Šventimo animacijos |

## 📖 Dokumentacija

- `turinio_pletra.md` - Detalus turinio planas ir pedagoginė logika
- `UI_UX_IMPROVEMENTS.md` - UI/UX patobulinimų sąrašas
- `QUICK_START.md` - Greito starto gidas

## 📝 Changelog

### v2.1.0 (2026-02-02) - Techniniai Patobulinimai
- ✅ **Error Boundary** - Globalus error handling su retry funkcija
- ✅ **Loading States** - LoadingSpinner komponentas su Suspense
- ✅ **Lazy Loading** - Komponentai kraunami on-demand (geresnis initial load)
- ✅ **TypeScript Tipai** - Centralizuoti tipai `src/types/modules.ts` (30+ interfeisų)
- ✅ **Komponentų Refaktorinimas** - SlideContent.tsx išskaidytas į mažesnius komponentus
- ✅ **Copy Button Fix** - Individualus state kiekvienam kopijavimo mygtukui
- ✅ **Tailwind Safelist** - Dinaminės spalvų klasės veikia produkcijoje
- ✅ **Shared Komponentai** - CopyButton, TemplateBlock, PracticalTask perpanaudojami

### v2.0.0 (2026-02)
- ✅ Pridėta skaidrė "Ką Reiškia Promptas?" su apibrėžimais
- ✅ Pridėta skaidrė "Pagrindiniai Promptų Tipai" (sisteminiai, kontekstiniai, vaidmens)
- ✅ Pakeista AI → DI (Dirbtinis Intelektas)
- ✅ Pataisyta lietuvių kalbos gramatika
- ✅ Atnaujinta spalvų schema (Navy/Gold)
- ✅ Pridėta promptų biblioteka su instrukcijomis
- ✅ 13 skaidrių vietoj 11 pirmame modulyje

### v1.0.0
- Pradinė versija su 3 moduliais

## 📄 Licencija

**Mokymo turinys:** © 2024-2026 Tomas Staniulis. Visos teisės saugomos.

**Programinė įranga:** MIT License - laisvai naudokite ir modifikuokite.

Žr. [LICENSE](LICENSE) failą detalesnei informacijai.

## 🤝 Prisidėti

Prisidėti yra kviečiami visi! Sukurkite issue arba pull request.

## 📧 Kontaktai

- **Autorius:** Tomas Staniulis
- **GitHub:** [DITreneris](https://github.com/DITreneris)
- **Klausimai:** Sukurkite issue GitHub repozitorijoje

---

<div align="center">

**Prompt Anatomija** - Interaktyvus DI Mokymas

Autorinė mokymo medžiaga © 2024-2026 Tomas Staniulis

*Sukurta verslo problemų sprendimui su DI* 🎯

</div>
