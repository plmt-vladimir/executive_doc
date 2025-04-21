from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from common.dependencies import get_session
from modules.core.models import igs_labtest as models
from modules.core.schemas import igs_labtest as schemas

router = APIRouter(prefix="/documents", tags=["ИГС и Лабораторные"])


# === Универсальный CRUD ===
def generate_crud_routes(
    prefix: str,
    model_class,
    schema_create,
    schema_read,
    name: str
):
    @router.post(f"/{prefix}", response_model=schema_read)
    # roles: ["admin"]
    async def create(item: schema_create, session: AsyncSession = Depends(get_session)):
        obj = model_class(**item.dict())
        session.add(obj)
        await session.commit()
        await session.refresh(obj)
        return obj

    @router.get(f"/{prefix}", response_model=list[schema_read])
    # roles: ["admin", "editor"]
    async def list_all(session: AsyncSession = Depends(get_session)):
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
    # roles: ["admin"]
    async def update(id: int, item: schema_create, session: AsyncSession = Depends(get_session)):
        db_obj = await session.get(model_class, id)
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
        db_obj = await session.get(model_class, id)
        if not db_obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        await session.delete(db_obj)
        await session.commit()
        return {"detail": "Удалено"}


# === Генерация маршрутов для ИГС и Лабораторных испытаний ===
generate_crud_routes("igs", models.IGS, schemas.IGSCreate, schemas.IGSRead, "ИГС")
generate_crud_routes("labtests", models.LabTest, schemas.LabTestCreate, schemas.LabTestRead, "Лабораторное испытание")
