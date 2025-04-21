from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from common.database import AsyncSessionLocal
from modules.core.models import construction as models
from modules.core.schemas import construction as schemas

router = APIRouter(prefix="/construction", tags=["Construction"])

async def get_session():
    async with AsyncSessionLocal() as session:
        yield session


# === СТРОЙКИ ===
@router.post("/sites", response_model=schemas.ConstructionSiteRead)
async def create_site(site: schemas.ConstructionSiteCreate, session: AsyncSession = Depends(get_session)):
    new_site = models.ConstructionSite(**site.dict())
    session.add(new_site)
    await session.commit()
    await session.refresh(new_site)
    return new_site

@router.get("/sites", response_model=List[schemas.ConstructionSiteRead])
async def list_sites(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.ConstructionSite))
    return result.scalars().all()

@router.get("/sites/{id}", response_model=schemas.ConstructionSiteRead)
async def get_site(id: int, session: AsyncSession = Depends(get_session)):
    site = await session.get(models.ConstructionSite, id)
    if not site:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return site

@router.patch("/sites/{id}", response_model=schemas.ConstructionSiteRead)
async def update_site(id: int, site: schemas.ConstructionSiteCreate, session: AsyncSession = Depends(get_session)):
    db_site = await session.get(models.ConstructionSite, id)
    if not db_site:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in site.dict().items():
        setattr(db_site, key, value)
    session.add(db_site)
    await session.commit()
    await session.refresh(db_site)
    return db_site

@router.delete("/sites/{id}")
async def delete_site(id: int, session: AsyncSession = Depends(get_session)):
    site = await session.get(models.ConstructionSite, id)
    if not site:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(site)
    await session.commit()
    return {"detail": "Удалено"}


# === ОБЪЕКТЫ ===
@router.post("/objects", response_model=schemas.ConstructionObjectRead)
async def create_object(obj: schemas.ConstructionObjectCreate, session: AsyncSession = Depends(get_session)):
    new_object = models.ConstructionObject(**obj.dict())
    session.add(new_object)
    await session.commit()
    await session.refresh(new_object)
    return new_object

@router.get("/objects", response_model=List[schemas.ConstructionObjectRead])
async def list_objects(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.ConstructionObject))
    return result.scalars().all()

@router.get("/objects/{id}", response_model=schemas.ConstructionObjectRead)
async def get_object(id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(models.ConstructionObject, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return obj

@router.patch("/objects/{id}", response_model=schemas.ConstructionObjectRead)
async def update_object(id: int, obj: schemas.ConstructionObjectCreate, session: AsyncSession = Depends(get_session)):
    db_obj = await session.get(models.ConstructionObject, id)
    if not db_obj:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in obj.dict().items():
        setattr(db_obj, key, value)
    session.add(db_obj)
    await session.commit()
    await session.refresh(db_obj)
    return db_obj

@router.delete("/objects/{id}")
async def delete_object(id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(models.ConstructionObject, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(obj)
    await session.commit()
    return {"detail": "Удалено"}


# === УЧАСТКИ ===
@router.post("/zones", response_model=schemas.ConstructionZoneRead)
async def create_zone(zone: schemas.ConstructionZoneCreate, session: AsyncSession = Depends(get_session)):
    new_zone = models.ConstructionZone(**zone.dict())
    session.add(new_zone)
    await session.commit()
    await session.refresh(new_zone)
    return new_zone

@router.get("/zones", response_model=List[schemas.ConstructionZoneRead])
async def list_zones(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.ConstructionZone))
    return result.scalars().all()

@router.get("/zones/{id}", response_model=schemas.ConstructionZoneRead)
async def get_zone(id: int, session: AsyncSession = Depends(get_session)):
    zone = await session.get(models.ConstructionZone, id)
    if not zone:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return zone

@router.patch("/zones/{id}", response_model=schemas.ConstructionZoneRead)
async def update_zone(id: int, zone: schemas.ConstructionZoneCreate, session: AsyncSession = Depends(get_session)):
    db_zone = await session.get(models.ConstructionZone, id)
    if not db_zone:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in zone.dict().items():
        setattr(db_zone, key, value)
    session.add(db_zone)
    await session.commit()
    await session.refresh(db_zone)
    return db_zone

@router.delete("/zones/{id}")
async def delete_zone(id: int, session: AsyncSession = Depends(get_session)):
    zone = await session.get(models.ConstructionZone, id)
    if not zone:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(zone)
    await session.commit()
    return {"detail": "Удалено"}