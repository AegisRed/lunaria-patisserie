from __future__ import annotations

import hmac
import json
import secrets
import sqlite3
import time
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from uuid import uuid4

from fastapi import Depends, FastAPI, Header, HTTPException, Query, Request, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

from .config import settings
from .database import Database, decode_items
from .models import (
    HealthResponse,
    NewsletterCreate,
    NewsletterResponse,
    OrderCreate,
    OrderLine,
    OrderLookupResponse,
    OrderResponse,
    StatusUpdate,
)


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def load_catalog(path: Path) -> list[dict[str, Any]]:
    with path.open("r", encoding="utf-8") as handle:
        catalog = json.load(handle)
    if not isinstance(catalog, list) or not catalog:
        raise RuntimeError("Catalog must contain at least one product")
    return catalog


catalog = load_catalog(settings.catalog_path)
catalog_by_id = {product["id"]: product for product in catalog}
database = Database(settings.database_path)


class SlidingWindowLimiter:
    def __init__(self, limit: int, window_seconds: int = 60):
        self.limit = max(1, limit)
        self.window = window_seconds
        self.events: dict[str, deque[float]] = defaultdict(deque)

    def allow(self, key: str) -> bool:
        now = time.monotonic()
        queue = self.events[key]
        while queue and queue[0] <= now - self.window:
            queue.popleft()
        if len(queue) >= self.limit:
            return False
        queue.append(now)
        return True


order_limiter = SlidingWindowLimiter(settings.order_rate_limit_per_minute)


@asynccontextmanager
async def lifespan(_: FastAPI):
    database.init_schema()
    yield


app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    docs_url="/docs" if settings.docs_enabled else None,
    redoc_url="/redoc" if settings.docs_enabled else None,
    openapi_url="/openapi.json" if settings.docs_enabled else None,
    lifespan=lifespan,
)

if settings.allowed_hosts:
    app.add_middleware(TrustedHostMiddleware, allowed_hosts=list(settings.allowed_hosts))
app.add_middleware(
    CORSMiddleware,
    allow_origins=list(settings.cors_origins),
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["Content-Type", "Accept-Language", "Idempotency-Key", "X-Admin-Key"],
    expose_headers=["X-Request-ID"],
)


