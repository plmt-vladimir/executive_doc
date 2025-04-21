from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from common.dependencies import get_session
from modules.core.models import aook as models
from modules.core.schemas import aook as schemas

router = APIRouter(prefix="/aook", tags=["АООК"])

# === AOOK ===
@router.post("/", response_model=schemas.AOOKRead)
# roles: ["admin", "editor"]
async def create_aook(item: schemas.AOOKCreate, session: AsyncSession = Depends(get_session)):
    obj = models.AOOK(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.get("/", response_model=List[schemas.AOOKRead])
# roles: ["admin", "editor"]
async def get_all_aook(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOOK))
    return result.scalars().all()

@router.get("/{id}", response_model=schemas.AOOKRead)
# roles: ["admin", "editor"]
async def get_aook(id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(models.AOOK, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return obj

@router.patch("/{id}", response_model=schemas.AOOKRead)
# roles: ["admin", "editor"]
async def update_aook(id: int, item: schemas.AOOKCreate, session: AsyncSession = Depends(get_session)):
    obj = await session.get(models.AOOK, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in item.dict().items():
        setattr(obj, key, value)
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.delete("/{id}")
# roles: ["admin", "editor"]
async def delete_aook(id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(models.AOOK, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(obj)
    await session.commit()
    return {"detail": "Удалено"}


# === Универсальные CRUD-блоки (для всех связанных моделей) ===
def generate_crud_routes(
    prefix: str,
    model_class,
    schema_create,
    schema_read,
    name: str
):
    @router.post(f"/{prefix}", response_model=schema_read)
    # roles: ["admin", "editor"]
    async def create(item: schema_create, session: AsyncSession = Depends(get_session)):
        obj = model_class(**item.dict())
        session.add(obj)
        await session.commit()
        await session.refresh(obj)
        return obj

    @router.get(f"/{prefix}", response_model=List[schema_read])
    # roles: ["admin", "editor"]
    async def get_all(session: AsyncSession = Depends(get_session)):
        result = await session.execute(select(model_class))
        return result.scalars().all()

    @router.get(f"/{prefix}/{{id}}", response_model=schema_read)
    # roles: ["admin", "editor"]
    async def get_by_id(id: int, session: AsyncSession = Depends(get_session)):
        obj = await session.get(model_class, id)
        if not obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        return obj

    @router.patch(f"/{prefix}/{{id}}", response_model=schema_read)
    # roles: ["admin", "editor"]
    async def update(id: int, item: schema_create, session: AsyncSession = Depends(get_session)):
        obj = await session.get(model_class, id)
        if not obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        for key, value in item.dict().items():
            setattr(obj, key, value)
        session.add(obj)
        await session.commit()
        await session.refresh(obj)
        return obj

    @router.delete(f"/{prefix}/{{id}}")
    # roles: ["admin", "editor"]
    async def delete(id: int, session: AsyncSession = Depends(get_session)):
        obj = await session.get(model_class, id)
        if not obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        await session.delete(obj)
        await session.commit()
        return {"detail": "Удалено"}

# === Apply CRUD for each related model ===
generate_crud_routes("sections", models.AOOK_Section, schemas.AOOKSectionCreate, schemas.AOOKSectionRead, "Раздел АООК")
generate_crud_routes("sp", models.AOOK_SP, schemas.AOOKSPCreate, schemas.AOOKSPRead, "СП для АООК")
generate_crud_routes("igs", models.AOOK_IGS, schemas.AOOKIGSCreate, schemas.AOOKIGSRead, "ИГС для АООК")
generate_crud_routes("labtests", models.AOOK_LabTest, schemas.AOOKLabTestCreate, schemas.AOOKLabTestRead, "Лабораторные испытания АООК")
generate_crud_routes("responsibles", models.AOOK_Responsible, schemas.AOOKResponsibleCreate, schemas.AOOKResponsibleRead, "Ответственный АООК")
generate_crud_routes("aosr", models.AOOK_AOSR, schemas.AOOKAOSRCreate, schemas.AOOKAOSRRead, "Привязка АОСР")
generate_crud_routes("materials", models.AOOK_Material, schemas.AOOKMaterialCreate, schemas.AOOKMaterialRead, "Материал АООК")