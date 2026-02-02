# Turinio Plėtra - Prompt Anatomija Mokymas

> **Autorinė mokymo medžiaga © 2024-2026 Tomas Staniulis**
> 
> Šis dokumentas aprašo "Prompt Anatomija" mokymo turinio struktūrą, pedagoginę logiką ir plėtros planą.

---

## 📊 Atnaujinta Struktūra (2026-02)

### ✅ Nauja 3 Modulių Logika

```
📚 MODULIS 1: "6 Blokų Sistema" (MOKYMASIS) - 25 min
   ├── 1. Įvadas į Prompt Inžineriją
   ├── 2. Ką Reiškia "Promptas"? (apibrėžimai, 3 aspektai) ✅
   ├── 3. Workflow Samprata (2 schemos + 2 promptų pavyzdžiai) ✅
   ├── 4. Pagrindiniai Promptų Tipai (sisteminiai, kontekstiniai, vaidmens) ✅
   ├── 5. Prompting'o Technikos (6 technikos + kopijuojami pavyzdžiai) ✅
   ├── 6. Hierarchinė Struktūra (6 blokų apžvalga)
   ├── 7. 1️⃣ Meta Blokas (rolė, kontekstas, tikslas)
   ├── 8. 2️⃣ Input Blokas (duomenys, faktai, apribojimai)
   ├── 9. 3️⃣ Output Blokas (formatas, struktūra, reikalavimai)
   ├── 10. 4️⃣ Reasoning Blokas (mąstymo seka, logika)
   ├── 11. 5️⃣ Quality Control (kokybės kriterijai)
   ├── 12. 6️⃣ Advanced Parameters (temperature, reasoning gylis)
   ├── 13. Pilnas Prompt Pavyzdys (visi 6 blokai)
   ├── 14. Prieš vs Po (palyginimas)
   └── 15. Modulio Santrauka
   
📝 MODULIS 2: "Žinių Patikrinimas" (TESTAS) - 10 min
   ├── Testo Įvadas
   ├── Meta Blokas – Testas (2 klausimai)
   ├── Input ir Output – Testas (3 klausimai)
   ├── Reasoning ir Quality – Testas (2 klausimai)
   ├── Advanced ir Bendra – Testas (3 klausimai)
   └── Testo Rezultatai
   
💼 MODULIS 3: "Praktinis Pritaikymas" (PRAKTIKA) - 20 min
   ├── Praktikos Įvadas
   ├── Scenarijus 1: Pardavimų Analizė (E-commerce)
   ├── Scenarijus 2: Marketingo Planas (B2B)
   ├── Scenarijus 3: HR Dokumentas (Darbuotojų apklausa)
   ├── Scenarijus 4: Produkto Aprašymas (SaaS)
   └── Praktikos Santrauka
```

---

## 🆕 Nauji Skaidrių Turiniai

### Skaidrė 2: Ką Reiškia "Promptas"?

**Tikslas:** Įvesti pagrindinius apibrėžimus prieš gilintis į struktūrą.

**Turinys:**
- **Promptas** – tekstinė instrukcija ar klausimas DI modeliui
- **Prompt inžinerija** – menas ir mokslas efektyviai bendrauti su DI

**3 Pagrindiniai Aspektai:**
| Aspektas | Aprašymas |
|----------|-----------|
| 🟣 Žmogaus ir mašinos sąveika | Gebėjimas "susikalbėti" su DI |
| 🔵 Kalbos išmanymas | Sintaksė, semantika, žodžių parinkimas |
| 🟡 Psichologija ir kūrybiškumas | Kūrybinė motyvacija, kritinis mąstymas |

**Išvada (inžinerinis požiūris):** Prompt inžinerija = Specifikacija + Struktūra + Iteracija

**Kodėl tai inžinerija:**
- **Specifikacija** – aiškus tikslas, auditorija, reikalavimai
- **Struktūra** – kontekstas, apribojimai, formatas, prioritetai
- **Iteracija** – testavimas, tikslinimas, kokybės kriterijai

**Pastaba:** kūrybiškumas padeda, bet nėra branduolys.

**Šaltiniai (gairės):**
- OpenAI Prompt Engineering Guide: https://platform.openai.com/docs/guides/prompt-engineering
- Microsoft OpenAI Prompt Engineering: https://learn.microsoft.com/azure/ai-services/openai/concepts/prompt-engineering
- Anthropic Prompt Engineering: https://docs.anthropic.com/claude/docs/prompt-engineering

