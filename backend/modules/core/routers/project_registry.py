from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from common.dependencies import get_session
from modules.core.models import project_registry as models
from modules.core.schemas import project_registry as schemas

router = APIRouter(prefix="/project-registry", tags=["Реестр проекта"])

# === Создание записи ===
@router.post("/", response_model=schemas.ProjectRegistryRead)
async def create_project_registry(
    item: schemas.ProjectRegistryCreate,
    session: AsyncSession = Depends(get_session),
):
    obj = models.ProjectRegistry(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

# === Получение всех записей ===
@router.get("/", response_model=List[schemas.ProjectRegistryRead])
async def get_all_project_registry(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.ProjectRegistry))
    return result.scalars().all()
