from pydantic import BaseModel, Field, validator
from typing import Optional, Dict, Any
from datetime import datetime
from decimal import Decimal


class CustomerData(BaseModel):
    email: str
    name: str


class ProductData(BaseModel):
    id: str
    name: str
    price: Decimal = Field(decimal_places=2)


class AffiliateData(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None
    commission: Optional[Decimal] = Field(None, decimal_places=2)


class PaymentData(BaseModel):
    method: str
    transaction_id: str
    status: str


class WebhookData(BaseModel):
    sale_id: str
    customer: CustomerData
    product: ProductData
    affiliate: Optional[AffiliateData] = None
    payment: PaymentData
    created_at: datetime


class CartPandaWebhook(BaseModel):
    id: str
    type: str
    data: WebhookData


class SaleCreate(BaseModel):
    cartpanda_id: str
    customer_email: str
    customer_name: str
    product_name: str
    product_id: str
    price: Decimal
    currency: str = "BRL"
    status: str
    affiliate_code: Optional[str] = None
    affiliate_name: Optional[str] = None
    commission_value: Optional[Decimal] = None
    payment_method: str
    transaction_id: str
    metadata: Optional[Dict[str, Any]] = None

    @validator('price', 'commission_value', pre=True)
    def validate_decimal(cls, v):
        if v is not None:
            return Decimal(str(v))
        return v


class SaleResponse(SaleCreate):
    id: str
    webhook_received_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True