---

### Skaidrė 3: Workflow Samprata

**Tikslas:** Parodyti skirtumą tarp paprasto pokalbio ir darbo workflow.

**Turinys:**
- Schema 1: Input (klausimas) → LLM → Output (atsakymas)
- Schema 2: Input (promptas + duomenys) → LLM → Output (analizė/dokumentas/planas)
- 2 kopijuojami pavyzdžiai (basic su humoru + detalesnis liepiantis)

---

### Skaidrė 4: Pagrindiniai Promptų Tipai

**Tikslas:** Supažindinti su 3 promptų tipais prieš pereinant prie 6 blokų.

| Tipas | Spalva | Funkcija | Pavyzdys |
|-------|--------|----------|----------|
| **Sisteminiai** | Mėlyna | Nustato DI darbo tikslą ir funkciją | "Tu esi rinkodaros analitikas..." |
| **Kontekstiniai** | Žydra | Pateikia situacinę informaciją | "Lietuvos logistikos sektorius, 2024 m. duomenys..." |
| **Vaidmens** | Rožinė | Formuoja komunikacijos stilių ir toną | "Įsivaizduok, kad esi įmonės vadovas..." |

**Praktinis patarimas:** Kombinuokite visus tris tipus viename užklausime.

---

### Skaidrė 5: Prompting'o Technikos

**Tikslas:** Supažindinti su 6 bazinėmis technikomis, kad būtų aišku, kaip formuoti užklausas.

**Glausta logika:**
1) Pradedame nuo **zero-shot** (be konteksto)  
2) Tada **few-shots** (su pavyzdžiais)  
3) Pereiname į **minčių grandinę** (užduotis žingsniais)  
4) Parodome **promptų seką** (rezultatų grandinimas)  
5) Sustipriname **instruktavimu** (formatas, tonas)  
6) Įvardijame **manipuliaciją** (ko vengti)

**Greitai kopijuojami pavyzdžiai:**
```
Zero-shot: Sukurk 1 sakinio produkto šūkį.
Few-shots: Pateik 2 šūkių pavyzdžius, tada sukurk 3 naujus.
Minčių grandinė: 1) koncepcija 2) planas 3) biudžetas 4) darbų grafikas.
Promptų seka: Sukurk tezes → Sudaryk planą → Parašyk įvadą.
Instruktavimas: Parašyk 200 žodžių pranešimą, formalus tonas, LT kalba.
Manipuliacija (vengti): Įrodyk, kad X geriau už Y (šališka užklausa).
```

---

### Skaidrė 6: Gero Prompto Šablonas (META + INPUT + OUTPUT)

**Tikslas:** Suskaidyti 3 pagrindinius blokus ir sujungti į vieną aiškų šabloną.

**META (kas jūs esate ir kam):**
- **Vaidmuo**: kas jūs esate (funkcija, patirtis)
- **Tikslas**: ką reikia sukurti
- **Auditorija**: kam skirtas rezultatas

**INPUT (ką turite):**
- **Duomenys**: faktai, skaičiai, kontekstas
- **Apribojimai**: laikas, biudžetas, ribos

**OUTPUT (ko norite):**
- **Formatas**: lentelė, sąrašas, dokumentas
- **Struktūra**: punktai, skyriai, seka
- **Tonas**: profesionalus, aiškus, draugiškas

**Kopijuojamas šablonas:**
```
META: Vaidmuo – [kas esate]. Tikslas – [ką sukurti]. Auditorija – [kam].
INPUT: Duomenys – [faktai/skaičiai]. Apribojimai – [laikas/biudžetas].
OUTPUT: Format – [lentelė/sąrašas/dokumentas]. Struktūra – [punktai/skyriai]. Tonas – [stilius].
```

**Pavyzdys:**
```
META: Vaidmuo – marketingo vadovas. Tikslas – paruošti SWOT analizę. Auditorija – vadovybė.
INPUT: Duomenys – produktas „EcoBox“, tikslas mažmeninė prekyba. Apribojimai – 1 puslapis.
OUTPUT: Format – lentelė su punktais. Struktūra – S/W/O/T po 3 punktus. Tonas – profesionalus, aiškus.
```

