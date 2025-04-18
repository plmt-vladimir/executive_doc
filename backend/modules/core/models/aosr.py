from sqlalchemy import String, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from modules.core.models.base import Base
from datetime import date

class AOSR(Base):
    __tablename__ = "aosr"

    id: Mapped[int] = mapped_column(primary_key=True)
    act_number: Mapped[str]
    full_name: Mapped[str]
    start_date: Mapped[date]
    end_date: Mapped[date]
    sign_date: Mapped[date]
    status: Mapped[str]
    registry_code: Mapped[str]
    type_code: Mapped[str]
    section_code: Mapped[str]
    aooc_id: Mapped[int] = mapped_column(ForeignKey("aooks.id"), nullable=True)

    # Привязка к зоне или объекту
    zone_id: Mapped[int] = mapped_column(ForeignKey("construction_zones.id"), nullable=True)
    object_id: Mapped[int] = mapped_column(ForeignKey("construction_objects.id"), nullable=True)

    # Связи
    sections = relationship("AOSRSection", back_populates="aosr")
    sps = relationship("AOSR_SP", back_populates="aosr")
    materials = relationship("AOSRMaterial", back_populates="aosr")
    igs = relationship("AOSR_IGS", back_populates="aosr")
    labtests = relationship("AOSR_LabTest", back_populates="aosr")
    responsibles = relationship("AOSRResponsible", back_populates="aosr")


class AOSRSection(Base):
    __tablename__ = "aosr_sections"

    id: Mapped[int] = mapped_column(primary_key=True)
    aosr_id: Mapped[int] = mapped_column(ForeignKey("aosr.id"))
    title: Mapped[str]
    code: Mapped[str]
    sheets: Mapped[str]

    aosr = relationship("AOSR", back_populates="sections")


class AOSR_SP(Base):
    __tablename__ = "aosr_sp"

    id: Mapped[int] = mapped_column(primary_key=True)
    aosr_id: Mapped[int] = mapped_column(ForeignKey("aosr.id"))
    sp_id: Mapped[int] = mapped_column(ForeignKey("sp.id"))

    aosr = relationship("AOSR", back_populates="sps")


class AOSRMaterial(Base):
    __tablename__ = "aosr_materials"

    id: Mapped[int] = mapped_column(primary_key=True)
    aosr_id: Mapped[int] = mapped_column(ForeignKey("aosr.id"))
    stored_material_id: Mapped[int] = mapped_column(ForeignKey("stored_materials.id"))

    aosr = relationship("AOSR", back_populates="materials")


class AOSR_IGS(Base):
    __tablename__ = "aosr_igs"

    id: Mapped[int] = mapped_column(primary_key=True)
    aosr_id: Mapped[int] = mapped_column(ForeignKey("aosr.id"))
    igs_id: Mapped[int] = mapped_column(ForeignKey("igs.id"))

    aosr = relationship("AOSR", back_populates="igs")


class AOSR_LabTest(Base):
    __tablename__ = "aosr_labtests"

    id: Mapped[int] = mapped_column(primary_key=True)
    aosr_id: Mapped[int] = mapped_column(ForeignKey("aosr.id"))
    lab_test_id: Mapped[int] = mapped_column(ForeignKey("labtests.id"))

    aosr = relationship("AOSR", back_populates="labtests")


class AOSRResponsible(Base):
    __tablename__ = "aosr_responsibles"

    id: Mapped[int] = mapped_column(primary_key=True)
    aosr_id: Mapped[int] = mapped_column(ForeignKey("aosr.id"))
    employee_id: Mapped[int] = mapped_column(ForeignKey("org_employees.id"))
    role: Mapped[str]

    aosr = relationship("AOSR", back_populates="responsibles")
