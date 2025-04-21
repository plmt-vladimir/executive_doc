from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

from common.dependencies import get_session
from modules.core.models import transfer as models
from modules.core.schemas import transfer as schemas

router = APIRouter(prefix="/transfer", tags=["Передача исполнительной документации"])

# === Transfer Documents ===
@router.post("/", response_model=schemas.TransferDocumentRead)
async def create_transfer_document(
    item: schemas.TransferDocumentCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.TransferDocument(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/", response_model=List[schemas.TransferDocumentRead])
async def get_all_transfer_documents(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.TransferDocument))
    return result.scalars().all()


@router.get("/{id}", response_model=schemas.TransferDocumentRead)
async def get_transfer_document(id: int, session: AsyncSession = Depends(get_session)):
    doc = await session.get(models.TransferDocument, id)
    if not doc:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return doc


@router.patch("/{id}", response_model=schemas.TransferDocumentRead)
async def update_transfer_document(id: int, item: schemas.TransferDocumentCreate, session: AsyncSession = Depends(get_session)):
    doc = await session.get(models.TransferDocument, id)
    if not doc:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in item.dict().items():
        setattr(doc, key, value)
    session.add(doc)
    await session.commit()
    await session.refresh(doc)
    return doc


@router.delete("/{id}")
async def delete_transfer_document(id: int, session: AsyncSession = Depends(get_session)):
    doc = await session.get(models.TransferDocument, id)
    if not doc:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(doc)
    await session.commit()
    return {"detail": "Удалено"}


# === Transfer Document Links ===
@router.post("/links", response_model=schemas.TransferDocumentLinkRead)
async def create_transfer_link(
    item: schemas.TransferDocumentLinkCreate,
    session: AsyncSession = Depends(get_session)
):
    obj = models.TransferDocumentLink(**item.dict())
    session.add(obj)
    await session.commit()
    await session.refresh(obj)
    return obj


@router.get("/links", response_model=List[schemas.TransferDocumentLinkRead])
async def get_all_transfer_links(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(models.TransferDocumentLink))
    return result.scalars().all()


@router.get("/links/{id}", response_model=schemas.TransferDocumentLinkRead)
async def get_transfer_link(id: int, session: AsyncSession = Depends(get_session)):
    link = await session.get(models.TransferDocumentLink, id)
    if not link:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return link


@router.patch("/links/{id}", response_model=schemas.TransferDocumentLinkRead)
async def update_transfer_link(id: int, item: schemas.TransferDocumentLinkCreate, session: AsyncSession = Depends(get_session)):
    link = await session.get(models.TransferDocumentLink, id)
    if not link:
        raise HTTPException(status_code=404, detail="Объект не найден")
    for key, value in item.dict().items():
        setattr(link, key, value)
    session.add(link)
    await session.commit()
    await session.refresh(link)
    return link


@router.delete("/links/{id}")
async def delete_transfer_link(id: int, session: AsyncSession = Depends(get_session)):
    link = await session.get(models.TransferDocumentLink, id)
    if not link:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(link)
    await session.commit()
    return {"detail": "Удалено"}
