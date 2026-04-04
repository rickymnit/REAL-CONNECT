from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import engine, Base
from app.api.v1.endpoints import (
    auth,
    sermons,
    blogs,
    events,
    contact,
    subscriptions,
    prayers,
    team,
    admin,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Real Connect Church API - A modern church management system",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check
@app.get("/health")
def health_check():
    return {"status": "healthy", "version": settings.APP_VERSION}


# Public API routes
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(sermons.router, prefix="/api/v1/sermons", tags=["Sermons"])
app.include_router(blogs.router, prefix="/api/v1/blogs", tags=["Blogs"])
app.include_router(events.router, prefix="/api/v1/events", tags=["Events"])
app.include_router(team.router, prefix="/api/v1/team", tags=["Team"])
app.include_router(contact.router, prefix="/api/v1/contact", tags=["Contact"])
app.include_router(subscriptions.router, prefix="/api/v1/subscribe", tags=["Subscriptions"])
app.include_router(prayers.router, prefix="/api/v1/prayer", tags=["Prayer Requests"])

# Admin API routes
app.include_router(admin.router, prefix="/api/v1/admin", tags=["Admin"])


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
