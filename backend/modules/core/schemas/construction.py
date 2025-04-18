from pydantic import BaseModel
from typing import Optional


class ConstructionSiteBase(BaseModel):
    full_name: str
from pydantic import BaseModel, Field
from typing import Optional
from pydantic import ConfigDict


class ConstructionSiteBase(BaseModel):
    full_name: str = Field()
    short_name: Optional[str] = None
    address: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ConstructionSiteCreate(ConstructionSiteBase):
    pass


class ConstructionSiteRead(ConstructionSiteBase):
    id: int = Field()


class ConstructionObjectBase(BaseModel):
    site_id: int = Field()
    full_name: str = Field()
    short_name: Optional[str] = None
    address: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ConstructionObjectCreate(ConstructionObjectBase):
    pass


class ConstructionObjectRead(ConstructionObjectBase):
    id: int = Field()


class ConstructionZoneBase(BaseModel):
    object_id: int = Field()
    name: str = Field()
    address: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class ConstructionZoneCreate(ConstructionZoneBase):
    pass


class ConstructionZoneRead(ConstructionZoneBase):
    id: int = Field()