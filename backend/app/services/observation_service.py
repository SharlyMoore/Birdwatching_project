from typing import List, Optional
from sqlalchemy.orm import Session, joinedload

from app.models.observation import Observation
from app.schemas.observation import ObservationCreate


def get_public_observations(db: Session, skip: int = 0, limit: int = 50) -> List[Observation]:
    """Получение ленты публичных наблюдений (с подгрузкой автора и вида птицы)."""
    return (
        db.query(Observation)
        .options(joinedload(Observation.author), joinedload(Observation.species))
        .filter(Observation.is_public == True)
        .order_by(Observation.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_user_observations(db: Session, user_id: int) -> List[Observation]:
    """Получение всех личных наблюдений конкретного пользователя."""
    return (
        db.query(Observation) #sqlacademy 2 переписать
        .options(joinedload(Observation.species))
        .filter(Observation.user_id == user_id)
        .order_by(Observation.created_at.desc())
        .all()
    )


def create_observation(db: Session, obs_in: ObservationCreate, user_id: int) -> Observation:
    """Сохранение новой карточки наблюдения."""
    db_obs = Observation(
        user_id=user_id,
        species_id=obs_in.species_id,
        image_url=obs_in.image_url,
        confidence=obs_in.confidence,
        notes=obs_in.notes,
        is_public=obs_in.is_public,
    )
    db.add(db_obs)
    db.commit()
    db.refresh(db_obs)
    return db_obs


def delete_observation(db: Session, observation_id: int, user_id: int) -> bool:
    """Удаление наблюдения с проверкой прав владельца."""
    obs = (
        db.query(Observation)
        .filter(Observation.id == observation_id, Observation.user_id == user_id)
        .first()
    )
    if not obs:
        return False
    db.delete(obs)
    db.commit()
    return True