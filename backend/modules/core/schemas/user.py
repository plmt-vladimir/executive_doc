from pydantic import BaseModel, EmailStr, Field
from pydantic import ConfigDict

class UserBase(BaseModel):
    name: str = Field()
    email: EmailStr = Field()
    role: str = Field()

    model_config = ConfigDict(from_attributes=True)


class UserCreate(UserBase):
    password: str = Field()


class UserRead(UserBase):
    id: int = Field()