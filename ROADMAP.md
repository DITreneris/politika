# 🗺️ Prompt Anatomija - Plėtros Roadmap

> **Data:** 2026-02-01  
> **Versija:** 2.0.0  
> **Statusas:** Kritinė analizė ir plėtros planas

---

## 📊 Dabartinės Būklės Analizė

### ✅ Stiprybės

1. **Kokybiškas kodas**
   - ✅ TypeScript su strict mode
   - ✅ 0 linting klaidų
   - ✅ Geras komponentų struktūra
   - ✅ Modernus tech stack (React 18, Vite, Tailwind)

2. **Funkcionalumas**
   - ✅ 3 modulių sistema (Learn → Test → Practice)
   - ✅ Progreso sekimas (localStorage)
   - ✅ Auto-save funkcionalumas
   - ✅ Dark mode palaikymas
   - ✅ Responsive dizainas
   - ✅ Klaviatūros navigacija

3. **UX/UI**
   - ✅ Modernus dizainas (Navy/Gold schema)
   - ✅ Animacijos ir transitions
   - ✅ Accessibility palaikymas (ARIA labels)
   - ✅ Mobile-first prieiga

### ⚠️ Kritinės Problemos

#### 🔴 Aukšto prioriteto (veikia dabar)

1. **Nėra klaidų valdymo (Error Boundaries)**
   - ❌ Jei komponentas nukrenta, visa aplikacija nukrenta
   - ❌ Nėra fallback UI klaidoms
   - ❌ Vartotojas mato baltą ekraną klaidų atveju
   - **Rizika:** Blogas vartotojo patirtis, duomenų praradimas

2. **Nėra testavimo infrastruktūros**
   - ❌ 0 testų (unit, integration, e2e)
   - ❌ Nėra CI/CD testavimo
   - ❌ Refactoring rizika
   - **Rizika:** Regresijos, sunku pridėti naują funkcionalumą

3. **localStorage duomenų migracijos strategija**
   - ❌ Nėra versijavimo duomenų struktūroms
   - ❌ Jei keičiasi Progress interface, seni duomenys gali sugadinti aplikaciją
   - ❌ Nėra duomenų validacijos
   - **Rizika:** Duomenų praradimas, aplikacijos lūžimas

4. **Nėra SEO optimizacijos**
   - ❌ Nėra meta tags
   - ❌ Nėra Open Graph
   - ❌ Nėra structured data
   - ❌ SPA problema su SEO
   - **Rizika:** Blogas paieškos matomumas

5. **Nėra produkcijos monitoring**
   - ❌ Nėra error tracking (Sentry, etc.)
   - ❌ Nėra analytics (Google Analytics, etc.)
   - ❌ Nėra performance monitoring
   - **Rizika:** Nežinome, kas neveikia produkcijoje

#### 🟡 Vidutinio prioriteto (veikia, bet gali pagerinti)

6. **Nėra offline palaikymo (PWA)**
   - ❌ Nėra Service Worker
   - ❌ Nėra offline cache
   - ❌ Nėra install prompt
   - **Rizika:** Blogas patirtis prasto interneto sąlygomis

7. **Nėra duomenų eksporto/importo**
   - ❌ Vartotojas negali eksportuoti progreso
   - ❌ Nėra backup funkcijos
   - ❌ Nėra multi-device sinchronizacijos
   - **Rizika:** Duomenų praradimas keičiant įrenginį

8. **Nėra sertifikato generavimo**
   - ❌ Minėta `turinio_pletra.md`, bet neįgyvendinta
   - ❌ Vartotojai negali gauti sertifikato
   - **Rizika:** Sumažėjęs engagement

9. **Nėra DI grįžtamojo ryšio**
   - ❌ Minėta `turinio_pletra.md` (Fazė 3)
   - ❌ Praktinės užduotys neturi DI vertinimo
   - **Rizika:** Sumažėjęs mokymosi efektyvumas