@app.middleware("http")
async def security_and_request_id(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID") or secrets.token_hex(10)
    response: Response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Cache-Control"] = "no-store" if request.url.path.startswith("/api/v1/orders") else "public, max-age=60"
    return response


def client_key(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
    return forwarded or (request.client.host if request.client else "unknown")


def require_admin(x_admin_key: str = Header(default="")) -> None:
    if not settings.admin_api_key or not hmac.compare_digest(x_admin_key, settings.admin_api_key):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin API key")


def public_order_response(row: sqlite3.Row) -> OrderResponse:
    return OrderResponse(
        order_id=row["public_id"],
        status=row["status"],
        currency=row["currency"],
        subtotal_cents=row["subtotal_cents"],
        delivery_fee_cents=row["delivery_fee_cents"],
        total_cents=row["total_cents"],
        fulfillment=row["fulfillment"],
        delivery_date=row["delivery_date"],
        items=decode_items(row),
        created_at=row["created_at"],
    )


def private_order_response(row: sqlite3.Row) -> OrderLookupResponse:
    base = public_order_response(row).model_dump()
    return OrderLookupResponse(
        **base,
        customer_name=row["customer_name"],
        email=row["email"],
        phone=row["phone"],
        address=row["address"],
        note=row["note"],
    )


@app.get("/", include_in_schema=False)
def root() -> dict[str, str]:
    return {"service": settings.app_name, "health": "/health", "api": "/api/v1"}


@app.get("/health", response_model=HealthResponse, tags=["system"])
def health() -> HealthResponse:
    return HealthResponse(status="ok", service=settings.app_name, environment=settings.app_env)


@app.get("/api/v1/products", tags=["catalog"])
def get_products(
    category: str | None = Query(default=None, max_length=40),
    search: str | None = Query(default=None, max_length=80),
    featured: bool | None = None,
) -> dict[str, Any]:
    items = catalog
    if category:
        items = [item for item in items if item["category"] == category or category in item.get("tags", [])]
    if search:
        needle = search.casefold()
        items = [item for item in items if needle in json.dumps(item, ensure_ascii=False).casefold()]
    if featured is not None:
        items = [item for item in items if bool(item.get("featured")) is featured]
    return {"items": items, "count": len(items), "currency": "EUR"}


@app.get("/api/v1/products/{slug}", tags=["catalog"])
def get_product(slug: str) -> dict[str, Any]:
    product = next((item for item in catalog if item["slug"] == slug), None)
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@app.post("/api/v1/orders", response_model=OrderResponse, status_code=status.HTTP_201_CREATED, tags=["orders"])
def create_order(
    payload: OrderCreate,
    request: Request,
    response: Response,
    idempotency_key: str | None = Header(default=None, alias="Idempotency-Key", max_length=120),
) -> OrderResponse:
    if not order_limiter.allow(client_key(request)):
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many order attempts. Try again shortly.")

    if idempotency_key:
        existing = database.find_by_idempotency_key(idempotency_key)
        if existing:
            response.status_code = status.HTTP_200_OK
            return public_order_response(existing)

    combined: dict[str, int] = defaultdict(int)
    for item in payload.items:
        combined[item.product_id] += item.quantity

    lines: list[OrderLine] = []
    subtotal = 0
    for product_id, quantity in combined.items():
        product = catalog_by_id.get(product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=f"Unknown product: {product_id}")
        if quantity > min(int(product.get("stock", 0)), 20):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Not enough stock for {product['slug']}")
        line_total = product["priceCents"] * quantity
        subtotal += line_total
        lines.append(OrderLine(
            product_id=product["id"], slug=product["slug"], name=product["name"], quantity=quantity,
            unit_price_cents=product["priceCents"], line_total_cents=line_total,
        ))

    delivery_fee = settings.delivery_fee_cents if payload.fulfillment == "delivery" else 0
    now = utc_now()
    public_id = f"LUN-{now.year}-{uuid4().hex[:8].upper()}"
    values = {
        "public_id": public_id,
        "idempotency_key": idempotency_key,
        "status": "pending",
        "customer_name": payload.customer_name,
        "email": payload.email,
        "phone": payload.phone,
        "fulfillment": payload.fulfillment,
        "address": payload.address,
        "delivery_date": payload.delivery_date.isoformat(),
        "note": payload.note,
        "locale": payload.locale,
        "currency": "EUR",
        "subtotal_cents": subtotal,
        "delivery_fee_cents": delivery_fee,
        "total_cents": subtotal + delivery_fee,
        "items_json": json.dumps([line.model_dump(by_alias=True) for line in lines], ensure_ascii=False),
        "created_at": now.isoformat(),
        "updated_at": now.isoformat(),
    }
    try:
        row = database.create_order(values)
    except sqlite3.IntegrityError:
        if idempotency_key and (existing := database.find_by_idempotency_key(idempotency_key)):
            response.status_code = status.HTTP_200_OK
            return public_order_response(existing)
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Order could not be created")
    return public_order_response(row)


@app.get("/api/v1/orders/{order_id}", response_model=OrderLookupResponse, tags=["orders"])
def lookup_order(order_id: str, email: str = Query(min_length=5, max_length=254)) -> OrderLookupResponse:
    row = database.get_order(order_id, email)
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return private_order_response(row)


@app.post("/api/v1/newsletter", response_model=NewsletterResponse, status_code=status.HTTP_201_CREATED, tags=["marketing"])
def subscribe_newsletter(payload: NewsletterCreate) -> NewsletterResponse:
    database.subscribe(payload.email, payload.locale, utc_now().isoformat())
    return NewsletterResponse(subscribed=True)


@app.get("/api/v1/admin/orders", response_model=list[OrderLookupResponse], dependencies=[Depends(require_admin)], tags=["admin"])
def admin_orders(limit: int = Query(default=50, ge=1, le=200), offset: int = Query(default=0, ge=0)) -> list[OrderLookupResponse]:
    return [private_order_response(row) for row in database.list_orders(limit, offset)]


@app.patch("/api/v1/admin/orders/{order_id}/status", response_model=OrderLookupResponse, dependencies=[Depends(require_admin)], tags=["admin"])
def update_order_status(order_id: str, payload: StatusUpdate) -> OrderLookupResponse:
    row = database.update_status(order_id, payload.status, utc_now().isoformat())
    if not row:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Order not found")
    return private_order_response(row)
