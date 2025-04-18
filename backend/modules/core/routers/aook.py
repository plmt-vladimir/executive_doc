from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from common.dependencies import get_session
from modules.core.models import aook as models
from modules.core.schemas import aook as schemas

router = APIRouter(prefix="/aook", tags=["АООК"])

# === AOOK ===
@router.post("/", response_model=schemas.AOOKRead)
async def create_aook(
    item: schemas.AOOKCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.AOOK(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/", response_model=List[schemas.AOOKRead])
async def get_all_aook(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOK))
    return result.scalars().all()


# === AOOK_Section ===
@router.post("/sections", response_model=schemas.AOOKSectionRead)
async def create_aook_section(
    item: schemas.AOOKSectionCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.AOOKSection(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/sections", response_model=List[schemas.AOOKSectionRead])
async def get_all_aook_sections(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOKSection))
    return result.scalars().all()


# === AOOK_SP ===
@router.post("/sp", response_model=schemas.AOOKSPRead)
async def create_aook_sp(
    item: schemas.AOOKSPCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.AOOK_SP(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/sp", response_model=List[schemas.AOOKSPRead])
async def get_all_aook_sp(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOK_SP))
    return result.scalars().all()


# === AOOK_IGS ===
@router.post("/igs", response_model=schemas.AOOKIGSRead)
async def create_aook_igs(
    item: schemas.AOOKIGSCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.AOOK_IGS(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/igs", response_model=List[schemas.AOOKIGSRead])
async def get_all_aook_igs(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOK_IGS))
    return result.scalars().all()


# === AOOK_LabTest ===
@router.post("/labtests", response_model=schemas.AOOKLabTestRead)
async def create_aook_labtest(
    item: schemas.AOOKLabTestCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.AOOK_LabTest(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/labtests", response_model=List[schemas.AOOKLabTestRead])
async def get_all_aook_labtests(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOK_LabTest))
    return result.scalars().all()


# === AOOK_Responsible ===
@router.post("/responsibles", response_model=schemas.AOOKResponsibleRead)
async def create_aook_responsible(
    item: schemas.AOOKResponsibleCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.AOOK_Responsible(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/responsibles", response_model=List[schemas.AOOKResponsibleRead])
async def get_all_aook_responsibles(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOK_Responsible))
    return result.scalars().all()


# === AOOK_AOSR ===
@router.post("/aosr", response_model=schemas.AOOKAOSRRead)
async def create_aook_aosr(
    item: schemas.AOOKAOSRCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.AOOK_AOSR(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/aosr", response_model=List[schemas.AOOKAOSRRead])
async def get_all_aook_aosr(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOK_AOSR))
    return result.scalars().all()


# === AOOK_Material ===
@router.post("/materials", response_model=schemas.AOOKMaterialRead)
async def create_aook_material(
    item: schemas.AOOKMaterialCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.AOOK_Material(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/materials", response_model=List[schemas.AOOKMaterialRead])
async def get_all_aook_materials(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOK_Material))
    return result.scalars().all()