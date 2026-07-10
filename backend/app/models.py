from __future__ import annotations

import re
from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

EMAIL_RE = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$")
PHONE_RE = re.compile(r"^[0-9+()\-\s.]{6,30}$")


def to_camel(value: str) -> str:
    head, *tail = value.split("_")
    return head + "".join(part.capitalize() for part in tail)


class APIModel(BaseModel):
    model_config = ConfigDict(alias_generator=to_camel, populate_by_name=True, str_strip_whitespace=True)


class OrderItemInput(APIModel):
    product_id: str = Field(min_length=3, max_length=80)
    quantity: int = Field(ge=1, le=20)


class OrderCreate(APIModel):
    customer_name: str = Field(min_length=2, max_length=100)
    email: str = Field(min_length=5, max_length=254)
    phone: str = Field(min_length=6, max_length=30)
    fulfillment: Literal["pickup", "delivery"]
    address: str | None = Field(default=None, max_length=200)
    delivery_date: date
    note: str | None = Field(default=None, max_length=500)
    locale: Literal["en", "ru"] = "en"
    items: list[OrderItemInput] = Field(min_length=1, max_length=30)

    @field_validator("email")
    @classmethod
    def valid_email(cls, value: str) -> str:
        value = value.lower()
        if not EMAIL_RE.fullmatch(value):
            raise ValueError("Enter a valid email address")
        return value

    @field_validator("phone")
    @classmethod
    def valid_phone(cls, value: str) -> str:
        if not PHONE_RE.fullmatch(value):
            raise ValueError("Enter a valid phone number")
        return value

    @field_validator("delivery_date")
    @classmethod
    def future_delivery_date(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("Delivery date cannot be in the past")
        return value

    @model_validator(mode="after")
    def delivery_requires_address(self) -> "OrderCreate":
        if self.fulfillment == "delivery" and not self.address:
            raise ValueError("Address is required for delivery")
        return self


class OrderLine(APIModel):
    product_id: str
    slug: str
    name: dict[str, str]
    quantity: int
    unit_price_cents: int
    line_total_cents: int


class OrderResponse(APIModel):
    order_id: str
    status: str
    currency: str = "EUR"
    subtotal_cents: int
    delivery_fee_cents: int
    total_cents: int
    fulfillment: str
    delivery_date: date
    items: list[OrderLine]
    created_at: datetime


class OrderLookupResponse(OrderResponse):
    customer_name: str
    email: str
    phone: str
    address: str | None = None
    note: str | None = None


class NewsletterCreate(APIModel):
    email: str = Field(min_length=5, max_length=254)
    locale: Literal["en", "ru"] = "en"

    @field_validator("email")
    @classmethod
    def valid_email(cls, value: str) -> str:
        value = value.lower()
        if not EMAIL_RE.fullmatch(value):
            raise ValueError("Enter a valid email address")
        return value


class NewsletterResponse(APIModel):
    subscribed: bool = True


class StatusUpdate(APIModel):
    status: Literal["pending", "confirmed", "preparing", "ready", "completed", "cancelled"]


class HealthResponse(APIModel):
    status: str
    service: str
    environment: str
