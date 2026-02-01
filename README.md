# Prompt Anatomija - Interaktyvus Mokymas

Interaktyvus mokymas apie AI prompt struktūrą su 3 moduliais, praktinėmis užduotimis ir apklausa. Orientuotas į verslo problemų sprendimą.

## 🎯 Apie projektą

Šis projektas yra interaktyvus mokymo kursas, kuris moko kurti efektyvius AI promptus naudojant 6 blokų sistemą:
1. **Meta blokas** - rolė ir kontekstas
2. **Input blokas** - duomenys ir apribojimai
3. **Output blokas** - rezultato formatas
4. **Reasoning blokas** - mąstymo struktūra
5. **Quality Control** - kokybės kriterijai
6. **Advanced Parameters** - pažangūs parametrai

## Funkcijos

- **3 moduliai** su išsamiais verslo pavyzdžiais
- **Verslo orientacija** - visi pavyzdžiai orientuoti į verslo problemas
- **Praktinės užduotys** kiekviename modulyje
- **Apklausa** su 9 klausimais (3 kiekvienam moduliui)
- **Progreso sekimas** - localStorage
- **Modernus UI** su Tailwind CSS
- **Responsive dizainas**

## Greitas startas

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

## Projekto struktūra

```
prompt-anatomy-training/
├── src/
│   ├── components/       # React komponentai
│   ├── data/            # Modulių duomenys (JSON)
│   ├── types/           # TypeScript tipai
│   ├── utils/           # Pagalbinės funkcijos
│   ├── App.tsx          # Pagrindinis komponentas
│   ├── main.tsx         # Entry point
│   └── index.css        # Stiliai
├── public/              # Statiniai failai
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.ts       # Vite konfigūracija
└── README.md            # Dokumentacija
```

## Moduliai

### Modulis 1: Prompt Pagrindai
- Įvadas į 6 blokų sistemą
- Hierarchinė struktūra
- Meta blokas (rolė ir kontekstas)
- Input blokas (duomenys)

### Modulis 2: Mąstymo Struktūra
- Output blokas (formatas)
- Reasoning blokas (6 žingsnių struktūra)
- Quality Control (kokybės kriterijai)

### Modulis 3: Pažangūs Metodai
- Advanced Parameters
- Pilnas verslo pavyzdys (Q4 strategija)
- Prieš ir Po palyginimas
- Santrauka

## Valdymas

### Modulių duomenų keitimas

Visi modulių duomenys yra `src/data/modules.json` faile. Galite lengvai:
- Pridėti/pašalinti skaidres
- Keisti tekstus
- Pridėti naujus verslo pavyzdžius
- Keisti apklausos klausimus

**Nereikia keisti kodo!** Tiesiog redaguokite JSON failą.

### Verslo pavyzdžių pridėjimas

Pridėkite naujus verslo pavyzdžius į `modules.json`:

```json
{
  "businessExamples": [
    {
      "title": "Jūsų pavyzdys",
      "description": "Aprašymas"
    }
  ]
}
```

## Verslo pavyzdžiai

Projektas apima šiuos verslo scenarijus:
- Pardavimų ataskaitos
- Klientų analizė
- Marketing strategijos
- Q4 verslo strategijos
- Verslo dokumentų kūrimas

## Deployment

### Vercel

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

## Technologijos

- **React 18** - UI biblioteka
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Ikonos

## License

MIT License - laisvai naudokite ir modifikuokite

## Prisidėti

Prisidėti yra kviečiami visi! Sukurkite issue arba pull request.

## Kontaktai

Jei turite klausimų ar pasiūlymų, sukurkite issue GitHub repozitorijoje.

---

**Sukurta verslo problemų sprendimui**
