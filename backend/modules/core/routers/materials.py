from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Type

from common.dependencies import get_session
from modules.core.models import materials as models
from modules.core.schemas import materials as schemas

router = APIRouter(prefix="/materials", tags=["Материалы"])

# === Универсальный CRUD-генератор ===
def generate_crud_routes(
    prefix: str,
    model: Type,
    schema_create: Type,
    schema_read: Type,
    name: str
):
    @router.post(f"/{prefix}", response_model=schema_read)
    # roles: ["admin"]
    async def create(item: schema_create, session: AsyncSession = Depends(get_session)):
        obj = model(**item.dict())
        session.add(obj)
        await session.commit()
        await session.refresh(obj)
        return obj

    @router.get(f"/{prefix}", response_model=list[schema_read])
    # roles: ["admin", "editor"]
    async def list_all(session: AsyncSession = Depends(get_session)):
        result = await session.execute(select(model))
        return result.scalars().all()

    @router.get(f"/{prefix}/{{id}}", response_model=schema_read)
    # roles: ["admin", "editor"]
    async def get_by_id(id: int, session: AsyncSession = Depends(get_session)):
        obj = await session.get(model, id)
        if not obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        return obj

    @router.patch(f"/{prefix}/{{id}}", response_model=schema_read)
    # roles: ["admin"]
    async def update(id: int, item: schema_create, session: AsyncSession = Depends(get_session)):
        db_obj = await session.get(model, id)
        if not db_obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        for key, value in item.dict().items():
            setattr(db_obj, key, value)
        session.add(db_obj)
        await session.commit()
        await session.refresh(db_obj)
        return db_obj

    @router.delete(f"/{prefix}/{{id}}")
    # roles: ["admin"]
    async def delete(id: int, session: AsyncSession = Depends(get_session)):
        db_obj = await session.get(model, id)
        if not db_obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        await session.delete(db_obj)
        await session.commit()
        return {"detail": "Удалено"}

# === Генерация CRUD для всех сущностей ===
generate_crud_routes("references", models.MaterialReference, schemas.MaterialReferenceCreate, schemas.MaterialReferenceRead, "Справочник материалов")
generate_crud_routes("quality-docs", models.QualityDocument, schemas.QualityDocumentCreate, schemas.QualityDocumentRead, "Документ о качестве")
generate_crud_routes("deliveries", models.Delivery, schemas.DeliveryCreate, schemas.DeliveryRead, "Поставка")
generate_crud_routes("delivered", models.DeliveredMaterial, schemas.DeliveredMaterialCreate, schemas.DeliveredMaterialRead, "Поставленный материал")
generate_crud_routes("writeoffs", models.StorageWriteOff, schemas.StorageWriteOffCreate, schemas.StorageWriteOffRead, "Списание со склада")
generate_crud_routes("stored", models.StoredMaterial, schemas.StoredMaterialCreate, schemas.StoredMaterialRead, "Хранимый материал")