10. **Nėra versijavimo sistemos**
    - ❌ Nėra CHANGELOG.md
    - ❌ Nėra semantinio versijavimo proceso
    - ❌ Nėra migration scripts
    - **Rizika:** Sunku sekti pakeitimus

#### 🟢 Žemo prioriteto (nice-to-have)

11. **Nėra multi-language palaikymo**
    - ❌ Tik lietuvių kalba
    - ❌ Nėra i18n sistemos
    - **Rizika:** Ribotas pasiekiamumas

12. **Nėra advanced gamification**
    - ❌ Nėra badges/achievements
    - ❌ Nėra leaderboards
    - ❌ Nėra social features
    - **Rizika:** Sumažėjęs engagement

13. **Nėra backend integracijos**
    - ❌ Viskas localStorage
    - ❌ Nėra user authentication
    - ❌ Nėra cloud sync
    - **Rizika:** Ribotas scalability

---

## 🎯 Plėtros Planas

### 📅 FAZĖ 1: Stabilizacija ir Pagrindinis Funkcionalumas (2026-02 - 2026-04)

**Tikslas:** Pašalinti kritines problemas, užtikrinti stabilumą

#### Sausis-Vasaris (2026-02 - 2026-03)

**Sprint 1: Klaidų valdymas ir stabilumas (2 savaitės)**
- [ ] **Error Boundaries įgyvendinimas**
  - Sukurti `ErrorBoundary` komponentą
  - Apgaubti visus pagrindinius komponentus
  - Pridėti fallback UI su "Atnaujinti puslapį" mygtuku
  - Logging klaidų į console (vėliau - Sentry)
  - **Prioritetas:** 🔴 KRITINIS
  - **Įvertinimas:** 8 valandos

- [ ] **Duomenų validacija ir migracija**
  - Sukurti `dataMigration.ts` utility
  - Pridėti versijavimą Progress interface (v1, v2, etc.)
  - Validacija localStorage duomenų prieš naudojimą
  - Automatinė migracija senų duomenų į naują formatą
  - **Prioritetas:** 🔴 KRITINIS
  - **Įvertinimas:** 12 valandų

- [ ] **Testavimo infrastruktūra**
  - Setup Vitest arba Jest
  - Setup React Testing Library
  - Parašyti pirmuosius unit testus (utils/progress.ts, utils/useAutoSave.ts)
  - Parašyti komponentų testus (ErrorBoundary, CircularProgress)
  - CI/CD integracija (GitHub Actions)
  - **Prioritetas:** 🔴 KRITINIS
  - **Įvertinimas:** 16 valandų

**Sprint 2: SEO ir Monitoring (2 savaitės)**
- [ ] **SEO optimizacija**
  - Pridėti React Helmet arba react-helmet-async
  - Meta tags (title, description, keywords)
  - Open Graph tags
  - Twitter Card tags
  - Structured data (JSON-LD) - Course schema
  - Sitemap generavimas
  - robots.txt
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 10 valandų

- [ ] **Produkcijos monitoring**
  - Integruoti Sentry error tracking
  - Integruoti Google Analytics 4
  - Performance monitoring (Web Vitals)
  - Error logging su context
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 8 valandų

**Sprint 3: Dokumentacija ir versijavimas (1 savaitė)**
- [ ] **CHANGELOG.md sukūrimas**
  - Semantinio versijavimo gairės
  - Automatinis changelog generavimas (conventional commits)
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 4 valandos

- [ ] **Contributing.md**
  - Development setup
  - Code style guidelines
  - Pull request procesas
  - **Prioritetas:** 🟢 ŽEMAS
  - **Įvertinimas:** 6 valandų

#### Kovas (2026-03 - 2026-04)

