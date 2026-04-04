from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.prayer_request import PrayerRequest
from app.schemas.prayer import PrayerRequestCreate, PrayerRequest as PrayerRequestSchema

router = APIRouter()


@router.post("/", response_model=PrayerRequestSchema, status_code=status.HTTP_201_CREATED)
def create_prayer_request(prayer: PrayerRequestCreate, db: Session = Depends(get_db)):
    """Submit a prayer request."""
    db_prayer = PrayerRequest(
        name=prayer.name,
        email=prayer.email,
        request=prayer.request,
        is_private=prayer.is_private,
    )
    db.add(db_prayer)
    db.commit()
    db.refresh(db_prayer)
    return db_prayer
