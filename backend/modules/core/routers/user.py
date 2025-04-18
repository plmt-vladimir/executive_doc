from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from common.database import AsyncSessionLocal
from modules.core.models.user import User
from modules.core.schemas.user import UserCreate, UserRead

import hashlib

router = APIRouter(prefix="/users", tags=["Users"])

async def get_session():
    async with AsyncSessionLocal() as session:
        yield session


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


@router.post("/", response_model=UserRead)
async def create_user(user: UserCreate, session: AsyncSession = Depends(get_session)):
    new_user = User(
        name=user.name,
        email=user.email,
        role=user.role,
        password_hash=hash_password(user.password)
    )
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return new_user


@router.get("/", response_model=list[UserRead])
async def list_users(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User))
    return result.scalars().all()