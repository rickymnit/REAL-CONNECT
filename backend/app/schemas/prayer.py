from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID


class PrayerRequestBase(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    request: str
    is_private: bool = False


class PrayerRequestCreate(PrayerRequestBase):
    pass


class PrayerRequest(PrayerRequestBase):
    id: UUID
    is_prayed_for: bool
    prayed_for_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
