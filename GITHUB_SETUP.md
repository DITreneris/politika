# GitHub Publikavimo Instrukcijos

## 1. Pirmas kartas - Inicializacija

Jei dar neturite git repozitorijos:

```bash
# Inicializuokite git
git init

# Pridėkite visus failus
git add .

# Sukurkite pirmą commit
git commit -m "Initial commit: Prompt Anatomija mokymo aplikacija"

# Pridėkite remote repozitoriją
git remote add origin https://github.com/DITreneris/anatomija.git

# Push į GitHub
git branch -M main
git push -u origin main
```

## 2. GitHub Pages Setup

### Automatinis deployment (rekomenduojama)

1. Eikite į GitHub repozitoriją: https://github.com/DITreneris/anatomija
2. Eikite į **Settings** > **Pages**
3. **Source**: pasirinkite **"GitHub Actions"**
4. Dabar kiekvienas push į `main` branch automatiškai sukurs deployment

### Rankinis deployment

```bash
# Build aplikacijos
npm run build

# Įkelkite dist/ katalogą į GitHub Pages
# Naudokite gh-pages branch arba GitHub Actions
```

## 3. GitHub Actions Workflow

Jau sukurtas `.github/workflows/deploy.yml` failas, kuris automatiškai:
- Build aplikaciją kiekvienam push į `main`
- Deploy į GitHub Pages

## 4. Patikrinkite Base Path

Base path yra nustatytas kaip `/anatomija/` `vite.config.ts` faile.
Jei keičiate repozitorijos pavadinimą, pakeiskite base path.

## 5. Prieiga prie aplikacijos

Po deployment aplikacija bus prieinama:
- **GitHub Pages**: `https://ditreneris.github.io/anatomija/`
- **Development**: `http://localhost:3000`

## 6. Troubleshooting

### Jei aplikacija neveikia GitHub Pages:

1. Patikrinkite ar base path yra teisingas
2. Patikrinkite ar build sėkmingas: `npm run build`
3. Patikrinkite GitHub Actions logs

### Jei CSS neveikia:

1. Patikrinkite ar `dist/` kataloge yra visi failai
2. Patikrinkite ar base path yra teisingas

## 7. Kiti žingsniai

- Pridėkite README.md su aprašymu
- Pridėkite screenshots
- Nustatykite repozitorijos aprašymą GitHub
