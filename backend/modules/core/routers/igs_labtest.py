# modules/core/routers/igs_labtest.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from common.dependencies import get_session
from modules.core.models import igs_labtest as models
from modules.core.schemas import igs_labtest as schemas

router = APIRouter(prefix="/documents", tags=["ИГС и Лабораторные"])

# === IGS ===
@router.post("/igs", response_model=schemas.IGSRead)
async def create_igs(
    item: schemas.IGSCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.IGS(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/igs", response_model=List[schemas.IGSRead])
async def get_all_igs(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.IGS))
    return result.scalars().all()


# === LabTest ===
@router.post("/labtests", response_model=schemas.LabTestRead)
async def create_labtest(
    item: schemas.LabTestCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.LabTest(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/labtests", response_model=List[schemas.LabTestRead])
async def get_all_labtests(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.LabTest))
    return result.scalars().all()
