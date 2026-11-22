from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.species import BirdSpecies
from app.schemas.species import BirdSpeciesCreate


def get_all_species(db: Session, skip: int = 0, limit: int = 100) -> List[BirdSpecies]:
    """Получение списка всех зарегистрированных видов птиц с пагинацией."""
    return db.query(BirdSpecies).offset(skip).limit(limit).all()


def get_species_by_id(db: Session, species_id: int) -> Optional[BirdSpecies]:
    """Поиск вида птицы по его ID."""
    return db.query(BirdSpecies).filter(BirdSpecies.id == species_id).first()


def get_species_by_name(db: Session, common_name: str) -> Optional[BirdSpecies]:
    """Поиск вида птицы по названию."""
    return db.query(BirdSpecies).filter(BirdSpecies.common_name == common_name).first()


def create_species(db: Session, species_in: BirdSpeciesCreate) -> BirdSpecies:
    """Добавление нового вида птицы в справочник."""
    db_species = BirdSpecies(
        common_name=species_in.common_name,
        latin_name=species_in.latin_name,
        category=species_in.category,
        description=species_in.description,
    )
    db.add(db_species)
    db.commit()
    db.refresh(db_species)
    return db_species