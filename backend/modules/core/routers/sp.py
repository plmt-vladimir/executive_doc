from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from modules.core.models.sp import SP
from modules.core.schemas.sp import SPCreate, SPRead
from common.dependencies import get_session

router = APIRouter(prefix="/sp", tags=["SP"])


# === Создание СП ===
@router.post("/", response_model=SPRead)
async def create_sp(sp_data: SPCreate, session: AsyncSession = Depends(get_session)):
    sp = SP(**sp_data.dict())
    session.add(sp)
    await session.commit()
    await session.refresh(sp)
    return sp


# === Получение всех СП ===
@router.get("/", response_model=list[SPRead])
async def list_sp(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(SP))
    return result.scalars().all()


# === Получение СП по ID ===
@router.get("/{id}", response_model=SPRead)
# roles: ["admin", "editor"]
async def get_sp(id: int, session: AsyncSession = Depends(get_session)):
    sp = await session.get(SP, id)
    if not sp:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return sp


# === Обновление СП ===
@router.patch("/{id}", response_model=SPRead)
# roles: ["admin", "editor"]
async def update_sp(id: int, sp_data: SPCreate, session: AsyncSession = Depends(get_session)):
    sp = await session.get(SP, id)
    if not sp:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in sp_data.dict().items():
        setattr(sp, key, value)
    session.add(sp)
    await session.commit()
    await session.refresh(sp)
    return sp


# === Удаление СП ===
@router.delete("/{id}")
# roles: ["admin", "editor"]
async def delete_sp(id: int, session: AsyncSession = Depends(get_session)):
    sp = await session.get(SP, id)
    if not sp:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(sp)
    await session.commit()
    return {"detail": "Удалено"}