**Sprint 4: PWA ir offline palaikymas (2 savaitės)**
- [ ] **PWA funkcionalumas**
  - Service Worker sukūrimas
  - Cache strategija (Cache First, Network First)
  - Offline fallback puslapis
  - Install prompt (PWA install banner)
  - Web App Manifest
  - Icons (various sizes)
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 16 valandų

- [ ] **Duomenų eksportas/importas**
  - Export progreso į JSON
  - Import progreso iš JSON
  - Duomenų validacija importo metu
  - UI su drag-and-drop
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 12 valandų

**Sprint 5: Sertifikato generavimas (2 savaitės)**
- [ ] **Sertifikato sistema**
  - PDF generavimas (jsPDF arba PDFKit)
  - Sertifikato dizainas (template)
  - Vartotojo vardo įtraukimas
  - Data ir rezultatas
  - Download funkcija
  - Print funkcija
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 14 valandų

---

### 📅 FAZĖ 2: Funkcionalumo Plėtra (2026-04 - 2026-07)

**Tikslas:** Pridėti naują funkcionalumą, pagerinti UX

#### Balandis-Gegužė (2026-04 - 2026-05)

**Sprint 6: DI grįžtamasis ryšys (3 savaitės)**
- [ ] **DI integracija praktinėms užduotims**
  - API integracija (OpenAI, Anthropic, arba savo backend)
  - Prompt vertinimo sistema
  - Struktūruotas grįžtamasis ryšys (6 blokų analizė)
  - Scoring sistema
  - Suggestions ir pagerinimai
  - Rate limiting ir cost management
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 24 valandos
  - **Rizika:** API costs, response times

**Sprint 7: Papildomi scenarijai (2 savaitės)**
- [ ] **Pridėti 4-6 naujus verslo scenarijus**
  - Finansai/Accounting
  - Legal/Compliance
  - Operations/Logistics
  - Customer Support
  - Product Development
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 16 valandų (turinio kūrimas)

#### Birželis-Liepa (2026-06 - 2026-07)

**Sprint 8: Gamification (2 savaitės)**
- [ ] **Badges ir achievements sistema**
  - Badge dizainas
  - Achievement logika
  - Progress tracking
  - Visual feedback
  - **Prioritetas:** 🟢 ŽEMAS
  - **Įvertinimas:** 12 valandų

**Sprint 9: Social features (2 savaitės)**
- [ ] **Social sharing**
  - Share sertifikato
  - Share progreso
  - Social media integracija
  - **Prioritetas:** 🟢 ŽEMAS
  - **Įvertinimas:** 8 valandų

**Sprint 10: Performance optimizacija (1 savaitė)**
- [ ] **Code splitting**
  - Route-based code splitting
  - Component lazy loading
  - Bundle size analizė
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 8 valandų

---

### 📅 FAZĖ 3: Scalability ir Plėtra (2026-07 - 2026-12)

**Tikslas:** Paruošti platformą didesniam naudojimui

#### Rugpjūtis-Rugsėjis (2026-08 - 2026-09)

**Sprint 11: Backend integracija (4 savaitės)**
- [ ] **Backend architektūra**
  - Backend pasirinkimas (Node.js, Python, arba serverless)
  - Database schema (user, progress, certificates)
  - API dizainas (REST arba GraphQL)
  - Authentication sistema (JWT)
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 40 valandų
  - **Rizika:** Didelė užduotis, reikia backend žinių

- [ ] **Frontend integracija**
  - API client (axios arba fetch wrapper)
  - State management (Context API arba Zustand)
  - Offline sync strategija
  - Error handling
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 20 valandų

#### Spalis-Lapkritis (2026-10 - 2026-11)

**Sprint 12: Multi-language palaikymas (3 savaitės)**
- [ ] **i18n sistema**
  - react-i18next arba i18next setup
  - Translation files struktūra
  - Language switcher UI
  - URL-based language routing
  - **Prioritetas:** 🟢 ŽEMAS
  - **Įvertinimas:** 24 valandos

