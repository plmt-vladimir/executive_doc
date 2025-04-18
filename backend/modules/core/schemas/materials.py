from pydantic import BaseModel
from typing import Optional
from datetime import date


# === MaterialReference ===
class MaterialReferenceBase(BaseModel):
    name: str
    type: str
    unit: str


class MaterialReferenceCreate(MaterialReferenceBase):
    pass


class MaterialReferenceRead(MaterialReferenceBase):
    id: int

    class Config:
        from_attributes = True


# === QualityDocument ===
class QualityDocumentBase(BaseModel):
    type: str
    number: str
    issue_date: date
    expiry_date: date
    file_url: str


class QualityDocumentCreate(QualityDocumentBase):
    pass


class QualityDocumentRead(QualityDocumentBase):
    id: int

    class Config:
        from_attributes = True


# === Delivery ===
class DeliveryBase(BaseModel):
    supplier: str
    supply_type: str
    record_number: str
    invoice_number: str
    record_date: date
    invoice_date: date
    invoice_file_url: str
    note: str


class DeliveryCreate(DeliveryBase):
    pass


class DeliveryRead(DeliveryBase):
    id: int

    class Config:
        from_attributes = True


# === DeliveredMaterial ===
class DeliveredMaterialBase(BaseModel):
    delivery_id: int
    material_id: int
    quantity: float
    quality_doc_id: int


class DeliveredMaterialCreate(DeliveredMaterialBase):
    pass


class DeliveredMaterialRead(DeliveredMaterialBase):
    id: int

    class Config:
        from_attributes = True


# === StorageWriteOff ===
class StorageWriteOffBase(BaseModel):
    delivered_material_id: int
    zone_id: int
    quantity: float


class StorageWriteOffCreate(StorageWriteOffBase):
    pass


class StorageWriteOffRead(StorageWriteOffBase):
    id: int

    class Config:
        from_attributes = True


# === StoredMaterial ===
class StoredMaterialBase(BaseModel):
    storage_write_off_id: int


class StoredMaterialCreate(StoredMaterialBase):
    pass


class StoredMaterialRead(StoredMaterialBase):
    id: int

    class Config:
        from_attributes = True