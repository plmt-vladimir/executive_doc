from pydantic import BaseModel
from typing import Optional, List
from datetime import date


# === AOOK Base ===
class AOOKBase(BaseModel):
    act_number: str
    full_name: str
    status: str
    start_date: date
    end_date: date
    sign_date: date
    code: str
    axes: str
    marks: str
    notes: Optional[str] = None
    zone_id: Optional[int] = None
    object_id: Optional[int] = None


class AOOKCreate(AOOKBase):
    pass


class AOOKRead(AOOKBase):
    id: int

    class Config:
        from_attributes = True


# === AOOK Section ===
class AOOKSectionBase(BaseModel):
    aook_id: int
    title: str
    code: str
    sheets: str


class AOOKSectionCreate(AOOKSectionBase):
    pass


class AOOKSectionRead(AOOKSectionBase):
    id: int

    class Config:
        from_attributes = True


# === AOOK SP ===
class AOOKSPCreate(BaseModel):
    aook_id: int
    sp_id: int


class AOOKSPRead(AOOKSPCreate):
    id: int

    class Config:
        from_attributes = True


# === AOOK IGS ===
class AOOKIGSCreate(BaseModel):
    aook_id: int
    igs_id: int


class AOOKIGSRead(AOOKIGSCreate):
    id: int

    class Config:
        from_attributes = True


# === AOOK LabTest ===
class AOOKLabTestCreate(BaseModel):
    aook_id: int
    lab_test_id: int


class AOOKLabTestRead(AOOKLabTestCreate):
    id: int

    class Config:
        from_attributes = True


# === AOOK Responsible ===
class AOOKResponsibleBase(BaseModel):
    aook_id: int
    employee_id: int
    role: str


class AOOKResponsibleCreate(AOOKResponsibleBase):
    pass


class AOOKResponsibleRead(AOOKResponsibleBase):
    id: int

    class Config:
        from_attributes = True


# === AOOK AOSR ===
class AOOKAOSRCreate(BaseModel):
    aook_id: int
    aosr_id: int


class AOOKAOSRRead(AOOKAOSRCreate):
    id: int

    class Config:
        from_attributes = True


# === AOOK Material ===
class AOOKMaterialCreate(BaseModel):
    aook_id: int
    stored_material_id: int


class AOOKMaterialRead(AOOKMaterialCreate):
    id: int

    class Config:
        from_attributes = True


# === Transfer Document ===
class TransferDocumentBase(BaseModel):
    title: str
    number: str
    date: date
    file_url: str


class TransferDocumentCreate(TransferDocumentBase):
    pass


class TransferDocumentRead(TransferDocumentBase):
    id: int

    class Config:
        from_attributes = True


# === Transfer Document Link ===
class TransferDocumentLinkBase(BaseModel):
    transfer_document_id: int
    aook_id: Optional[int] = None
    aosr_id: Optional[int] = None


class TransferDocumentLinkCreate(TransferDocumentLinkBase):
    pass


class TransferDocumentLinkRead(TransferDocumentLinkBase):
    id: int

    class Config:
        from_attributes = True