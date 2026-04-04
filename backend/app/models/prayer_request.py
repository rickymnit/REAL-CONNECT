import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base


class PrayerRequest(Base):
    __tablename__ = "prayer_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=True)  # Optional for anonymous
    email = Column(String(255), nullable=True)
    request = Column(Text, nullable=False)
    is_private = Column(Boolean, default=False, nullable=False)  # If true, only visible to leadership
    is_prayed_for = Column(Boolean, default=False, nullable=False)
    prayed_for_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    def __repr__(self):
        return f"<PrayerRequest {self.id}>"
