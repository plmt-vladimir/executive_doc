from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from common.database import AsyncSessionLocal
from modules.core.models.organization import Organization, OrgEmployee, OrgRoleAssignment
from modules.core.schemas.organization import (
    OrganizationCreate, OrganizationRead,
    OrgEmployeeCreate, OrgEmployeeRead,
    OrgRoleAssignmentCreate, OrgRoleAssignmentRead
)

router = APIRouter(prefix="/organizations", tags=["Organizations"])


# === Сессия ===
def get_session():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        db.close()


# === Универсальный CRUD-генератор ===
def generate_crud_routes(
    prefix: str,
    model_class,
    schema_create,
    schema_read,
    name: str
):
    @router.post(f"/{prefix}", response_model=schema_read)
    # roles: ["admin"]
    async def create(item: schema_create, db: AsyncSession = Depends(get_session)):
        obj = model_class(**item.dict())
        db.add(obj)
        await db.commit()
        await db.refresh(obj)
        return obj

    @router.get(f"/{prefix}", response_model=list[schema_read])
    # roles: ["admin", "editor"]
    async def get_all(db: AsyncSession = Depends(get_session)):
        result = await db.execute(select(model_class))
        return result.scalars().all()

    @router.get(f"/{prefix}/{{id}}", response_model=schema_read)
    # roles: ["admin", "editor"]
    async def get_by_id(id: int, db: AsyncSession = Depends(get_session)):
        obj = await db.get(model_class, id)
        if not obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        return obj

    @router.patch(f"/{prefix}/{{id}}", response_model=schema_read)
    # roles: ["admin"]
    async def update(id: int, item: schema_create, db: AsyncSession = Depends(get_session)):
        db_obj = await db.get(model_class, id)
        if not db_obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        for key, value in item.dict().items():
            setattr(db_obj, key, value)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj

    @router.delete(f"/{prefix}/{{id}}")
    # roles: ["admin"]
    async def delete(id: int, db: AsyncSession = Depends(get_session)):
        db_obj = await db.get(model_class, id)
        if not db_obj:
            raise HTTPException(status_code=404, detail=f"{name} не найден")
        await db.delete(db_obj)
        await db.commit()
        return {"detail": "Удалено"}


# === ORGANIZATION (ручной CRUD) ===
@router.post("/", response_model=OrganizationRead)
# roles: ["admin"]
async def create_organization(org: OrganizationCreate, db: AsyncSession = Depends(get_session)):
    new_org = Organization(**org.dict())
    db.add(new_org)
    await db.commit()
    await db.refresh(new_org)
    return new_org


@router.get("/", response_model=list[OrganizationRead])
# roles: ["admin", "editor"]
async def list_organizations(db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(Organization))
    return result.scalars().all()


@router.get("/{id}", response_model=OrganizationRead)
# roles: ["admin", "editor"]
async def get_organization(id: int, db: AsyncSession = Depends(get_session)):
    org = await db.get(Organization, id)
    if not org:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return org


@router.patch("/{id}", response_model=OrganizationRead)
# roles: ["admin"]
async def update_organization(id: int, org: OrganizationCreate, db: AsyncSession = Depends(get_session)):
    db_org = await db.get(Organization, id)
    if not db_org:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in org.dict().items():
        setattr(db_org, key, value)
    db.add(db_org)
    await db.commit()
    await db.refresh(db_org)
    return db_org


@router.delete("/{id}")
# roles: ["admin"]
async def delete_organization(id: int, db: AsyncSession = Depends(get_session)):
    db_org = await db.get(Organization, id)
    if not db_org:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await db.delete(db_org)
    await db.commit()
    return {"detail": "Удалено"}


# === EMPLOYEES & ROLES: универсальные CRUD ===
generate_crud_routes("employees", OrgEmployee, OrgEmployeeCreate, OrgEmployeeRead, "Сотрудник организации")
generate_crud_routes("roles", OrgRoleAssignment, OrgRoleAssignmentCreate, OrgRoleAssignmentRead, "Назначение роли")

