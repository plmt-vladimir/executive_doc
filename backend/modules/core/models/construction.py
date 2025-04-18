from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from modules.core.models.base import Base

class ConstructionSite(Base):
    __tablename__ = "construction_sites"

    id = Column(Integer, primary_key=True)
    full_name = Column(String, nullable=False)
    short_name = Column(String)
    address = Column(String)

    objects = relationship("ConstructionObject", back_populates="site")


class ConstructionObject(Base):
    __tablename__ = "construction_objects"

    id = Column(Integer, primary_key=True)
    site_id = Column(Integer, ForeignKey("construction_sites.id"))
    full_name = Column(String, nullable=False)
    short_name = Column(String)
    address = Column(String)

    site = relationship("ConstructionSite", back_populates="objects")
    zones = relationship("ConstructionZone", back_populates="object")


class ConstructionZone(Base):
    __tablename__ = "construction_zones"

    id = Column(Integer, primary_key=True)
    object_id = Column(Integer, ForeignKey("construction_objects.id"))
    name = Column(String, nullable=False)
    address = Column(String)

    object = relationship("ConstructionObject", back_populates="zones")