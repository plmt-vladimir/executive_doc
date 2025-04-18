from pydantic import BaseModel
from datetime import date
from typing import Optional


class OrganizationCreate(BaseModel):
    name: str
    ogrn: str
    inn: str
    address: str
    phone: str
    license_name: str
    license_date: date
    sro_number: str
    sro_ogrn: str
    sro_inn: str


class OrganizationRead(OrganizationCreate):
    id: int


class OrgEmployeeCreate(BaseModel):
    organization_id: int
    full_name: str
    position: str
    ins: str
    decree_number: str


class OrgEmployeeRead(OrgEmployeeCreate):
    id: int


class OrgRoleAssignmentCreate(BaseModel):
    organization_id: int
    construction_site_id: Optional[int] = None
    construction_object_id: Optional[int] = None
    role: str


class OrgRoleAssignmentRead(OrgRoleAssignmentCreate):
    id: int

