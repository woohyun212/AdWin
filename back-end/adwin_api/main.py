from typing import List
from fastapi import FastAPI, Body
from fastapi.encoders import jsonable_encoder
from starlette import status
from starlette.responses import JSONResponse

import database
from pprint import pprint
from models import *

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.post("/", response_description="Add new user", response_model=UserModelIn)
async def create_student(user: UserModelIn = Body(...)):
    user = jsonable_encoder(user)
    user["created_at"] = str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    new_user = database.db["User"].insert_one(user)
    created_user = database.db["User"].find_one({"_id": new_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)


@app.get("/users", response_description="List all users", response_model=List[UserModelOut])
async def list_students():
    users = database.db["User"].find()
    return list(users)
