# Security notes

This repository is a production-oriented starter, not a payment processor.

Before accepting live orders:

1. Replace the demo checkout with a hosted payment flow from a PCI-compliant provider.
2. Store `ADMIN_API_KEY` in a secret manager and rotate it regularly.
3. Restrict `CORS_ORIGINS` and `ALLOWED_HOSTS` to real production domains.
4. Put the API behind TLS, a reverse proxy and infrastructure-level rate limiting.
5. Add transactional email, backups, monitoring, structured logs and a privacy policy appropriate to your jurisdiction.
6. Migrate from SQLite to a managed relational database if you run multiple API replicas.

Never commit `.env` or a production database.
