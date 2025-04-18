from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Integer, Enum
from common.database import Base
from datetime import date
import enum


class ScopeType(enum.Enum):
    site = "site"
    object = "object"
    zone = "zone"


class IGS(Base):
    __tablename__ = "igs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str]
    axes: Mapped[str]
    marks: Mapped[str]
    date: Mapped[date]
    file_url: Mapped[str]
    scope_type: Mapped[ScopeType]
    scope_id: Mapped[int]


class LabTest(Base):
    __tablename__ = "labtests"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str]
    axes: Mapped[str]
    marks: Mapped[str]
    date: Mapped[date]
    file_url: Mapped[str]
    scope_type: Mapped[ScopeType]
    scope_id: Mapped[int]