**Sprint 13: Advanced features (3 savaitės)**
- [ ] **Komandiniai mokymai**
  - Team creation
  - Progress sharing
  - Leaderboards
  - **Prioritetas:** 🟢 ŽEMAS
  - **Įvertinimas:** 30 valandų

- [ ] **Pažangusis kursas**
  - Advanced techniques modulis
  - Complex scenarios
  - **Prioritetas:** 🟢 ŽEMAS
  - **Įvertinimas:** 20 valandų (turinio kūrimas)

#### Gruodis (2026-12)

**Sprint 14: Optimizacija ir poliravimas (2 savaitės)**
- [ ] **Performance audit**
  - Lighthouse scoring
  - Core Web Vitals optimizacija
  - Bundle size optimizacija
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 12 valandų

- [ ] **Accessibility audit**
  - WCAG 2.1 AA compliance
  - Screen reader testing
  - Keyboard navigation testing
  - **Prioritetas:** 🟡 VIDUTINIS
  - **Įvertinimas:** 10 valandų

---

## 📊 Prioritetų Matrica

| Užduotis | Prioritetas | Įvertinimas | Rizika | ROI |
|----------|-------------|-------------|--------|-----|
| Error Boundaries | 🔴 KRITINIS | 8h | Žema | Aukštas |
| Duomenų migracija | 🔴 KRITINIS | 12h | Vidutinė | Aukštas |
| Testavimo infrastruktūra | 🔴 KRITINIS | 16h | Žema | Aukštas |
| SEO optimizacija | 🟡 VIDUTINIS | 10h | Žema | Vidutinis |
| Monitoring | 🟡 VIDUTINIS | 8h | Žema | Vidutinis |
| PWA | 🟡 VIDUTINIS | 16h | Vidutinė | Vidutinis |
| Eksportas/Importas | 🟡 VIDUTINIS | 12h | Žema | Vidutinis |
| Sertifikatas | 🟡 VIDUTINIS | 14h | Žema | Vidutinis |
| DI grįžtamasis ryšys | 🟡 VIDUTINIS | 24h | Aukšta | Aukštas |
| Backend integracija | 🟡 VIDUTINIS | 60h | Aukšta | Vidutinis |
| Multi-language | 🟢 ŽEMAS | 24h | Vidutinė | Žemas |
| Gamification | 🟢 ŽEMAS | 12h | Žema | Žemas |

---

## ⚠️ Rizikos Vertinimas

### Aukštos rizikos užduotys

1. **DI grįžtamasis ryšys**
   - **Rizika:** API costs, response times, quality
   - **Mitigacija:** 
     - Pradėti su mock data
     - Rate limiting
     - Cost monitoring
     - Fallback į manual vertinimą

2. **Backend integracija**
   - **Rizika:** Didelė užduotis, reikia backend žinių
   - **Mitigacija:**
     - Pradėti su serverless (Vercel Functions, Netlify Functions)
     - Arba naudoti BaaS (Firebase, Supabase)
     - Phased approach

3. **Duomenų migracija**
   - **Rizika:** Duomenų praradimas
   - **Mitigacija:**
     - Backward compatibility
     - Extensive testing
     - Backup funkcija prieš migraciją

### Vidutinės rizikos užduotys

4. **PWA implementacija**
   - **Rizika:** Browser compatibility
   - **Mitigacija:** Progressive enhancement

5. **Multi-language**
   - **Rizika:** Translation quality
   - **Mitigacija:** Professional translation

---

## 📈 Sėkmės Metrikos

### Techninės metrikos
- ✅ 0 kritinių klaidų produkcijoje
- ✅ Lighthouse score > 90
- ✅ Core Web Vitals: Green
- ✅ Test coverage > 70%
- ✅ Bundle size < 500KB (gzipped)

### Verslo metrikos
- 📊 User retention rate
- 📊 Completion rate (modulių)
- 📊 Average time per session
- 📊 Certificate generation rate
- 📊 User satisfaction (NPS)

