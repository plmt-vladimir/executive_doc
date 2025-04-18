from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from common.database import AsyncSessionLocal
from modules.core.models import construction as models
from modules.core.schemas import construction as schemas

router = APIRouter(prefix="/construction", tags=["Construction"])

async def get_session():
    async with AsyncSessionLocal() as session:
        yield session


# Стройки
@router.post("/sites", response_model=schemas.ConstructionSiteRead)
async def create_site(site: schemas.ConstructionSiteCreate, session: AsyncSession = Depends(get_session)):
    new_site = models.ConstructionSite(**site.dict())
    session.add(new_site)
    await session.commit()
    await session.refresh(new_site)
    return new_site

@router.get("/sites", response_model=list[schemas.ConstructionSiteRead])
async def list_sites(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.ConstructionSite))
    return result.scalars().all()


# Объекты
@router.post("/objects", response_model=schemas.ConstructionObjectRead)
async def create_object(obj: schemas.ConstructionObjectCreate, session: AsyncSession = Depends(get_session)):
    new_object = models.ConstructionObject(**obj.dict())
    session.add(new_object)
    await session.commit()
    await session.refresh(new_object)
    return new_object

@router.get("/objects", response_model=list[schemas.ConstructionObjectRead])
async def list_objects(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.ConstructionObject))
    return result.scalars().all()


# Участки
@router.post("/zones", response_model=schemas.ConstructionZoneRead)
async def create_zone(zone: schemas.ConstructionZoneCreate, session: AsyncSession = Depends(get_session)):
    new_zone = models.ConstructionZone(**zone.dict())
    session.add(new_zone)
    await session.commit()
    await session.refresh(new_zone)
    return new_zone

@router.get("/zones", response_model=list[schemas.ConstructionZoneRead])
async def list_zones(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.ConstructionZone))
    return result.scalars().all()