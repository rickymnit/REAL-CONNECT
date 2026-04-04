from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.database import get_db
from app.models.team_member import TeamMember
from app.schemas.team import TeamMember as TeamMemberSchema

router = APIRouter()


@router.get("/", response_model=list[TeamMemberSchema])
def list_team_members(db: Session = Depends(get_db)):
    """List all active team members."""
    members = db.query(TeamMember).filter(
        TeamMember.is_active == True
    ).order_by(TeamMember.order.asc()).all()
    return members


@router.get("/{member_id}", response_model=TeamMemberSchema)
def get_team_member(member_id: UUID, db: Session = Depends(get_db)):
    """Get a single team member by ID."""
    member = db.query(TeamMember).filter(
        TeamMember.id == member_id,
        TeamMember.is_active == True
    ).first()
    if not member:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team member not found")
    return member
