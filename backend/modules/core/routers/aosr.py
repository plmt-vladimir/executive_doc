from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from common.dependencies import get_session
from modules.core.schemas import aosr as schemas
from modules.core.models import aosr as models

router = APIRouter(prefix="/aosr", tags=["АОСР"])

# === AOSR ===
@router.post("/", response_model=schemas.AOSRRead)
async def create_aosr(
    item: schemas.AOSRCreate,
    session: AsyncSession = Depends(get_session),
):
    obj = models.AOSR(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/", response_model=List[schemas.AOSRRead])
async def get_all_aosrs(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOSR))
    return result.scalars().all()


# === AOSRSection ===
@router.post("/sections", response_model=schemas.AOSRSectionRead)
async def create_section(
    item: schemas.AOSRSectionCreate,
    session: AsyncSession = Depends(get_session),
):
    obj = models.AOSRSection(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/sections", response_model=List[schemas.AOSRSectionRead])
async def get_all_sections(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOSRSection))
    return result.scalars().all()


# === AOSRSP ===
@router.post("/sp", response_model=schemas.AOSRSPRead)
async def link_sp(
    item: schemas.AOSRSPCreate,
    session: AsyncSession = Depends(get_session),
):
    obj = models.AOSRSP(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/sp", response_model=List[schemas.AOSRSPRead])
async def get_all_sp_links(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOSRSP))
    return result.scalars().all()


# === AOSRMaterial ===
@router.post("/materials", response_model=schemas.AOSRMaterialRead)
async def link_material(
    item: schemas.AOSRMaterialCreate,
    session: AsyncSession = Depends(get_session),
):
    obj = models.AOSRMaterial(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/materials", response_model=List[schemas.AOSRMaterialRead])
async def get_all_linked_materials(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOSRMaterial))
    return result.scalars().all()


# === AOSRIGS ===
@router.post("/igs", response_model=schemas.AOSRIGSRead)
async def link_igs(
    item: schemas.AOSRIGSCreate,
    session: AsyncSession = Depends(get_session),
):
    obj = models.AOSRIGS(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/igs", response_model=List[schemas.AOSRIGSRead])
async def get_all_igs_links(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOSRIGS))
    return result.scalars().all()


# === AOSRLabTest ===
@router.post("/labtests", response_model=schemas.AOSRLabTestRead)
async def link_labtest(
    item: schemas.AOSRLabTestCreate,
    session: AsyncSession = Depends(get_session),
):
    obj = models.AOSRLabTest(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/labtests", response_model=List[schemas.AOSRLabTestRead])
async def get_all_labtest_links(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOSRLabTest))
    return result.scalars().all()


# === AOSRResponsible ===
@router.post("/responsibles", response_model=schemas.AOSRResponsibleRead)
async def add_responsible(
    item: schemas.AOSRResponsibleCreate,
    session: AsyncSession = Depends(get_session),
):
    obj = models.AOSRResponsible(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/responsibles", response_model=List[schemas.AOSRResponsibleRead])
async def get_all_responsibles(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOSRResponsible))
    return result.scalars().all()