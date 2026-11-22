from typing import List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.observation import ObservationCreate, ObservationResponse
from app.services.observation_service import (
    get_public_observations,
    get_user_observations,
    create_observation,
    delete_observation as remove_obs,
)
from app.services.species_service import get_species_by_id
from app.services.user_service import get_user_by_id

router = APIRouter(prefix="/observations", tags=["Observations"])


@router.get("/feed", response_model=List[ObservationResponse])
def get_feed(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    """Получить публичную ленту наблюдений."""
    return get_public_observations(db, skip=skip, limit=limit)


@router.get("/my", response_model=List[ObservationResponse])
def get_my_observations(user_id: int = Query(..., description="ID пользователя"), db: Session = Depends(get_db)):
    """Получить личные наблюдения пользователя."""
    return get_user_observations(db, user_id=user_id)


@router.post("", response_model=ObservationResponse, status_code=status.HTTP_201_CREATED)
def add_observation(
    obs_in: ObservationCreate,
    user_id: int = Query(..., description="ID автора наблюдения"),
    db: Session = Depends(get_db),
):
    """Сохранить новое наблюдение птицы."""
    if not get_user_by_id(db, user_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Пользователь не найден")
    if not get_species_by_id(db, obs_in.species_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Указанный вид птицы не найден")

    return create_observation(db, obs_in, user_id=user_id)


@router.delete("/{observation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_observation(
    observation_id: int,
    user_id: int = Query(..., description="ID владельца записи"),
    db: Session = Depends(get_db),
):
    """Удалить наблюдение."""
    deleted = remove_obs(db, observation_id, user_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Наблюдение не найдено или у вас нет прав на его удаление",
        )
    return None