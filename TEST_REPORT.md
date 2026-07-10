# Verification report

The release archive was verified before packaging.

## Automated checks

- `npm test` completed successfully.
- JavaScript syntax checks passed for the storefront and service worker.
- All local HTML asset references were resolved.
- The dependency-free production build was generated into both `frontend/dist` and `docs`.
- `pytest` completed with **5 passed** API tests.
- Python modules compile successfully.
- YAML files parse successfully.

## Browser smoke checks

Desktop viewport: **1440 × 1100**

- Catalog loaded all 12 products.
- No horizontal overflow.
- No browser console or page errors.
- Full-page layout was visually reviewed.

Mobile viewport: **390 × 844**

- No horizontal overflow after responsive fixes.
- EN → RU → EN language switching worked.
- Catalog search reduced and restored results correctly.
- Product quick view opened.
- Add-to-cart, cart drawer and quantity state worked.
- Demo checkout accepted valid data and returned an order reference.
- Cart cleared after successful order creation.
- No browser console or page errors.

## Live API smoke checks

A real Uvicorn process was started and checked through HTTP:

- `GET /health` returned `ok`.
- `GET /api/v1/products?featured=true` returned 6 featured products.
- `POST /api/v1/orders` created an order and returned the server-calculated total.
