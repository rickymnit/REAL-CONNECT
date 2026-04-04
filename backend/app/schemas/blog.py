from pydantic import BaseModel, HttpUrl
from typing import Optional, List
from datetime import datetime
from uuid import UUID


class BlogBase(BaseModel):
    title: str
    slug: str
    content: str
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    tags: List[str] = []
    is_published: bool = True


class BlogCreate(BlogBase):
    pass


class BlogUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    is_published: Optional[bool] = None


class BlogAuthor(BaseModel):
    id: UUID
    full_name: str
    email: str

    class Config:
        from_attributes = True


class Blog(BlogBase):
    id: UUID
    author_id: Optional[UUID] = None
    author: Optional[BlogAuthor] = None
    view_count: int
    published_at: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BlogList(BaseModel):
    items: list[Blog]
    total: int
    page: int
    page_size: int
