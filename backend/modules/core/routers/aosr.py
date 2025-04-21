from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from common.dependencies import get_session
from modules.core.models import aosr as models
from modules.core.schemas import aosr as schemas

router = APIRouter(prefix="/aosr", tags=["АОСР"])


# === Основной объект AOSR ===
@router.post("/", response_model=schemas.AOSRRead)
# roles: ["admin", "editor"]
async def create_aosr(item: schemas.AOSRCreate, session: AsyncSession = Depends(get_session)):
    obj = models.AOSR(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj

@router.get("/", response_model=List[schemas.AOSRRead])
# roles: ["admin", "editor"]
async def get_all_aosrs(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.AOSR))
    return result.scalars().all()

@router.get("/{id}", response_model=schemas.AOSRRead)
# roles: ["admin", "editor"]
async def get_aosr(id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(models.AOSR, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return obj

@router.patch("/{id}", response_model=schemas.AOSRRead)
# roles: ["admin", "editor"]
async def update_aosr(id: int, item: schemas.AOSRCreate, session: AsyncSession = Depends(get_session)):
    obj = await session.get(models.AOSR, id)
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
async def delete_aosr(id: int, session: AsyncSession = Depends(get_session)):
    obj = await session.get(models.AOSR, id)
    if not obj:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(obj)
    await session.commit()
    return {"detail": "Удалено"}


# === Универсальные CRUD-обработчики ===
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


# === Генерация CRUD для всех связанных моделей ===
generate_crud_routes("sections", models.AOSRSection, schemas.AOSRSectionCreate, schemas.AOSRSectionRead, "Раздел АОСР")
generate_crud_routes("sp", models.AOSR_SP, schemas.AOSRSPCreate, schemas.AOSRSPRead, "СП АОСР")
generate_crud_routes("materials", models.AOSRMaterial, schemas.AOSRMaterialCreate, schemas.AOSRMaterialRead, "Материал АОСР")
generate_crud_routes("igs", models.AOSR_IGS, schemas.AOSRIGSCreate, schemas.AOSRIGSRead, "ИГС АОСР")
generate_crud_routes("labtests", models.AOSR_LabTest, schemas.AOSRLabTestCreate, schemas.AOSRLabTestRead, "Лабораторные испытания АОСР")
generate_crud_routes("responsibles", models.AOSRResponsible, schemas.AOSRResponsibleCreate, schemas.AOSRResponsibleRead, "Ответственные АОСР")
