# Lunaria Atelier

A complete bilingual confectionery storefront with a dependency-free frontend, a FastAPI backend, SQLite order storage, Docker deployment and a ready-to-publish GitHub Pages build.

## What is included

- Responsive EN/RU storefront with a luxury nocturnal visual system.
- Product catalog, categories, search, sorting and quick-view dialogs.
- One catalog source (`frontend/src/data/products.json`), synchronized to the API during every frontend build.
- Persistent cart, quantity controls, gift box flow and checkout validation.
- Static demo checkout for GitHub Pages, stored locally in the browser.
- FastAPI catalog, order, order lookup, newsletter and protected admin endpoints.
- Server-authoritative price calculation, stock validation, idempotency keys and rate limiting.
- SQLite persistence with WAL mode and transactional writes.
- PWA manifest, service worker, SEO metadata, JSON-LD, sitemap and robots file.
- Docker Compose deployment through Nginx with same-origin API proxying.
- Frontend static checks, backend API tests, CI and GitHub Pages workflows.

## Preview

![Desktop storefront](preview/desktop.png)

The mobile composition is available in `preview/mobile.png`.

## Project structure

```text
frontend/src/       Editable storefront source
frontend/dist/      Prebuilt production storefront
backend/app/        FastAPI application and product catalog
backend/tests/      API tests
docs/               Prebuilt GitHub Pages copy
deploy/             Nginx and runtime frontend configuration
.github/workflows/  CI and Pages deployment
```

## Preview the static storefront

```bash
cd frontend/dist
python -m http.server 8080
```

Open `http://localhost:8080`. The static build runs in demo mode and does not require the backend.

## Run the API locally

```bash
cd backend
python -m venv .venv
# Linux/macOS: source .venv/bin/activate
# Windows: .venv\Scripts\activate
pip install -r requirements-dev.txt
python run.py
```

API documentation is available at `http://localhost:8000/docs` in development mode.

To connect the frontend to a separately deployed API, edit `frontend/src/config.js`:

```js
window.LUNARIA_CONFIG = Object.freeze({
  apiBase: 'https://api.example.com/api/v1',
  storeMode: 'api',
  currency: 'EUR',
  deliveryFeeCents: 800,
});
```

Then rebuild:

```bash
cd frontend
npm run build
```

## Run the complete stack with Docker

```bash
cp .env.example .env
# Replace ADMIN_API_KEY in .env
make build
docker compose up --build
```

Open `http://localhost:8080`. Nginx serves the frontend and proxies `/api/*` to FastAPI.

## GitHub Pages

The repository contains two supported options:

1. Push to `main` and enable **Settings → Pages → Source: GitHub Actions**. The included workflow publishes `frontend/dist`.
2. Choose **Deploy from a branch**, select `main`, and use the `/docs` folder.

The Pages build intentionally uses demo checkout because GitHub Pages cannot execute a backend. To accept real orders, deploy the API separately and set its public URL in `config.js` before building.

Replace the placeholder URL in `frontend/src/robots.txt` and `frontend/src/sitemap.xml` with your real Pages or custom-domain URL.

## API examples

Create an order:

```bash
curl -X POST http://localhost:8000/api/v1/orders \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: example-order-001' \
  -d '{
    "customerName":"Ada Lovelace",
    "email":"ada@example.com",
    "phone":"+41 22 555 01 77",
    "fulfillment":"pickup",
    "deliveryDate":"2026-07-15",
    "locale":"en",
    "items":[{"productId":"prd_moonberry_tart","quantity":2}]
  }'
```

List orders as an administrator:

```bash
curl http://localhost:8000/api/v1/admin/orders \
  -H "X-Admin-Key: $ADMIN_API_KEY"
```

## Tests

```bash
make test
```

The test suite checks local asset references, JavaScript syntax, production build output, API catalog behaviour, server-side totals, idempotency, delivery validation, protected admin access and newsletter subscription.

## Production checklist

The code is ready as a deployable starter, but a real shop still needs business-specific integrations. Before going live, connect a hosted payment provider, transactional email, analytics with consent, tax rules, delivery zones, inventory management, backups and legal pages. Read `SECURITY.md` before exposing the API publicly.