---

### Skaidrė 7: Nuo 3 blokų iki 6 blokų

**Tikslas:** Paaiškinti, kodėl prie 3 blokų pridedame Reasoning, Quality ir Advanced.

**Turinys:**
- Mapping: META / INPUT / OUTPUT → branduolys
- REASONING / QUALITY / ADVANCED → kontrolė ir patikrinamumas
- Išvada: 3 blokai = aiški užklausa; 6 blokai = aiški + nuspėjama + patikrinama

---

## 🎯 Pedagoginė Logika

### Kodėl ši struktūra geresnė?

| Senas modelis | Naujas modelis |
|---------------|----------------|
| 3 moduliai = 3 atskiri mokymai | 1 nuoseklus mokymas + testas + praktika |
| Teorija išskaidyta | Visa teorija vienoje vietoje |
| Iškart į blokus | Pirma apibrėžimai → tipai → blokai |
| Testas pabaigoje | Testas po teorijos, prieš praktiką |
| 1-2 praktinės užduotys | 4 realūs verslo scenarijai |
| Tas pats pavyzdys visur | Skirtingi kontekstai: E-com, Marketing, HR, Product |

### Mokymosi Seka (Bloom's Taxonomy)

```
1. ŽINOTI (Skaidrės 1-3) → Kas yra promptas? Kokie tipai?
2. SUPRASTI (Skaidrės 4-10) → Kodėl kiekvienas blokas svarbus?
3. PRISIMINTI (Modulis 2) → Ar galiu atsakyti į klausimus?
4. TAIKYTI (Modulis 3) → Ar galiu sukurti savo promptą?
```

---

## 📚 Modulis 1: 6 Blokų Sistema (13 Skaidrių)

### Skaidrė 1: Įvadas
- Kas yra prompt inžinerija?
- Kodėl struktūra svarbi?
- Ką išmoksite (6 blokai)
- Mokymo trukmė (~45 min viso)

### Skaidrė 2: Apibrėžimai ✅
- Kas yra promptas?
- Prompt inžinerija = Specifikacija + Struktūra + Iteracija
- 3 aspektai (inžinerinis požiūris)

### Skaidrė 3: Workflow Samprata ✅
- 2 schemos (pokalbis vs dokumentų workflow)
- 2 kopijuojami pavyzdžiai (basic + liepiantis)

### Skaidrė 4: Promptų Tipai ✅
- Sisteminiai promptai
- Kontekstiniai promptai
- Vaidmens promptai
- Praktinis patarimas: kombinuokite visus tris

### Skaidrė 5: Prompting'o Technikos ✅
- 6 technikos su kopijuojamais pavyzdžiais

### Skaidrė 6: Hierarchinė Struktūra
- 6 blokų piramidė (nuo svarbiausio)
- Kiekvieno bloko prioritetas
- Trumpi apibūdinimai kiekvienam blokui

### Skaidrės 7-12: Kiekvienas Blokas
Kiekviena skaidrė turi:
- **Pagrindinį klausimą** (pvz., "Kas esate ir ką darote?")
- **Apibrėžimą** (kas tai yra)
- **Komponentus** (ką apima)
- **Gerą vs blogą pavyzdį**
- **Kopijuojamą šabloną** ✅

**Greitas šablonų rinkinys (įterpti į kiekvieną bloką):**
```
META: Tu esi [vaidmuo]. Tikslas: [rezultatas]. Auditorija: [kam].
INPUT: Duomenys: [faktai/skaičiai]. Apribojimai: [laikas/biudžetas].
OUTPUT: Format: [struktūra]. Ilgis: [apimtis]. Tonas: [stilius].
REASONING: 1) [žingsnis] 2) [žingsnis] 3) [žingsnis]
QUALITY: ✓ [kriterijus] ✓ [kriterijus] ✓ [kriterijus]
ADVANCED: Temperature: [0.2–0.7]. Reasoning: [normal/extended].
```

### Skaidrė 13: Pilnas Pavyzdys
- Q4 Pardavimų Strategija
- Visi 6 blokai veikia kartu
- Aiškus kontekstas ir rezultatas

### Skaidrė 14: Prieš vs Po
- Nestruktūruotas promptas (40% tikslumas)
- Struktūruotas promptas (85% tikslumas)
- Rezultatų palyginimas

