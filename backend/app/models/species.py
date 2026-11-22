from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.database import Base


class BirdSpecies(Base):
    __tablename__ = "bird_species"

    id = Column(Integer, primary_key=True, index=True)
    common_name = Column(String(100), unique=True, index=True, nullable=False)  
    latin_name = Column(String(100), nullable=False)                            
    category = Column(String(50), default="Воробьинообразные", nullable=False)
    description = Column(Text, nullable=True)

    observations = relationship("Observation", back_populates="species")