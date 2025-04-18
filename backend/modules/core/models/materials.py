from sqlalchemy import String, Integer, ForeignKey, Float, Text
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import date
from common.database import Base


class MaterialReference(Base):
    __tablename__ = "material_references"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str]
    type: Mapped[str]
    unit: Mapped[str]

    deliveries = relationship("DeliveredMaterial", back_populates="material")


class QualityDocument(Base):
    __tablename__ = "quality_documents"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    type: Mapped[str]
    number: Mapped[str]
    issue_date: Mapped[date]
    expiry_date: Mapped[date]
    file_url: Mapped[str]

    delivered_materials = relationship("DeliveredMaterial", back_populates="quality_document")


class Delivery(Base):
    __tablename__ = "deliveries"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    supplier: Mapped[str]
    supply_type: Mapped[str]
    record_number: Mapped[str]
    invoice_number: Mapped[str]
    record_date: Mapped[date]
    invoice_date: Mapped[date]
    invoice_file_url: Mapped[str]
    note: Mapped[str]

    materials = relationship("DeliveredMaterial", back_populates="delivery")


class DeliveredMaterial(Base):
    __tablename__ = "delivered_materials"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    delivery_id: Mapped[int] = mapped_column(ForeignKey("deliveries.id"))
    material_id: Mapped[int] = mapped_column(ForeignKey("material_references.id"))
    quantity: Mapped[float]
    quality_doc_id: Mapped[int] = mapped_column(ForeignKey("quality_documents.id"))

    delivery = relationship("Delivery", back_populates="materials")
    material = relationship("MaterialReference", back_populates="deliveries")
    quality_document = relationship("QualityDocument", back_populates="delivered_materials")
    write_offs = relationship("StorageWriteOff", back_populates="delivered_material")


class StorageWriteOff(Base):
    __tablename__ = "storage_write_offs"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    delivered_material_id: Mapped[int] = mapped_column(ForeignKey("delivered_materials.id"))
    zone_id: Mapped[int] = mapped_column(ForeignKey("construction_zones.id"))
    quantity: Mapped[float]

    delivered_material = relationship("DeliveredMaterial", back_populates="write_offs")
    stored_material = relationship("StoredMaterial", back_populates="write_off", uselist=False)


class StoredMaterial(Base):
    __tablename__ = "stored_materials"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    storage_write_off_id: Mapped[int] = mapped_column(ForeignKey("storage_write_offs.id"))

    write_off = relationship("StorageWriteOff", back_populates="stored_material")