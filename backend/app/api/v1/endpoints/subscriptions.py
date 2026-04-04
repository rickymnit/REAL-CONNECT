from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.subscription import Subscription
from app.schemas.subscription import SubscriptionCreate, Subscription as SubscriptionSchema

router = APIRouter()


@router.post("/", response_model=SubscriptionSchema, status_code=status.HTTP_201_CREATED)
def create_subscription(subscription: SubscriptionCreate, db: Session = Depends(get_db)):
    """Subscribe to newsletter."""
    # Check if already subscribed
    existing = db.query(Subscription).filter(Subscription.email == subscription.email).first()
    if existing:
        if existing.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already subscribed"
            )
        else:
            # Reactivate subscription
            existing.is_active = True
            existing.name = subscription.name or existing.name
            db.commit()
            db.refresh(existing)
            return existing
    
    db_subscription = Subscription(
        email=subscription.email,
        name=subscription.name,
    )
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription


@router.post("/unsubscribe")
def unsubscribe(email: str, db: Session = Depends(get_db)):
    """Unsubscribe from newsletter."""
    subscription = db.query(Subscription).filter(Subscription.email == email).first()
    if not subscription:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Email not found"
        )
    
    subscription.is_active = False
    db.commit()
    return {"message": "Successfully unsubscribed"}
