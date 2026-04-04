from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.contact_message import ContactMessage
from app.schemas.contact import ContactMessageCreate, ContactMessage as ContactMessageSchema

router = APIRouter()


@router.post("/", response_model=ContactMessageSchema, status_code=status.HTTP_201_CREATED)
def create_contact_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    """Submit a contact form message."""
    db_message = ContactMessage(
        name=message.name,
        email=message.email,
        phone=message.phone,
        subject=message.subject,
        message=message.message,
    )
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