### Skaidrė 15: Santrauka
- 6 pagrindiniai blokai
- Pagrindinės idėjos
- Kiti žingsniai

---

## 📝 Modulis 2: Žinių Patikrinimas (Testas)

### Testo Struktūra
- 12 klausimų (6 blokai + workflow/technikos)
- Klausimai sugrupuoti pagal blokus
- Kiekvienas klausimas turi paaiškinimą
- Galutinis rezultatas procentais

### Klausimų Pasiskirstymas
| Blokas | Klausimų sk. |
|--------|--------------|
| Meta | 2 |
| Input + Output | 3 |
| Reasoning + Quality | 2 |
| Advanced + Bendra | 3 |
| Workflow + Technikos | 2 |
| **Viso** | **12** |

### Testo Formatas
```
Klausimas: "Nuo ko geriausia pradėti promptą?"
○ Nuo rolės ir tikslo (Meta) ✓
○ Nuo rezultatų formato (Output)
○ Nuo duomenų (Input)
○ Nuo parametrų (Advanced)

Paaiškinimas: "Meta blokas yra svarbiausias – 
jis nustato kontekstą visam likusiam promptui."
```

---

## 💼 Modulis 3: Praktinis Pritaikymas

### 4 Verslo Scenarijai

#### Scenarijus 1: Pardavimų Analizė (E-commerce)
- **Kontekstas**: Quarterly review valdybai
- **Duomenys**: 250k EUR, 1200 užsakymų, +15%
- **Iššūkis**: Skirtingos auditorijos patirtis
- **Formatas**: Executive Summary

#### Scenarijus 2: Marketingo Planas (B2B)
- **Kontekstas**: Q1 strategijos dokumentas
- **Duomenys**: 300k EUR biudžetas, CAC 6500 EUR
- **Iššūkis**: Konkurentų augimas
- **Formatas**: Strateginis planas su KPI

#### Scenarijus 3: HR Dokumentas
- **Kontekstas**: Darbuotojų apklausos analizė
- **Duomenys**: 156 darbuotojai, 7.2/10 pasitenkinimas
- **Iššūkis**: Probleminės sritys ir rekomendacijos
- **Formatas**: Ataskaita su veiksmų planu

#### Scenarijus 4: Produkto Aprašymas (SaaS)
- **Kontekstas**: Naujo produkto launch
- **Duomenys**: 49 EUR/mėn, 80% automatizacija
- **Iššūkis**: SEO + konversijos optimizacija
- **Formatas**: Svetainės tekstas + reklama

### Kiekvieno Scenarijaus Struktūra
1. **Kontekstas** - Kas jūs esate ir ką darote
2. **Duomenys** - Konkretūs skaičiai ir faktai
3. **Apribojimai** - Laikas, biudžetas, komanda
4. **Laukiamas formatas** - Ką reikia sukurti
5. **Užduotis** - Sukurti pilną 6 blokų promptą
6. **Pavyzdys** (Scenarijus 1) - Galima peržiūrėti

---

## 🎓 Progreso Logika

### Modulių Atrakinimas
```
Modulis 1 → Visada atrakintas
Modulis 2 → Atrakinamas baigus Modulį 1
Modulis 3 → Atrakinamas baigus Modulį 2
Sertifikatas → Baigus visus 3 modulius + ≥70% teste
```

### Progreso Sekimas
- Kiekvieno modulio procentas
- Bendra pažanga
- Užbaigtų praktinių užduočių skaičius
- Testo rezultatas

---

## 🌐 Kalbos ir Stiliaus Gairės

### Terminologija
| Angliškai | Lietuviškai |
|-----------|-------------|
| AI | DI (Dirbtinis Intelektas) |
| prompt | promptas |
| prompt engineering | prompt inžinerija |
| input | įvestis / duomenys |
| output | išvestis / rezultatas |

### Gramatika
- Vartojama "DI" vietoj "AI"
- "promptas, promptui, promptą, promptus" (be apostrofo)
- "mąstyti" vietoj "galvoti" kalbant apie DI

---

## 📋 Pavyzdžių Biblioteka

### Pilnas Prompt Pavyzdys (Scenarijus 1)

