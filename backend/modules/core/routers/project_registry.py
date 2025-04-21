# backend/modules/core/routers/project_registry.py

from fastapi import APIRouter, Depends, HTTPException
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


# === Получение записи по ID ===
@router.get("/{id}", response_model=schemas.ProjectRegistryRead)
# roles: ["admin", "editor"]
async def get_project_registry(id: int, session: AsyncSession = Depends(get_session)):
    record = await session.get(models.ProjectRegistry, id)
    if not record:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return record


# === Обновление записи ===
@router.patch("/{id}", response_model=schemas.ProjectRegistryRead)
# roles: ["admin", "editor"]
async def update_project_registry(
    id: int,
    item: schemas.ProjectRegistryCreate,
    session: AsyncSession = Depends(get_session),
):
    record = await session.get(models.ProjectRegistry, id)
    if not record:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in item.dict().items():
        setattr(record, key, value)
    session.add(record)
    await session.commit()
    await session.refresh(record)
    return record


# === Удаление записи ===
@router.delete("/{id}")
# roles: ["admin", "editor"]
async def delete_project_registry(id: int, session: AsyncSession = Depends(get_session)):
    record = await session.get(models.ProjectRegistry, id)
    if not record:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(record)
    await session.commit()
    return {"detail": "Удалено"}

