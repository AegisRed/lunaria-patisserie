from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator


class Database:
    def __init__(self, path: Path):
        self.path = path

    @contextmanager
    def connect(self) -> Iterator[sqlite3.Connection]:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        connection = sqlite3.connect(self.path, timeout=15, isolation_level=None)
        connection.row_factory = sqlite3.Row
        connection.execute("PRAGMA journal_mode=WAL")
        connection.execute("PRAGMA foreign_keys=ON")
        connection.execute("PRAGMA busy_timeout=5000")
        try:
            yield connection
        finally:
            connection.close()

    def init_schema(self) -> None:
        with self.connect() as connection:
            connection.executescript(
                """
                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    public_id TEXT NOT NULL UNIQUE,
                    idempotency_key TEXT UNIQUE,
                    status TEXT NOT NULL DEFAULT 'pending',
                    customer_name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    phone TEXT NOT NULL,
                    fulfillment TEXT NOT NULL,
                    address TEXT,
                    delivery_date TEXT NOT NULL,
                    note TEXT,
                    locale TEXT NOT NULL,
                    currency TEXT NOT NULL DEFAULT 'EUR',
                    subtotal_cents INTEGER NOT NULL,
                    delivery_fee_cents INTEGER NOT NULL,
                    total_cents INTEGER NOT NULL,
                    items_json TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                );
                CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
                CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
                CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT NOT NULL UNIQUE,
                    locale TEXT NOT NULL,
                    created_at TEXT NOT NULL
                );
                """
            )

    def find_by_idempotency_key(self, key: str) -> sqlite3.Row | None:
        with self.connect() as connection:
            return connection.execute("SELECT * FROM orders WHERE idempotency_key = ?", (key,)).fetchone()

    def create_order(self, values: dict[str, Any]) -> sqlite3.Row:
        columns = ", ".join(values.keys())
        placeholders = ", ".join("?" for _ in values)
        with self.connect() as connection:
            connection.execute("BEGIN IMMEDIATE")
            try:
                connection.execute(
                    f"INSERT INTO orders ({columns}) VALUES ({placeholders})",
                    tuple(values.values()),
                )
                row = connection.execute("SELECT * FROM orders WHERE public_id = ?", (values["public_id"],)).fetchone()
                connection.execute("COMMIT")
                if row is None:
                    raise RuntimeError("Created order could not be read back")
                return row
            except Exception:
                connection.execute("ROLLBACK")
                raise

    def get_order(self, public_id: str, email: str | None = None) -> sqlite3.Row | None:
        with self.connect() as connection:
            if email:
                return connection.execute("SELECT * FROM orders WHERE public_id = ? AND email = ?", (public_id, email.lower())).fetchone()
            return connection.execute("SELECT * FROM orders WHERE public_id = ?", (public_id,)).fetchone()

    def list_orders(self, limit: int = 50, offset: int = 0) -> list[sqlite3.Row]:
        with self.connect() as connection:
            return list(connection.execute("SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?", (limit, offset)).fetchall())

    def update_status(self, public_id: str, status: str, updated_at: str) -> sqlite3.Row | None:
        with self.connect() as connection:
            connection.execute("UPDATE orders SET status = ?, updated_at = ? WHERE public_id = ?", (status, updated_at, public_id))
            return connection.execute("SELECT * FROM orders WHERE public_id = ?", (public_id,)).fetchone()

    def subscribe(self, email: str, locale: str, created_at: str) -> None:
        with self.connect() as connection:
            connection.execute(
                """INSERT INTO newsletter_subscribers (email, locale, created_at)
                   VALUES (?, ?, ?)
                   ON CONFLICT(email) DO UPDATE SET locale = excluded.locale""",
                (email.lower(), locale, created_at),
            )


def decode_items(row: sqlite3.Row) -> list[dict[str, Any]]:
    return json.loads(row["items_json"])
