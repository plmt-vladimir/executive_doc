from pydantic import BaseModel
from typing import Literal
from datetime import date


# Общая база для IGS и LabTest
class DocumentBase(BaseModel):
    title: str
    axes: str
    marks: str
    date: date
    file_url: str
    scope_type: Literal["site", "object", "zone"]
    scope_id: int


# === IGS ===
class IGSCreate(DocumentBase):
    pass


class IGSRead(DocumentBase):
    id: int

    class Config:
        from_attributes = True


# === LabTest ===
class LabTestCreate(DocumentBase):
    pass


class LabTestRead(DocumentBase):
    id: int

    class Config:
        from_attributes = True