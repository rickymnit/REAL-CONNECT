from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from app.core.database import get_db
from app.models.blog import Blog
from app.schemas.blog import Blog as BlogSchema, BlogList

router = APIRouter()


@router.get("/", response_model=BlogList)
def list_blogs(
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=100),
    category: Optional[str] = None,
    tag: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """List published blog posts with optional filters."""
    query = db.query(Blog).filter(Blog.is_published == True)
    
    if category:
        query = query.filter(Blog.category.ilike(f"%{category}%"))
    if tag:
        query = query.filter(Blog.tags.contains([tag]))
    if search:
        query = query.filter(
            Blog.title.ilike(f"%{search}%") | 
            Blog.content.ilike(f"%{search}%") |
            Blog.excerpt.ilike(f"%{search}%")
        )
    
    total = query.count()
    blogs = query.order_by(Blog.published_at.desc()).offset((page - 1) * page_size).limit(page_size).all()
    
    return {
        "items": blogs,
        "total": total,
        "page": page,
        "page_size": page_size,
    }


@router.get("/{slug}", response_model=BlogSchema)
def get_blog(slug: str, db: Session = Depends(get_db)):
    """Get a single blog post by slug."""
    blog = db.query(Blog).filter(Blog.slug == slug, Blog.is_published == True).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Blog post not found")
    
    # Increment view count
    blog.view_count += 1
    db.commit()
    
    return blog


@router.get("/categories/list")
def list_categories(db: Session = Depends(get_db)):
    """Get all unique blog categories."""
    categories = db.query(Blog.category).filter(Blog.category != None).distinct().all()
    return [c[0] for c in categories if c[0]]


@router.get("/tags/list")
def list_tags(db: Session = Depends(get_db)):
    """Get all unique blog tags."""
    blogs = db.query(Blog.tags).all()
    tags = set()
    for blog_tags in blogs:
        if blog_tags[0]:
            tags.update(blog_tags[0])
    return sorted(list(tags))
