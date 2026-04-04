import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, Boolean, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import UUID
import enum
from app.core.database import Base


class EventType(str, enum.Enum):
    SERVICE = "service"
    CONNECT_GROUP = "connect_group"
    SPECIAL = "special"
    OUTREACH = "outreach"


class RecurrencePattern(str, enum.Enum):
    WEEKLY = "weekly"
    BIWEEKLY = "biweekly"
    MONTHLY = "monthly"


class Event(Base):
    __tablename__ = "events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    event_type = Column(SQLEnum(EventType), default=EventType.SPECIAL, nullable=False)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=True)
    location = Column(String(500), nullable=False)
    location_url = Column(String(500), nullable=True)  # Google Maps link
    is_recurring = Column(Boolean, default=False, nullable=False)
    recurrence_pattern = Column(SQLEnum(RecurrencePattern), nullable=True)
    recurrence_day = Column(String(20), nullable=True)  # e.g., "Sunday", "Wednesday"
    image_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<Event {self.title}>"
