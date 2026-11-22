from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.species import router as species_router
from app.api.v1.observations import router as observations_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(species_router)
api_router.include_router(observations_router)