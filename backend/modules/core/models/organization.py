from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship, Mapped, mapped_column
from common.database import Base
from datetime import date


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    ogrn: Mapped[str]
    inn: Mapped[str]
    address: Mapped[str]
    phone: Mapped[str]
    license_name: Mapped[str]
    license_date: Mapped[date]
    sro_number: Mapped[str]
    sro_ogrn: Mapped[str]
    sro_inn: Mapped[str]

    employees = relationship("OrgEmployee", back_populates="organization")
    roles = relationship("OrgRoleAssignment", back_populates="organization")


class OrgEmployee(Base):
    __tablename__ = "org_employees"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    organization_id: Mapped[int] = mapped_column(ForeignKey("organizations.id"))
    full_name: Mapped[str]
    position: Mapped[str]
    ins: Mapped[str]
    decree_number: Mapped[str]

    organization = relationship("Organization", back_populates="employees")


class OrgRoleAssignment(Base):
    __tablename__ = "org_role_assignments"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    organization_id: Mapped[int] = mapped_column(ForeignKey("organizations.id"))
    construction_site_id: Mapped[int] = mapped_column(ForeignKey("construction_sites.id"), nullable=True)
    construction_object_id: Mapped[int] = mapped_column(ForeignKey("construction_objects.id"), nullable=True)
    role: Mapped[str]

    organization = relationship("Organization", back_populates="roles")
