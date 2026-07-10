from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


def _csv_env(name: str, default: str = "") -> tuple[str, ...]:
    return tuple(value.strip() for value in os.getenv(name, default).split(",") if value.strip())


@dataclass(frozen=True, slots=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "Lunaria Atelier API")
    app_env: str = os.getenv("APP_ENV", "development")
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", "8000"))
    database_path: Path = Path(os.getenv("DATABASE_PATH", str(BASE_DIR / "data" / "lunaria.sqlite3")))
    catalog_path: Path = Path(os.getenv("CATALOG_PATH", str(Path(__file__).resolve().parent / "catalog.json")))
    cors_origins: tuple[str, ...] = _csv_env("CORS_ORIGINS", "http://localhost:8080,http://127.0.0.1:8080")
    allowed_hosts: tuple[str, ...] = _csv_env("ALLOWED_HOSTS", "localhost,127.0.0.1,testserver")
    admin_api_key: str = os.getenv("ADMIN_API_KEY", "")
    delivery_fee_cents: int = int(os.getenv("DELIVERY_FEE_CENTS", "800"))
    order_rate_limit_per_minute: int = int(os.getenv("ORDER_RATE_LIMIT_PER_MINUTE", "12"))
    docs_enabled: bool = os.getenv("DOCS_ENABLED", "true").lower() in {"1", "true", "yes", "on"}


settings = Settings()
