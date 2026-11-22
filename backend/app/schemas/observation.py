from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

from app.schemas.species import BirdSpeciesResponse
from app.schemas.user import UserResponse


class ObservationBase(BaseModel):
    image_url: str = Field(..., max_length=500, examples=["https://example.com/bird.jpg"])
    confidence: float = Field(default=1.0, ge=0.0, le=1.0, examples=[0.95])
    notes: Optional[str] = Field(None, examples=["Замечена в парке на кормушке."])
    is_public: bool = Field(default=False)


class ObservationCreate(ObservationBase):
    species_id: int = Field(..., examples=[1])


class ObservationResponse(ObservationBase):
    id: int
    user_id: int
    species_id: int
    created_at: datetime

    author: Optional[UserResponse] = None
    species: Optional[BirdSpeciesResponse] = None

    class Config:
        from_attributes = True