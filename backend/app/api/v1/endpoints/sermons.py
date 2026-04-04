from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from app.core.database import get_db
from app.models.sermon import Sermon
from app.schemas.sermon import Sermon as SermonSchema, SermonCreate, SermonUpdate, SermonList

router = APIRouter()


@router.get("/", response_model=SermonList)
def list_sermons(
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=100),
    category: Optional[str] = None,
    speaker: Optional[str] = None,
    series: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """List published sermons with optional filters."""
    query = db.query(Sermon).filter(Sermon.is_published == True)
    
    if category:
        query = query.filter(Sermon.category.ilike(f"%{category}%"))
    if speaker:
        query = query.filter(Sermon.speaker.ilike(f"%{speaker}%"))
    if series:
        query = query.filter(Sermon.series.ilike(f"%{series}%"))
    if search:
        query = query.filter(
            Sermon.title.ilike(f"%{search}%") | 
            Sermon.description.ilike(f"%{search}%")
        )
    
    total = query.count()
    sermons = query.order_by(Sermon.published_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "items": sermons,
        "total": total,
        "page": page,
        "page_size": page_size,
    }


@router.get("/{sermon_id}", response_model=SermonSchema)
def get_sermon(sermon_id: UUID, db: Session = Depends(get_db)):
    """Get a single sermon by ID."""
    sermon = db.query(Sermon).filter(Sermon.id == sermon_id, Sermon.is_published == True).first()
    if not sermon:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Sermon not found")
    return sermon


@router.get("/categories/list")
def list_categories(db: Session = Depends(get_db)):
    """Get all unique sermon categories."""
    categories = db.query(Sermon.category).filter(Sermon.category != None).distinct().all()
    return [c[0] for c in categories if c[0]]


@router.get("/speakers/list")
def list_speakers(db: Session = Depends(get_db)):
    """Get all unique speakers."""
    speakers = db.query(Sermon.speaker).distinct().all()
    return [s[0] for s in speakers]


@router.get("/series/list")
def list_series(db: Session = Depends(get_db)):
    """Get all unique sermon series."""
    series = db.query(Sermon.series).filter(Sermon.series != None).distinct().all()
    return [s[0] for s in series if s[0]]
