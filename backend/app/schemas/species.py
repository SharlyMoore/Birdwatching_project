from typing import Optional
from pydantic import BaseModel, Field


class BirdSpeciesBase(BaseModel):
    common_name: str = Field(..., max_length=100, examples=["Большая синица"])
    latin_name: str = Field(..., max_length=100, examples=["Parus major"])
    category: str = Field(default="Воробьинообразные", max_length=50)
    description: Optional[str] = Field(None, examples=["Один из самых распространенных видов синиц."])


class BirdSpeciesCreate(BirdSpeciesBase):
    pass


class BirdSpeciesResponse(BirdSpeciesBase):
    id: int

    class Config:
        from_attributes = True