from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime
from uuid import UUID


class SermonBase(BaseModel):
    title: str
    description: Optional[str] = None
    video_url: str
    thumbnail_url: Optional[str] = None
    speaker: str
    series: Optional[str] = None
    category: Optional[str] = None
    duration_seconds: Optional[int] = None
    is_published: bool = True


class SermonCreate(SermonBase):
    pass


class SermonUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    video_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    speaker: Optional[str] = None
    series: Optional[str] = None
    category: Optional[str] = None
    duration_seconds: Optional[int] = None
    is_published: Optional[bool] = None


class Sermon(SermonBase):
    id: UUID
    published_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class SermonList(BaseModel):
    items: list[Sermon]
    total: int
    page: int
    page_size: int
