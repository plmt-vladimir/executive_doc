from pydantic import BaseModel

class SPBase(BaseModel):
    code: str
    name: str
    pdf_url: str

class SPCreate(SPBase):
    pass

class SPRead(SPBase):
    id: int

    class Config:
        orm_mode = True