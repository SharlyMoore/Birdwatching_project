from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text

from app.core.config import settings
from app.db.database import engine, get_db, Base
import app.models
from app.api.v1.router import api_router  # <-- Импорт главного роутера

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Сервис распознавания видов птиц, хранения наблюдений и сообщества",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/api/health", tags=["System"])
def health_check(db: Session = Depends(get_db)):
    """Проверка доступности сервера и активного соединения с PostgreSQL."""
    db.execute(text("SELECT 1"))
    return {
        "status": "ok",
        "database": "connected",
        "app": settings.PROJECT_NAME,
    }