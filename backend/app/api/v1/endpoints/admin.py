from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from app.core.database import get_db
from app.core.security import get_current_admin, get_password_hash
from app.models.user import User, UserRole
from app.models.sermon import Sermon
from app.models.blog import Blog
from app.models.event import Event
from app.models.team_member import TeamMember
from app.models.contact_message import ContactMessage
from app.models.subscription import Subscription
from app.models.prayer_request import PrayerRequest
from app.schemas.user import UserCreate, User as UserSchema
from app.schemas.sermon import SermonCreate, SermonUpdate, Sermon as SermonSchema
from app.schemas.blog import BlogCreate, BlogUpdate, Blog as BlogSchema
from app.schemas.event import EventCreate, EventUpdate, Event as EventSchema
from app.schemas.team import TeamMemberCreate, TeamMemberUpdate, TeamMember as TeamMemberSchema
from app.schemas.contact import ContactMessage as ContactMessageSchema
from app.schemas.subscription import Subscription as SubscriptionSchema
from app.schemas.prayer import PrayerRequest as PrayerRequestSchema

router = APIRouter()


# ========== Admin Users ==========
@router.post("/users", response_model=UserSchema)
def create_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Create a new admin user."""
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = User(
        email=user.email,
        hashed_password=get_password_hash(user.password),
        full_name=user.full_name,
        role=UserRole(user.role) if user.role else UserRole.EDITOR,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# ========== Sermons Admin ==========
@router.post("/sermons", response_model=SermonSchema)
def create_sermon(
    sermon: SermonCreate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Create a new sermon."""
    db_sermon = Sermon(**sermon.model_dump())
    db.add(db_sermon)
    db.commit()
    db.refresh(db_sermon)
    return db_sermon


