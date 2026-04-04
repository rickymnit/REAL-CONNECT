from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID


class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    social_links: Optional[str] = None
    order: int = 0
    is_active: bool = True


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    image_url: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    social_links: Optional[str] = None
    order: Optional[int] = None
    is_active: Optional[bool] = None


class TeamMember(TeamMemberBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
