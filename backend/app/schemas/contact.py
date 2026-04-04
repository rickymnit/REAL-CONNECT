from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID


class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str


class ContactMessageCreate(ContactMessageBase):
    pass


class ContactMessage(ContactMessageBase):
    id: UUID
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
