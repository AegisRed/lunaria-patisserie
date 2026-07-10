from __future__ import annotations

import importlib
import os
from datetime import date, timedelta

from fastapi.testclient import TestClient


def make_client(tmp_path):
    os.environ["DATABASE_PATH"] = str(tmp_path / "test.sqlite3")
    os.environ["ALLOWED_HOSTS"] = "testserver,localhost,127.0.0.1"
    os.environ["ADMIN_API_KEY"] = "test-admin-key"
    import app.config as config
    import app.main as main
    importlib.reload(config)
    importlib.reload(main)
    return TestClient(main.app)


def valid_order():
    return {
        "customerName": "Ada Lovelace",
        "email": "ada@example.com",
        "phone": "+41 22 555 01 77",
        "fulfillment": "delivery",
        "address": "17 Rue des Étoiles, Genève",
        "deliveryDate": (date.today() + timedelta(days=2)).isoformat(),
        "note": "Leave the stars intact.",
        "locale": "en",
        "items": [
            {"productId": "prd_moonberry_tart", "quantity": 2},
            {"productId": "prd_citrus_orbit", "quantity": 1},
        ],
    }


def test_health_and_catalog(tmp_path):
    with make_client(tmp_path) as client:
        assert client.get("/health").json()["status"] == "ok"
        response = client.get("/api/v1/products?featured=true")
        assert response.status_code == 200
        assert response.json()["count"] >= 1


def test_order_total_is_calculated_server_side(tmp_path):
    with make_client(tmp_path) as client:
        response = client.post("/api/v1/orders", json=valid_order(), headers={"Idempotency-Key": "order-1"})
        assert response.status_code == 201
        body = response.json()
        assert body["subtotalCents"] == 1400 * 2 + 1050
        assert body["deliveryFeeCents"] == 800
        assert body["totalCents"] == 4650
        assert body["orderId"].startswith("LUN-")

        repeated = client.post("/api/v1/orders", json=valid_order(), headers={"Idempotency-Key": "order-1"})
        assert repeated.status_code == 200
        assert repeated.json()["orderId"] == body["orderId"]


def test_delivery_requires_address(tmp_path):
    payload = valid_order()
    payload["address"] = ""
    with make_client(tmp_path) as client:
        response = client.post("/api/v1/orders", json=payload)
        assert response.status_code == 422


def test_lookup_and_admin_status_update(tmp_path):
    with make_client(tmp_path) as client:
        created = client.post("/api/v1/orders", json=valid_order()).json()
        order_id = created["orderId"]
        lookup = client.get(f"/api/v1/orders/{order_id}?email=ada@example.com")
        assert lookup.status_code == 200
        assert lookup.json()["customerName"] == "Ada Lovelace"

        unauthorised = client.get("/api/v1/admin/orders")
        assert unauthorised.status_code == 401
        updated = client.patch(
            f"/api/v1/admin/orders/{order_id}/status",
            json={"status": "confirmed"},
            headers={"X-Admin-Key": "test-admin-key"},
        )
        assert updated.status_code == 200
        assert updated.json()["status"] == "confirmed"


def test_newsletter_is_idempotent(tmp_path):
    with make_client(tmp_path) as client:
        first = client.post("/api/v1/newsletter", json={"email": "night@example.com", "locale": "en"})
        second = client.post("/api/v1/newsletter", json={"email": "night@example.com", "locale": "ru"})
        assert first.status_code == 201
        assert second.status_code == 201
