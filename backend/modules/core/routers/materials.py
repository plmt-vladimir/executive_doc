from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from common.dependencies import get_session
from modules.core.models import materials as models
from modules.core.schemas import materials as schemas

from sqlalchemy.future import select

router = APIRouter(prefix="/materials", tags=["Материалы"])

# === MaterialReference ===
@router.post("/references", response_model=schemas.MaterialReferenceRead)
async def create_material_reference(
    item: schemas.MaterialReferenceCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.MaterialReference(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/references", response_model=List[schemas.MaterialReferenceRead])
async def get_all_material_references(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.MaterialReference))
    return result.scalars().all()

# === QualityDocument ===
@router.post("/quality-docs", response_model=schemas.QualityDocumentRead)
async def create_quality_doc(
    item: schemas.QualityDocumentCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.QualityDocument(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/quality-docs", response_model=List[schemas.QualityDocumentRead])
async def get_all_quality_docs(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.QualityDocument))
    return result.scalars().all()

# === Delivery ===
@router.post("/deliveries", response_model=schemas.DeliveryRead)
async def create_delivery(
    item: schemas.DeliveryCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.Delivery(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/deliveries", response_model=List[schemas.DeliveryRead])
async def get_all_deliveries(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.Delivery))
    return result.scalars().all()

# === DeliveredMaterial ===
@router.post("/delivered", response_model=schemas.DeliveredMaterialRead)
async def create_delivered_material(
    item: schemas.DeliveredMaterialCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.DeliveredMaterial(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/delivered", response_model=List[schemas.DeliveredMaterialRead])
async def get_all_delivered_materials(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.DeliveredMaterial))
    return result.scalars().all()

# === StorageWriteOff ===
@router.post("/writeoffs", response_model=schemas.StorageWriteOffRead)
async def create_writeoff(
    item: schemas.StorageWriteOffCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.StorageWriteOff(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/writeoffs", response_model=List[schemas.StorageWriteOffRead])
async def get_all_writeoffs(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.StorageWriteOff))
    return result.scalars().all()

# === StoredMaterial ===
@router.post("/stored", response_model=schemas.StoredMaterialRead)
async def create_stored_material(
    item: schemas.StoredMaterialCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.StoredMaterial(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/stored", response_model=List[schemas.StoredMaterialRead])
async def get_all_stored_materials(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.StoredMaterial))
    return result.scalars().all()