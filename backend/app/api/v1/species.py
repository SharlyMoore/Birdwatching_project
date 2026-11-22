from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.species import BirdSpeciesCreate, BirdSpeciesResponse
from app.services.species_service import (
    get_all_species,
    get_species_by_id,
    get_species_by_name,
    create_species,
)

router = APIRouter(prefix="/species", tags=["Species Directory"])


@router.get("", response_model=List[BirdSpeciesResponse])
def get_species_list(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Получить справочник птиц с пагинацией."""
    return get_all_species(db, skip=skip, limit=limit)


@router.post("", response_model=BirdSpeciesResponse, status_code=status.HTTP_201_CREATED)
def create_new_species(species_in: BirdSpeciesCreate, db: Session = Depends(get_db)):
    """Добавить новый вид птицы в справочник."""
    existing = get_species_by_name(db, species_in.common_name)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Вид с таким названием уже существует в справочнике",
        )
    return create_species(db, species_in)


@router.get("/{species_id}", response_model=BirdSpeciesResponse)
def get_species_detail(species_id: int, db: Session = Depends(get_db)):
    """Получить подробную информацию о виде птицы."""
    species = get_species_by_id(db, species_id)
    if not species:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Вид птицы не найден",
        )
    return species