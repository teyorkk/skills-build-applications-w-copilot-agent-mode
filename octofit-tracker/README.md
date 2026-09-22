# OctoFit Tracker

## Tiers

- Frontend: React 19 + Vite on port `5173`
- Backend: Node.js + Express + TypeScript on port `8000`
- Database: MongoDB on port `27017`, database `octofit_db`

## Install dependencies

```bash
npm install --prefix octofit-tracker/frontend
npm install --prefix octofit-tracker/backend
```

Seed MongoDB after starting a local MongoDB service:

```bash
npm run seed --prefix octofit-tracker/backend
```

## Run

```bash
npm run dev --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/backend
```