### UX metrikos
- 📊 Error rate
- 📊 Time to interactive
- 📊 Mobile vs Desktop usage
- 📊 Dark mode adoption

---

## 🎯 Rekomendacijos

### Šiandien (2026-02-01) - Pirmieji žingsniai

1. **IMMEDIATE (šią savaitę)**
   - [ ] Sukurti Error Boundary komponentą
   - [ ] Pridėti duomenų versijavimą ir validaciją
   - [ ] Setup testavimo infrastruktūrą (bent jau basic)

2. **Šį mėnesį (vasaris 2026)**
   - [ ] Užbaigti kritines problemas (Error Boundaries, migracija, testai)
   - [ ] Pridėti SEO optimizaciją
   - [ ] Integruoti monitoring

3. **Artimiausius 3 mėnesius**
   - [ ] PWA funkcionalumas
   - [ ] Eksportas/Importas
   - [ ] Sertifikato generavimas

### Ilgalaikės strategijos

1. **Nedaryti dabar:**
   - ❌ Backend integracija (per anksti, nėra pakankamai vartotojų)
   - ❌ Multi-language (per anksti, fokusuotis į LT rinką)
   - ❌ Advanced gamification (per anksti, pirmiausia stabilumas)

2. **Daryti dabar:**
   - ✅ Stabilumas ir kokybė
   - ✅ SEO (svarbu paieškos matomumui)
   - ✅ Monitoring (svarbu suprasti, kas neveikia)

3. **Planuoti ateičiai:**
   - 🔮 DI grįžtamasis ryšys (kai bus pakankamai vartotojų)
   - 🔮 Backend (kai bus scalability poreikis)
   - 🔮 Multi-language (kai bus tarptautinė plėtra)

---

## 📝 Pastabos

### Realistinis laiko įvertinimas

- **Fazė 1 (3 mėnesiai):** ~80 valandų darbo
  - Jei dirbate 10h/savaitę: ~8 savaitės
  - Jei dirbate 20h/savaitę: ~4 savaitės

- **Fazė 2 (4 mėnesiai):** ~100 valandų darbo
  - Jei dirbate 10h/savaitę: ~10 savaičių
  - Jei dirbate 20h/savaitę: ~5 savaitės

- **Fazė 3 (6 mėnesių):** ~150 valandų darbo
  - Jei dirbate 10h/savaitę: ~15 savaičių
  - Jei dirbate 20h/savaitę: ~7.5 savaitės

**Iš viso:** ~330 valandų darbo per 13 mėnesių

### Kritinės pastabos

1. **Nepamirškite testuoti kiekvieną pakeitimą**
   - Prieš deploy, testuokite lokaliai
   - Naudokite preview build
   - Testuokite skirtingose naršyklėse

2. **Backup strategija**
   - Prieš didesnius pakeitimus, sukurkite backup
   - Naudokite git branches
   - Testuokite staging aplinkoje

3. **Dokumentacija**
   - Dokumentuokite kiekvieną didesnį pakeitimą
   - Atnaujinkite README.md
   - Pridėkite komentarus sudėtingesnėse vietose

4. **User feedback**
   - Rinkite vartotojų atsiliepimus
   - Stebėkite analytics
   - Iteruokite pagal duomenis

---

## 🔄 Roadmap Atnaujinimas

Šis roadmap turėtų būti atnaujinamas:
- **Kas mėnesį:** Peržiūrėti prioritetus
- **Po kiekvieno didesnio release:** Atnaujinti progresą
- **Kas ketvirtį:** Peržiūrėti ilgalaikę strategiją

**Paskutinis atnaujinimas:** 2026-02-01  
**Kitas peržiūrėjimas:** 2026-03-01

---

<div align="center">

**Prompt Anatomija** - Realistinis Plėtros Planas

*Sukurta 2026-02-01 | Versija 2.0.0*

</div>