```
META:
Jūs esate vyresnysis verslo analitikas su 8 metų patirtimi 
e-commerce srityje. Jūsų tikslas – parengti Q3 pardavimų 
ataskaitą valdybos nariams, kurie priims strateginius Q4 sprendimus.

INPUT:
Q3 2024 duomenys:
- Pajamos: 250k EUR (+15% vs Q2)
- Užsakymai: 1200 (vidutinis čekis 208 EUR)
- Grąžinimų rodiklis: 3.2%
- Kategorijos: Elektronika 45%, Apranga 30%, Namai 25%

Apribojimai:
- Terminas: 3 dienos
- Auditorija: 6 valdybos nariai su skirtinga patirtimi

OUTPUT:
Formatas: Executive Summary (1-2 puslapiai)
Struktūra:
1) Pagrindinės metrikos (KPI dashboard)
2) Tendencijos (vs Q2, vs praėjusių metų)
3) Kategorijų analizė (top performers)
4) Rekomendacijos Q4 (3 konkrečios)

Kalba: lietuvių
Tonas: profesionalus, verslo

REASONING:
1) Apibendrinti pagrindinius KPI vienoje vietoje
2) Palyginti su ankstesniais laikotarpiais
3) Identifikuoti augimo ir problemų sritis
4) Suformuluoti 3 aiškias, veiksmais pagrįstas rekomendacijas

QUALITY:
✓ Visi skaičiai tikslūs ir patikrinti
✓ Palyginimas su Q2 pateiktas
✓ Rekomendacijos konkrečios ir įgyvendinamos
✓ Dokumentas neviršija 2 puslapių
✓ Tinkamas valdybos nariams

ADVANCED:
- Temperature: 0.3 (faktinis, tikslus tonas)
- Reasoning: normalus
- Format: struktūruotas verslo dokumentas
```

### Mini Promptai Greitam Kopijavimui

**1) Vienas sakinys (zero-shot):**
```
Sukurk vieno sakinio produkto šūkį sveikatos programėlei.
```

**2) Su pavyzdžiais (few-shots):**
```
Pavyzdžiai:
1) „Mažiau streso, daugiau energijos.“
2) „Tavo sveikata – tavo planas.“
Sukurk dar 3 panašaus stiliaus šūkius.
```

**3) Struktūruota užduotis (minčių grandinė):**
```
1) koncepcija 2) planas 3) biudžetas 4) darbų grafikas.
```

**4) Promptų seka:**
```
Sukurk 5 tezes apie darbuotojų įsitraukimą → Sudaryk plano struktūrą → Parašyk 1 pastraipos įvadą.
```

**5) Instruktavimas:**
```
Parašyk 180–220 žodžių pranešimą investuotojams. Tonas: formalus. Kalba: LT.
```

---

## 🔄 Ateities Plėtra

### Fazė 1 (Dabartinė) ✅
- ✅ 3 modulių sistema (Learn → Test → Practice)
- ✅ 15 skaidrių teorijoje (įtraukta Workflow + Technikos)
- ✅ 4 praktiniai scenarijai
- ✅ Interaktyvus testas
- ✅ Progreso sekimas
- ✅ Promptų biblioteka su kopijavimo funkcija
- ✅ Kopijuojami šablonai kiekviename bloke
- ✅ Lietuviška terminologija (DI vietoj AI)
- ✅ Modernus Navy/Gold dizainas

### Techniniai Patobulinimai (2026-02) ✅
- ✅ **Tailwind safelist** - Pataisyta dinaminės spalvų klasės produkcijoje
- ✅ **Copy button bug fix** - Individualus state kiekvienam kopijavimo mygtukui
- ✅ **Komponentų refaktorinimas** - SlideContent.tsx išskaidytas į mažesnius komponentus
- ✅ **Loading/Error states** - Pridėtas LoadingSpinner ir ErrorBoundary
- ✅ **TypeScript tipai** - Centralizuoti tipai `src/types/modules.ts`
- ✅ **Lazy loading** - Komponentai kraunami on-demand (geresnis initial load)
- ✅ **Shared komponentai** - CopyButton, TemplateBlock, PracticalTask perpanaudojami

### Fazė 2 (Planuojama)
- [ ] Sertifikato generavimas
- [ ] Promptų išsaugojimas/eksportavimas
- [ ] Papildomi scenarijai (8-10 viso)
- [ ] ROI skaičiuoklė

