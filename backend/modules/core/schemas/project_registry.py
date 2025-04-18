from pydantic import BaseModel
from typing import Optional


class ProjectRegistryBase(BaseModel):
    code: str
    name: str
    description: Optional[str] = None
    level: int
    parent_id: Optional[int] = None


class ProjectRegistryCreate(ProjectRegistryBase):
    pass


class ProjectRegistryRead(ProjectRegistryBase):
    id: int

    class Config:
        from_attributes = True