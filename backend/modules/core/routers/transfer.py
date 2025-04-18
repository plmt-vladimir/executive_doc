from fastapi import APIRouter, Depends
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
