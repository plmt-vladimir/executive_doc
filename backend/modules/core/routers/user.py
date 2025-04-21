from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import Optional
from pydantic import ValidationError

from common.database import AsyncSessionLocal
from modules.core.models.user import User
from modules.core.schemas.user import UserCreate, UserRead
from modules.core.services.auth import decode_access_token, get_password_hash, TokenData

router = APIRouter(prefix="/users", tags=["Users"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_session():
    async with AsyncSessionLocal() as session:
        yield session


# === Получение текущего пользователя ===
@router.get("/me", response_model=UserRead)
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: AsyncSession = Depends(get_session)
):
    token_data: Optional[TokenData] = decode_access_token(token)
    if not token_data:
        raise HTTPException(status_code=401, detail="Неверный токен")

    result = await session.execute(select(User).where(User.email == token_data.email))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="Пользователь не найден")

    try:
        return UserRead.model_validate(user, from_attributes=True)
    except ValidationError as e:
        return JSONResponse(status_code=422, content={"detail": e.errors()})


# === Создание ===
@router.post("/", response_model=UserRead)
# roles: ["admin"]
async def create_user(user: UserCreate, session: AsyncSession = Depends(get_session)):
    new_user = User(
        name=user.name,
        email=user.email,
        role=user.role,
        hashed_password=get_password_hash(user.password)
    )
    session.add(new_user)
    await session.commit()
    await session.refresh(new_user)
    return new_user


# === Получение всех ===
@router.get("/", response_model=list[UserRead])
# roles: ["admin"]
async def list_users(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(User))
    return result.scalars().all()


# === Получение по ID ===
@router.get("/{id}", response_model=UserRead)
# roles: ["admin"]
async def get_user(id: int, session: AsyncSession = Depends(get_session)):
    db_user = await session.get(User, id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Объект не найден")
    return db_user


# === Обновление ===
@router.patch("/{id}", response_model=UserRead)
# roles: ["admin"]
async def update_user(id: int, user: UserCreate, session: AsyncSession = Depends(get_session)):
    db_user = await session.get(User, id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Объект не найден")

    db_user.name = user.name
    db_user.email = user.email
    db_user.role = user.role
    if user.password:
        db_user.hashed_password = get_password_hash(user.password)

    session.add(db_user)
    await session.commit()
    await session.refresh(db_user)
    return db_user


# === Удаление ===
@router.delete("/{id}")
# roles: ["admin"]
async def delete_user(id: int, session: AsyncSession = Depends(get_session)):
    db_user = await session.get(User, id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Объект не найден")
    await session.delete(db_user)
    await session.commit()
    return {"detail": "Удалено"}