from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from common.database import AsyncSessionLocal
from modules.core.models.organization import Organization, OrgEmployee, OrgRoleAssignment
from modules.core.schemas.organization import (
    OrganizationCreate, OrganizationRead,
    OrgEmployeeCreate, OrgEmployeeRead,
    OrgRoleAssignmentCreate, OrgRoleAssignmentRead
)

router = APIRouter(prefix="/organizations", tags=["Organizations"])

def get_session():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- ORGANIZATIONS ---

@router.post("/", response_model=OrganizationRead)
async def create_organization(org: OrganizationCreate, db: AsyncSession = Depends(get_session)):
    new_org = Organization(**org.dict())
    db.add(new_org)
    await db.commit()
    await db.refresh(new_org)
    return new_org

@router.get("/", response_model=list[OrganizationRead])
async def list_organizations(db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(Organization))
    return result.scalars().all()

# --- EMPLOYEES ---

@router.post("/employees", response_model=OrgEmployeeRead)
async def create_employee(employee: OrgEmployeeCreate, db: AsyncSession = Depends(get_session)):
    new_emp = OrgEmployee(**employee.dict())
    db.add(new_emp)
    await db.commit()
    await db.refresh(new_emp)
    return new_emp

@router.get("/employees", response_model=list[OrgEmployeeRead])
async def list_employees(db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(OrgEmployee))
    return result.scalars().all()

# --- ROLE ASSIGNMENT ---

@router.post("/roles", response_model=OrgRoleAssignmentRead)
async def assign_role(role: OrgRoleAssignmentCreate, db: AsyncSession = Depends(get_session)):
    new_role = OrgRoleAssignment(**role.dict())
    db.add(new_role)
    await db.commit()
    await db.refresh(new_role)
    return new_role

@router.get("/roles", response_model=list[OrgRoleAssignmentRead])
async def list_roles(db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(OrgRoleAssignment))
    return result.scalars().all()
