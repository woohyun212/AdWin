from fastapi import APIRouter
import jwt
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

SECERT_KEY = "YOUR_FAST_API_SECRET_KEY"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 800

test_user = {
    "username": "test",
    "password": "aaa",

}

router = APIRouter(prefix='/auth',
                   tags=['Login'])


class LoginItem(BaseModel):
    username: str
    password: str



@router.post("login")
async def user_login(loginitem: LoginItem):
    data = jsonable_encoder(loginitem)

    if data['username'] == test_user['username'] and data['password'] == test_user['password']:

        encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt}

    else:
        return {"message": "login failed"}


@router.post("register")
async def user_register(loginitem: LoginItem):
    data = jsonable_encoder(loginitem)

    if data['username'] == test_user['username'] and data['password'] == test_user['password']:

        encoded_jwt = jwt.encode(data, SECERT_KEY, algorithm=ALGORITHM)
        return {"token": encoded_jwt}

    else:
        return {"message": "login failed"}
