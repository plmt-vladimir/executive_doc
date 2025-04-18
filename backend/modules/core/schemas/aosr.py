from pydantic import BaseModel
from typing import List, Optional
from datetime import date


# === AOSR Base ===
class AOSRBase(BaseModel):
    act_number: str
    full_name: str
    start_date: date
    end_date: date
    sign_date: date
    status: str
    zone_id: Optional[int] = None
    object_id: Optional[int] = None
    registry_code: str
    type_code: str
    section_code: str
    aooc_id: Optional[int] = None


class AOSRCreate(AOSRBase):
    pass


class AOSRRead(AOSRBase):
    id: int

    class Config:
        from_attributes = True


# === AOSR Section ===
class AOSRSectionBase(BaseModel):
    aosr_id: int
    title: str
    code: str
    sheets: str


class AOSRSectionCreate(AOSRSectionBase):
    pass


class AOSRSectionRead(AOSRSectionBase):
    class Config:
        from_attributes = True


# === AOSR SP ===
class AOSRSPBase(BaseModel):
    aosr_id: int
    sp_id: int


class AOSRSPCreate(AOSRSPBase):
    pass


class AOSRSPRead(AOSRSPBase):
    class Config:
        from_attributes = True


# === AOSR Material ===
class AOSRMaterialBase(BaseModel):
    aosr_id: int
    stored_material_id: int


class AOSRMaterialCreate(AOSRMaterialBase):
    pass


class AOSRMaterialRead(AOSRMaterialBase):
    class Config:
        from_attributes = True


# === AOSR IGS / LabTest ===
class AOSRIGSBase(BaseModel):
    aosr_id: int
    igs_id: int


class AOSRIGSCreate(AOSRIGSBase):
    pass


class AOSRIGSRead(AOSRIGSBase):
    class Config:
        from_attributes = True


class AOSRLabTestBase(BaseModel):
    aosr_id: int
    lab_test_id: int


class AOSRLabTestCreate(AOSRLabTestBase):
    pass


class AOSRLabTestRead(AOSRLabTestBase):
    class Config:
        from_attributes = True


# === AOSR Responsible ===
class AOSRResponsibleBase(BaseModel):
    aosr_id: int
    employee_id: int
    role: str


class AOSRResponsibleCreate(AOSRResponsibleBase):
    pass


class AOSRResponsibleRead(AOSRResponsibleBase):
    class Config:
        from_attributes = True