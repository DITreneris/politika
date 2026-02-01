# Greitas Startas - GitHub Publikavimas

## 1. Pirmas kartas

```bash
# Jei dar neturite git repozitorijos
git init
git add .
git commit -m "Initial commit: Prompt Anatomija"

# Pridėkite remote
git remote add origin https://github.com/DITreneris/anatomija.git
git branch -M main
git push -u origin main
```

## 2. GitHub Pages Setup

1. Eikite į: https://github.com/DITreneris/anatomija/settings/pages
2. **Source**: pasirinkite **"GitHub Actions"**
3. Išsaugokite

## 3. Automatinis Deployment

Kiekvienas push į `main` branch automatiškai:
- Build aplikaciją
- Deploy į GitHub Pages

## 4. Prieiga

Po deployment aplikacija bus prieinama:
**https://ditreneris.github.io/anatomija/**

## 5. Lokalus testavimas

```bash
npm install
npm run dev
# Atidarykite http://localhost:3000
```

## 6. Build testavimas

```bash
npm run build
npm run preview
# Patikrinkite ar viskas veikia prieš push
```

## Troubleshooting

- Jei CSS neveikia: patikrinkite ar base path yra `/anatomija/` vite.config.ts
- Jei build klaida: patikrinkite ar visi dependencies įdiegti
- Jei GitHub Actions klaida: patikrinkite Actions tab GitHub repozitorijoje
