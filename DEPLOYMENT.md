# Deployment Instrukcijos

## GitHub Pages

### Automatinis deployment (rekomenduojama)

1. Eikite į GitHub repozitorijos Settings
2. Pasirinkite "Pages" sekciją
3. Source: pasirinkite "GitHub Actions"
4. Push į `main` branch automatiškai sukurs deployment

### Rankinis deployment

```bash
# Build aplikacijos
npm run build

# Įkelkite dist/ katalogą į GitHub Pages
# Naudokite gh-pages branch arba GitHub Actions
```

## Vercel

```bash
npm install -g vercel
vercel
```

## Netlify

1. Eikite į Netlify
2. Pasirinkite "Add new site" > "Import an existing project"
3. Pasirinkite GitHub repozitoriją
4. Build command: `npm run build`
5. Publish directory: `dist`

## Lokalus testavimas

```bash
npm run build
npm run preview
```

## Pastabos

- Base path yra `/prompt-anatomy-training/` produkcijoje
- Jei naudojate kitą base path, pakeiskite `vite.config.ts` base parametrą
