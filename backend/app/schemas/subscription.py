from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID


class SubscriptionBase(BaseModel):
    email: EmailStr
    name: Optional[str] = None


class SubscriptionCreate(SubscriptionBase):
    pass


class Subscription(SubscriptionBase):
    id: UUID
    is_active: bool
    subscribed_at: datetime

    class Config:
        from_attributes = True
