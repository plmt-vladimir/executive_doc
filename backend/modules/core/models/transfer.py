from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey
from common.database import Base
from typing import Optional
from datetime import date


class TransferDocument(Base):
    __tablename__ = "transfer_documents"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str]
    number: Mapped[str]
    date: Mapped[date]
    file_url: Mapped[str]

    links = relationship("TransferDocumentLink", back_populates="document")


class TransferDocumentLink(Base):
    __tablename__ = "transfer_document_links"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    transfer_document_id: Mapped[int] = mapped_column(ForeignKey("transfer_documents.id"))
    aook_id: Mapped[Optional[int]] = mapped_column(ForeignKey("aooks.id"), nullable=True)
    aosr_id: Mapped[Optional[int]] = mapped_column(ForeignKey("aosr.id"), nullable=True)

    document = relationship("TransferDocument", back_populates="links")