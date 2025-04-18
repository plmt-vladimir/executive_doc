from sqlalchemy import Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from common.database import Base
from datetime import date

class AOOK(Base):
    __tablename__ = "aooks"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    act_number: Mapped[str]
    full_name: Mapped[str]
    status: Mapped[str]
    start_date: Mapped[date]
    end_date: Mapped[date]
    sign_date: Mapped[date]
    zone_id: Mapped[int] = mapped_column(ForeignKey("construction_zones.id"), nullable=True)
    object_id: Mapped[int] = mapped_column(ForeignKey("construction_objects.id"), nullable=True)
    code: Mapped[str]
    axes: Mapped[str]
    marks: Mapped[str]
    notes: Mapped[str]

    sections = relationship("AOOK_Section", back_populates="aook")
    sp_links = relationship("AOOK_SP", back_populates="aook")
    igs_links = relationship("AOOK_IGS", back_populates="aook")
    labtest_links = relationship("AOOK_LabTest", back_populates="aook")
    responsible = relationship("AOOK_Responsible", back_populates="aook")
    aosr_links = relationship("AOOK_AOSR", back_populates="aook")
    materials = relationship("AOOK_Material", back_populates="aook")

class AOOK_Section(Base):
    __tablename__ = "aook_sections"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    aook_id: Mapped[int] = mapped_column(ForeignKey("aooks.id"))
    title: Mapped[str]
    code: Mapped[str]
    sheets: Mapped[str]

    aook = relationship("AOOK", back_populates="sections")

class AOOK_SP(Base):
    __tablename__ = "aook_sp"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    aook_id: Mapped[int] = mapped_column(ForeignKey("aooks.id"))
    sp_id: Mapped[int] = mapped_column(ForeignKey("sp.id"))

    aook = relationship("AOOK", back_populates="sp_links")

class AOOK_IGS(Base):
    __tablename__ = "aook_igs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    aook_id: Mapped[int] = mapped_column(ForeignKey("aooks.id"))
    igs_id: Mapped[int] = mapped_column(ForeignKey("igs.id"))

    aook = relationship("AOOK", back_populates="igs_links")

class AOOK_LabTest(Base):
    __tablename__ = "aook_labtests"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    aook_id: Mapped[int] = mapped_column(ForeignKey("aooks.id"))
    lab_test_id: Mapped[int] = mapped_column(ForeignKey("labtests.id"))

    aook = relationship("AOOK", back_populates="labtest_links")

class AOOK_Responsible(Base):
    __tablename__ = "aook_responsibles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    aook_id: Mapped[int] = mapped_column(ForeignKey("aooks.id"))
    employee_id: Mapped[int] = mapped_column(ForeignKey("org_employees.id"))
    role: Mapped[str]

    aook = relationship("AOOK", back_populates="responsible")

class AOOK_AOSR(Base):
    __tablename__ = "aook_aosr"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    aook_id: Mapped[int] = mapped_column(ForeignKey("aooks.id"))
    aosr_id: Mapped[int] = mapped_column(ForeignKey("aosr.id"))

    aook = relationship("AOOK", back_populates="aosr_links")

class AOOK_Material(Base):
    __tablename__ = "aook_materials"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    aook_id: Mapped[int] = mapped_column(ForeignKey("aooks.id"))
    stored_material_id: Mapped[int] = mapped_column(ForeignKey("stored_materials.id"))

    aook = relationship("AOOK", back_populates="materials")
