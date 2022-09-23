from fastapi import APIRouter, HTTPException, Body
import jwt

from pydantic import BaseModel, EmailStr
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse

from models import UserModelIn, UserModelBase, UserModelOut
from routers.users import create_user
from utils import *
from typing import Optional
import database as db
from config import SECRET_KEY

HASH_ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRES_MINUTES = 800

router = APIRouter(prefix='/auth',
                   tags=['Auth'])


class LoginModel(BaseModel):
    username: str
    password: str


class RegisterItem(BaseModel):
    nickname: str
    username: str
    email: EmailStr
    password: str
    password_check: str
    profile_image: Optional[str]


class TokenModel(BaseModel):
    access_token: str


@router.post("/register")
async def user_register(register_data: UserModelIn = Body(...)):
    register_data = jsonable_encoder(register_data)
    if await db.user_collection.find_one({"email": register_data["email"]}) is not None:
        raise HTTPException(status_code=400, detail=f"이미 가입된 이메일이 존재합니다.")
    elif await db.user_collection.find_one({"username": register_data["username"]}) is not None:
        raise HTTPException(status_code=400, detail=f"동일한 아이디가 존재합니다.")
    elif register_data["password"] != register_data["password_check"]:
        raise HTTPException(status_code=400, detail=f"passwords are not correct!")
    else:
        created_user = await create_user(register_data)
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        profile_image = created_user.pop("profile_image")
        access_token = create_access_token(
            data=created_user, expires_delta=access_token_expires
        )
        return JSONResponse(status_code=status.HTTP_201_CREATED,
                            content={"profile_image": profile_image,
                                     "access_token": access_token,
                                     "token_type": "bearer"})


@router.get("/check_username/{username}")
async def is_username_existed(username: str):
    if await db.user_collection.find_one({"username": username}) is not None:
        return False
    return True


@router.get("/check_email/{email}")
async def is_email_existed(email: EmailStr):
    if await db.user_collection.find_one({"email": email}) is not None:
        return False
    return True


################################################################################
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

# to get a string like this run:
# openssl rand -hex 32
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class TokenAndProfileImage(BaseModel):
    access_token: str
    token_type: str
    profile_image: Optional[str]


class TokenData(BaseModel):
    username: str | None = None


class UserInDB(UserModelBase):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


async def get_user_by_username(username: str):
    if (user := await db.user_collection.find_one({"username": username})) is not None:
        user_dict = jsonable_encoder(user)
        return user_dict


async def authenticate_user(username: str, password: str):
    user = await get_user_by_username(username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = await get_user_by_username(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(current_user=Depends(get_current_user)):
    if current_user["disabled"]:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@router.post("/token", response_model=TokenAndProfileImage)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user: dict = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    user.pop("hashed_password")
    profile_image = user.pop("profile_image")
    access_token = create_access_token(
        data=user, expires_delta=access_token_expires
    )
    return {"profile_image": profile_image,
            "access_token": access_token,
            "token_type": "bearer"}


@router.get("/users/me/")
async def read_users_me(current_user=Depends(get_current_active_user)):
    # current_user.pop('profile_image')
    return current_user


@router.get("/users/me/items/")
async def read_own_items(current_user=Depends(get_current_active_user)):
    # current_user.pop('profile_image')
    return current_user
