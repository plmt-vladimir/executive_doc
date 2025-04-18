from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from modules.core.models.sp import SP
from modules.core.schemas.sp import SPCreate, SPRead
from common.dependencies import get_session
from sqlalchemy.future import select

router = APIRouter(prefix="/sp", tags=["SP"])

@router.post("/", response_model=SPRead)
async def create_sp(sp_data: SPCreate, session: AsyncSession = Depends(get_session)):
    sp = SP(**sp_data.dict())
    session.add(sp)
    await session.commit()
    await session.refresh(sp)
    return sp

@router.get("/", response_model=list[SPRead])
async def list_sp(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(SP))
    return result.scalars().all()