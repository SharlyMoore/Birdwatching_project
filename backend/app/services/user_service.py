import hashlib
from typing import Optional
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate


def get_password_hash(password: str) -> str:
    """Хеширование пароля SHA-256."""
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Проверка соответствия открытого пароля сохранённому хешу."""
    return get_password_hash(plain_password) == hashed_password


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Получение пользователя по ID."""
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """Поиск пользователя по имени пользователя."""
    return db.query(User).filter(User.username == username).first()


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Поиск пользователя по email."""
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session, user_in: UserCreate) -> User:
    """Регистрация нового пользователя."""
    hashed_pwd = get_password_hash(user_in.password)
    db_user = User(
        username=user_in.username,
        email=user_in.email,
        hashed_password=hashed_pwd,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user