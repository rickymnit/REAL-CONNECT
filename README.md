# Real Connect Church Website

A modern, production-ready church website built with Next.js (frontend), FastAPI (backend), PostgreSQL (database), and Redis (caching).

## Features

### Frontend (Next.js)
- Modern, responsive design with Tailwind CSS
- Smooth animations with Framer Motion
- SEO optimized with Next.js App Router
- Public pages: Home, About, Jesus, Sermons, Events, Contact
- Admin dashboard for content management
- Newsletter subscription
- Contact forms with validation

### Backend (FastAPI)
- RESTful API with automatic OpenAPI documentation
- JWT authentication for admin access
- PostgreSQL database with SQLAlchemy ORM
- Redis caching and rate limiting
- CRUD operations for sermons, blogs, events, team members
- Contact form and prayer request handling

## Project Structure

```
real-connect-church/
├── frontend/                 # Next.js 14+ application
│   ├── app/                  # App router pages
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utilities, API clients
│   ├── public/               # Static assets
│   └── styles/               # Global styles
├── backend/                  # FastAPI application
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── core/             # Config, security, database
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   └── main.py           # Application entry
│   ├── alembic/              # Database migrations
│   └── requirements.txt
├── docker-compose.yml        # Local development stack
└── README.md
```

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Python 3.11+ (for local backend development)

### Option 1: Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd real-connect-church
```

2. Start all services:
```bash
docker-compose up -d
```

3. Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Option 2: Local Development

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Run the server:
```bash
uvicorn app.main:app --reload
```

#### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the development server:
```bash
npm run dev
```

## Deployment

### Backend (Railway)

1. Push code to GitHub
2. Connect Railway to your repository
3. Add PostgreSQL and Redis services in Railway
4. Set environment variables:
   - `DATABASE_URL`
   - `REDIS_URL`
   - `JWT_SECRET_KEY`
   - `CORS_ORIGINS`

### Frontend (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable:
   - `NEXT_PUBLIC_API_URL` (your Railway backend URL)
4. Deploy

## API Endpoints

### Public Endpoints
- `GET /api/v1/sermons` - List sermons
- `GET /api/v1/blogs` - List blog posts
- `GET /api/v1/events` - List events
- `GET /api/v1/team` - List team members
- `POST /api/v1/contact` - Submit contact form
- `POST /api/v1/subscribe` - Newsletter subscription
- `POST /api/v1/prayer` - Submit prayer request

### Admin Endpoints (Requires Auth)
- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/admin/sermons` - Create sermon
- `PUT /api/v1/admin/sermons/{id}` - Update sermon
- `DELETE /api/v1/admin/sermons/{id}` - Delete sermon
- Similar CRUD endpoints for blogs, events, team members

## Environment Variables

### Backend
```env
DATABASE_URL=postgresql://user:password@localhost:5432/realconnect
REDIS_URL=redis://localhost:6379/0
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
CORS_ORIGINS=http://localhost:3000
ENVIRONMENT=development
```

### Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Church Information

- **Name**: Real Connect Church
- **Location**: 54/23, Rajatpath, Mansarovar, Jaipur (Opposite Teuram Park)
- **Service Time**: Sunday 10:30 AM
- **Connect Groups**: Wednesday 7:00 PM

## License

This project is private and proprietary to Real Connect Church.
# REAL-CONNECT
