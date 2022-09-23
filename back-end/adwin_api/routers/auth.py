from fastapi import APIRouter
import jwt

from fastapi.encoders import jsonable_encoder

from models import *
from utils import *
import database as db
from config import SECRET_KEY
from datetime import datetime, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext

HASH_ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRES_MINUTES = 800

router = APIRouter(prefix='/auth',
                   tags=['Auth'])


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


# to get a string like this run:
# openssl rand -hex 32
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
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
