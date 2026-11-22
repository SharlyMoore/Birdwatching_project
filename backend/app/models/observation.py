from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.db.database import Base


class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    species_id = Column(Integer, ForeignKey("bird_species.id", ondelete="RESTRICT"), nullable=False)

    image_url = Column(String(500), nullable=False)
    confidence = Column(Float, default=1.0, nullable=False)
    notes = Column(Text, nullable=True)
    is_public = Column(Boolean, default=False, nullable=False) 
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)


    author = relationship("User", back_populates="observations")
    species = relationship("BirdSpecies", back_populates="observations")