### Fazė 3 (Ateitis)
- [ ] DI grįžtamasis ryšys praktinėms užduotims
- [ ] Komandiniai mokymai
- [ ] Pažangusis kursas (advanced techniques)
- [ ] Integracija su DI įrankiais

---

## 📜 Autorinės Teisės

```
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   PROMPT ANATOMIJA - Interaktyvus DI Mokymas                   ║
║                                                                ║
║   Autorinė mokymo medžiaga                                     ║
║   © 2024-2026 Tomas Staniulis                                  ║
║   Visos teisės saugomos                                        ║
║                                                                ║
║   Mokymo turinys, metodika ir 6 blokų sistema yra              ║
║   Tomo Staniulio intelektinė nuosavybė.                        ║
║                                                                ║
║   Programinė įranga platinama pagal MIT licenciją.             ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

**Kontaktai:**
- GitHub: [DITreneris](https://github.com/DITreneris)

**Versija:** 2.1.0 (2026-02)

---

## 🛠️ Techninė Architektūra

### Projekto Struktūra (Atnaujinta)

```
src/
├── components/
│   ├── slides/              # Skaidrių komponentai
│   │   ├── shared/         # Bendri komponentai
│   │   │   ├── CopyButton.tsx      # Kopijavimo mygtukas (individualus state)
│   │   │   ├── TemplateBlock.tsx   # Šablonų blokas
│   │   │   └── PracticalTask.tsx   # Praktinė užduotis
│   │   └── index.ts        # Re-exports
│   ├── ui/                 # UI komponentai
│   │   ├── LoadingSpinner.tsx      # Loading indikatorius
│   │   ├── ErrorBoundary.tsx        # Error handling
│   │   └── index.ts
│   ├── App.tsx             # Pagrindinis komponentas (lazy loading)
│   ├── HomePage.tsx
│   ├── ModulesPage.tsx
│   ├── ModuleView.tsx
│   ├── QuizPage.tsx
│   └── SlideContent.tsx    # Refaktorintas (1400 eilučių)
├── types/
│   └── modules.ts          # TypeScript tipai (30+ interfeisų)
├── utils/
│   ├── progress.ts         # Progreso valdymas
│   └── useAutoSave.ts      # Auto-save hook
└── data/
    ├── modules.json         # Modulių duomenys
    └── promptLibrary.json   # Promptų biblioteka
```

### Techninės Detalės

#### 1. Tailwind Safelist
`tailwind.config.js` dabar turi safelist dinaminėms spalvų klasėms:
- `bg-{color}-{shade}` (rose, orange, amber, emerald, brand, violet, cyan, fuchsia)
- `text-{color}-{shade}`
- `border-{color}-{shade}`
- Dark mode variantai

**Rezultatas:** Visos dinaminės klasės veikia produkcijoje ✓

#### 2. Copy Button Fix
Kiekvienas `CopyButton` komponentas turi savo state:
- Prieš: vienas `copied` state visoms kopijoms → visi mygtukai rodė "Copied"
- Po: individualus `copiedId` tracking → tik paspaustas mygtukas rodo "Copied"

#### 3. Komponentų Refaktorinimas
- **SlideContent.tsx**: 1802 → ~1400 eilučių
- Išskirti shared komponentai: `CopyButton`, `TemplateBlock`, `PracticalTask`
- Kiekvienas slide tipas dabar atskira funkcija (lengviau testuoti)

#### 4. Loading/Error States
- **LoadingSpinner**: 3 dydžiai (sm, md, lg)
- **ErrorBoundary**: Class component su retry funkcija
- **Lazy loading**: React.lazy() + Suspense visiems dideliems komponentams

#### 5. TypeScript Tipai
`src/types/modules.ts` apima:
- `Slide`, `Module`, `Quiz` interfeisus
- `TestQuestion`, `Scenario`, `PracticalTask`
- `DefinitionsContent`, `PromptTypesContent`, ir kt.
- `BlockColor`, `SlideType` tipus

**Rezultatas:** Pilnas type safety + autocomplete visur ✓

### Build Metrikos

- **Build laikas:** ~40s
- **Bundle dydis:** ~280KB (gzip: ~120KB)
- **Linter klaidos:** 0 ✓
- **TypeScript klaidos:** 0 ✓
