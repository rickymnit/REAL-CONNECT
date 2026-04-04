from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from datetime import datetime, timezone
from typing import Optional, List
from uuid import UUID

from app.core.database import get_db
from app.models.event import Event, EventType
from app.schemas.event import Event as EventSchema, EventList

router = APIRouter()


@router.get("/", response_model=EventList)
def list_events(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    event_type: Optional[str] = None,
    upcoming: bool = Query(True, description="Only show upcoming events"),
    db: Session = Depends(get_db),
):
    """List events with optional filters."""
    query = db.query(Event).filter(Event.is_active == True)
    
    if event_type:
        query = query.filter(Event.event_type == event_type)
    
    if upcoming:
        query = query.filter(Event.start_time >= datetime.now(timezone.utc))
    
    total = query.count()
    events = query.order_by(Event.start_time.asc()).offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "items": events,
        "total": total,
        "page": page,
        "page_size": page_size,
    }


@router.get("/{event_id}", response_model=EventSchema)
def get_event(event_id: UUID, db: Session = Depends(get_db)):
    """Get a single event by ID."""
    event = db.query(Event).filter(Event.id == event_id, Event.is_active == True).first()
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    return event


@router.get("/weekly/schedule")
def get_weekly_schedule(db: Session = Depends(get_db)):
    """Get recurring weekly events (Sunday service, connect groups)."""
    events = db.query(Event).filter(
        Event.is_active == True,
        Event.is_recurring == True
    ).order_by(Event.start_time.asc()).all()
    
    return events


@router.get("/types/list")
def list_event_types():
    """Get all event types."""
    return [e.value for e in EventType]