@router.put("/sermons/{sermon_id}", response_model=SermonSchema)
def update_sermon(
    sermon_id: UUID,
    sermon: SermonUpdate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Update a sermon."""
    db_sermon = db.query(Sermon).filter(Sermon.id == sermon_id).first()
    if not db_sermon:
        raise HTTPException(status_code=404, detail="Sermon not found")
    
    for field, value in sermon.model_dump(exclude_unset=True).items():
        setattr(db_sermon, field, value)
    
    db.commit()
    db.refresh(db_sermon)
    return db_sermon


@router.delete("/sermons/{sermon_id}")
def delete_sermon(
    sermon_id: UUID,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Delete a sermon."""
    db_sermon = db.query(Sermon).filter(Sermon.id == sermon_id).first()
    if not db_sermon:
        raise HTTPException(status_code=404, detail="Sermon not found")
    
    db.delete(db_sermon)
    db.commit()
    return {"message": "Sermon deleted successfully"}


# ========== Blogs Admin ==========
@router.post("/blogs", response_model=BlogSchema)
def create_blog(
    blog: BlogCreate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Create a new blog post."""
    # Check for duplicate slug
    existing = db.query(Blog).filter(Blog.slug == blog.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    
    db_blog = Blog(**blog.model_dump(), author_id=UUID(admin_id))
    db.add(db_blog)
    db.commit()
    db.refresh(db_blog)
    return db_blog


@router.put("/blogs/{blog_id}", response_model=BlogSchema)
def update_blog(
    blog_id: UUID,
    blog: BlogUpdate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Update a blog post."""
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    for field, value in blog.model_dump(exclude_unset=True).items():
        setattr(db_blog, field, value)
    
    db.commit()
    db.refresh(db_blog)
    return db_blog


@router.delete("/blogs/{blog_id}")
def delete_blog(
    blog_id: UUID,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Delete a blog post."""
    db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
    if not db_blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    
    db.delete(db_blog)
    db.commit()
    return {"message": "Blog deleted successfully"}


# ========== Events Admin ==========
@router.post("/events", response_model=EventSchema)
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Create a new event."""
    db_event = Event(**event.model_dump())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


@router.put("/events/{event_id}", response_model=EventSchema)
def update_event(
    event_id: UUID,
    event: EventUpdate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Update an event."""
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    for field, value in event.model_dump(exclude_unset=True).items():
        setattr(db_event, field, value)
    
    db.commit()
    db.refresh(db_event)
    return db_event


@router.delete("/events/{event_id}")
def delete_event(
    event_id: UUID,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Delete an event."""
    db_event = db.query(Event).filter(Event.id == event_id).first()
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(db_event)
    db.commit()
    return {"message": "Event deleted successfully"}


# ========== Team Members Admin ==========
@router.post("/team", response_model=TeamMemberSchema)
def create_team_member(
    member: TeamMemberCreate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Create a new team member."""
    db_member = TeamMember(**member.model_dump())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


@router.put("/team/{member_id}", response_model=TeamMemberSchema)
def update_team_member(
    member_id: UUID,
    member: TeamMemberUpdate,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Update a team member."""
    db_member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    for field, value in member.model_dump(exclude_unset=True).items():
        setattr(db_member, field, value)
    
    db.commit()
    db.refresh(db_member)
    return db_member


@router.delete("/team/{member_id}")
def delete_team_member(
    member_id: UUID,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Delete a team member."""
    db_member = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not db_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    
    db.delete(db_member)
    db.commit()
    return {"message": "Team member deleted successfully"}


# ========== Contact Messages Admin ==========
@router.get("/contacts")
def list_contact_messages(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    is_read: Optional[bool] = None,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """List contact form submissions."""
    query = db.query(ContactMessage)
    if is_read is not None:
        query = query.filter(ContactMessage.is_read == is_read)
    
    total = query.count()
    messages = query.order_by(ContactMessage.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "items": messages,
        "total": total,
        "page": page,
        "page_size": page_size,
    }


@router.post("/contacts/{message_id}/mark-read")
def mark_contact_read(
    message_id: UUID,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Mark contact message as read."""
    message = db.query(ContactMessage).filter(ContactMessage.id == message_id).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    message.is_read = True
    db.commit()
    return {"message": "Marked as read"}


# ========== Subscriptions Admin ==========
@router.get("/subscriptions")
def list_subscriptions(
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=100),
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """List newsletter subscriptions."""
    query = db.query(Subscription)
    if is_active is not None:
        query = query.filter(Subscription.is_active == is_active)
    
    total = query.count()
    subs = query.order_by(Subscription.subscribed_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "items": subs,
        "total": total,
        "page": page,
        "page_size": page_size,
    }


# ========== Prayer Requests Admin ==========
@router.get("/prayers")
def list_prayer_requests(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    is_private: Optional[bool] = None,
    is_prayed_for: Optional[bool] = None,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """List prayer requests."""
    query = db.query(PrayerRequest)
    if is_private is not None:
        query = query.filter(PrayerRequest.is_private == is_private)
    if is_prayed_for is not None:
        query = query.filter(PrayerRequest.is_prayed_for == is_prayed_for)
    
    total = query.count()
    prayers = query.order_by(PrayerRequest.created_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "items": prayers,
        "total": total,
        "page": page,
        "page_size": page_size,
    }


@router.post("/prayers/{prayer_id}/mark-prayed")
def mark_prayer_prayed(
    prayer_id: UUID,
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Mark prayer request as prayed for."""
    from datetime import datetime, timezone
    
    prayer = db.query(PrayerRequest).filter(PrayerRequest.id == prayer_id).first()
    if not prayer:
        raise HTTPException(status_code=404, detail="Prayer request not found")
    
    prayer.is_prayed_for = True
    prayer.prayed_for_at = datetime.now(timezone.utc)
    db.commit()
    return {"message": "Marked as prayed for"}


# ========== Dashboard Stats ==========
@router.get("/dashboard/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    admin_id: str = Depends(get_current_admin)
):
    """Get dashboard statistics."""
    from datetime import datetime, timedelta, timezone
    
    # Count various entities
    sermon_count = db.query(Sermon).filter(Sermon.is_published == True).count()
    blog_count = db.query(Blog).filter(Blog.is_published == True).count()
    event_count = db.query(Event).filter(Event.is_active == True).count()
    team_count = db.query(TeamMember).filter(TeamMember.is_active == True).count()
    
    # Recent submissions
    unread_messages = db.query(ContactMessage).filter(ContactMessage.is_read == False).count()
    unread_prayers = db.query(PrayerRequest).filter(PrayerRequest.is_prayed_for == False).count()
    subscriber_count = db.query(Subscription).filter(Subscription.is_active == True).count()
    
    # Recent activity (last 7 days)
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    recent_messages = db.query(ContactMessage).filter(ContactMessage.created_at >= week_ago).count()
    recent_subscriptions = db.query(Subscription).filter(Subscription.subscribed_at >= week_ago).count()
    
    return {
        "counts": {
            "sermons": sermon_count,
            "blogs": blog_count,
            "events": event_count,
            "team_members": team_count,
            "subscribers": subscriber_count,
        },
        "pending": {
            "unread_messages": unread_messages,
            "unprayed_requests": unread_prayers,
        },
        "recent_activity": {
            "new_messages_this_week": recent_messages,
            "new_subscriptions_this_week": recent_subscriptions,
        }
    }
