# DI politika - Interaktyvus mokymas

Interaktyvus mokymas apie DI politiką su moduliais, praktinėmis užduotimis ir testais.

## 🎯 Apie projektą

Mokymo kursas, kuris moko kurti efektyvius DI promptus naudojant **6 blokų sistemą**:

| Blokas | Paskirtis |
|--------|-----------|
| 1️⃣ **Meta** | Rolė, kontekstas ir tikslas |
| 2️⃣ **Input** | Duomenys, faktai ir apribojimai |
| 3️⃣ **Output** | Formatas, struktūra ir reikalavimai |
| 4️⃣ **Reasoning** | Mąstymo seka ir logika |
| 5️⃣ **Quality Control** | Kokybės kriterijai |
| 6️⃣ **Advanced Parameters** | Temperature, reasoning gylis, atsakymo kontrolė |

## ✨ Pagrindinės funkcijos

- **3 moduliai**: Teorija (19 skaidrių) → Testas (12 klausimų) → Praktika (4 scenarijai)
- **6 blokų sistema** su workflow, technikomis ir mąstymo modeliais
- **Praktiniai verslo scenarijai**: E-commerce, Marketing, HR, SaaS
- **Progreso sekimas** ir automatinis išsaugojimas
- **Responsive dizainas** su tamsiuoju/šviesiuoju režimu
- **Promptų biblioteka** su kopijavimo funkcija

## 🚀 Greitas startas

### Reikalavimai
- Node.js 18+
- npm arba yarn

### Instaliacija

```bash
git clone https://github.com/DITreneris/politika.git
cd politika
npm install
npm run dev
```

Aplikacija bus prieinama: `http://localhost:3000`

### Build produkcijai

```bash
npm run build
npm run preview
```

### Testavimas

```bash
npm test              # Watch mode
npm run test:run      # Vienkartinis paleidimas
npm run test:coverage # Su coverage report
```

## 📚 Modulių struktūra

### Modulis 1: 6 Blokų Sistema (Teorija)
19 skaidrių apie promptų struktūrą, workflow, technikas ir kiekvieną bloką detaliai.

### Modulis 2: Žinių Patikrinimas (Testas)
12 klausimų su paaiškinimais. Sertifikatas nuo 70% rezultato.

### Modulis 3: Praktinis Pritaikymas
4 verslo scenarijai su žingsnis po žingsnio instrukcijomis ir pavyzdiniais sprendimais.

## ⚙️ Konfigūracija

### Modulių duomenų keitimas

Visi modulių duomenys yra `src/data/modules.json` faile. Galite:
- Pridėti/pašalinti skaidres
- Keisti tekstus ir klausimus
- Pridėti naujus verslo pavyzdžius

**Nereikia keisti kodo** – tiesiog redaguokite JSON failą.

### Spalvų schema

Spalvos konfigūruojamos `tailwind.config.js`:

```javascript
colors: {
  brand: { 500: '#6366f1', 600: '#4f46e5' },  // Navy mėlyna
  accent: { 500: '#f59e0b', 600: '#d97706' }  // Auksinė/Amber
}
```

## 🌐 Deployment

### GitHub Pages (rekomenduojama)

1. GitHub repo: Settings → Pages
2. Source: pasirinkite "GitHub Actions"
3. Push į `main` automatiškai deployina

Prieiga: `https://ditreneris.github.io/politika/`

**Pastaba:** `vite.config.ts` naudoja base path `/politika/`. Jei keičiate repo pavadinimą, atnaujinkite base.

### Kiti variantai

- **Vercel**: `vercel`
- **Netlify**: Build `npm run build`, publish `dist`

## 🛠️ Technologijos

| Technologija | Paskirtis |
|--------------|-----------|
| React 18 | UI biblioteka |
| TypeScript | Type safety |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Vitest | Testing |

## 📁 Projekto struktūra

```
src/
├── components/     # React komponentai
├── data/          # Modulių duomenys (JSON)
├── types/         # TypeScript tipai
├── utils/         # Utilities (progress, auto-save)
└── test/          # Test setup
```

## 📖 Dokumentacija

- `README.md` - Šis failas
- `turinio_pletra.md` - Detalus turinio planas (source of truth)
- `TODO.md` - Dabartinės užduotys
- `docs/` - Papildoma dokumentacija

## 📄 Licencija

**Mokymo turinys:** © 2024-2026 Tomas Staniulis. Visos teisės saugomos.

**Programinė įranga:** MIT License

## 📧 Kontaktai

- **Autorius:** Tomas Staniulis
- **GitHub:** [DITreneris](https://github.com/DITreneris)
- **Klausimai:** Sukurkite issue GitHub repozitorijoje

---

<div align="center">

**Promptų anatomija** - Interaktyvus DI Mokymas

Autorinė mokymo medžiaga © 2024-2026 Tomas Staniulis

*Sukurta verslo problemų sprendimui su DI* 🎯

</div>
