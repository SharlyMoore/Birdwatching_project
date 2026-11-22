from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, examples=["birdlover"])
    email: EmailStr = Field(..., examples=["birdlover@example.com"])


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=100, examples=["securepass123"])


class UserLogin(BaseModel):
    username: str
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True