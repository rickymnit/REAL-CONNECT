from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID


class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    event_type: str = "special"
    start_time: datetime
    end_time: Optional[datetime] = None
    location: str
    location_url: Optional[str] = None
    is_recurring: bool = False
    recurrence_pattern: Optional[str] = None
    recurrence_day: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = True


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    event_type: Optional[str] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    location: Optional[str] = None
    location_url: Optional[str] = None
    is_recurring: Optional[bool] = None
    recurrence_pattern: Optional[str] = None
    recurrence_day: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None


class Event(EventBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class EventList(BaseModel):
    items: list[Event]
    total: int
    page: int
    page_size: int
