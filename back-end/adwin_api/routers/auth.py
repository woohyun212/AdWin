from fastapi import APIRouter, HTTPException, Body
import jwt
from pydantic import BaseModel, EmailStr
from fastapi.encoders import jsonable_encoder
from starlette import status
from starlette.responses import JSONResponse

from models import UserModelIn
from routers.users import create_user
from utils import *
from typing import Optional
import database as db

SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

test_user = {
    "username": "test",
    "password": "aaa",

}

router = APIRouter(prefix='/auth',
                   tags=['Login'])


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


@router.post("/login")
async def user_login(loginitem: LoginModel):
    data = jsonable_encoder(loginitem)
    if data['username'] == test_user['username'] and data['password'] == test_user['password']:
        encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt}

    else:
        return {"message": "login failed"}


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
        result = await create_user(register_data)
        encoded_jwt = jwt.encode(result, SECERT_KEY, algorithm=ALGORITHM)
        result["token"] = encoded_jwt
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=result)
    # return {"message": "login failed"}


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
