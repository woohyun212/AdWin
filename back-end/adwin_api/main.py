from typing import List
from fastapi import FastAPI, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from starlette import status
from starlette.responses import JSONResponse

import database as db
from models import *

from pprint import pprint

app = FastAPI()


@app.post("/users", response_description="Add new user", response_model=UserModelIn)
async def create_user(user_data: UserModelIn = Body()):
    user_data = jsonable_encoder(user_data)
    user_data["created_at"] = str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    new_user = await db.user_collection.insert_one(user_data)
    created_user = await db.user_collection.find_one({"_id": new_user.inserted_id})
    try:
        del created_user['password']
    except KeyError:
        pass
    return JSONResponse(status_code=status.HTTP_201_CREATED,
                        content=created_user)


@app.get("/users", response_description="List all users", response_model=List[UserModelOut])
async def list_users():
    # print(type(db.user_collection.find()))
    # print(type(x async for x in db.user_collection.find()))
    # TODO: Search "What is an `async_generator`"
    return [document async for document in db.user_collection.find()]


@app.get("/users/{user_id}", response_description="Get a user by id", response_model=UserModelOut)
async def get_user(user_id: str):
    user = await db.user_collection.find_one({"_id": user_id})
    return user


@app.patch("/user/{user_id}", response_description="Update a User", response_model=UpdateUserModel)
async def update_user(user_id: str, user: UpdateUserModel = Body(...)):
    user = {k: v for k, v in user.dict().items() if v is not None}
    if user != {}:
        update_result = await db.user_collection.update_one({"_id": user_id}, {"$set": user})  # await
        if update_result.modified_count == 1:
            if (
                    updated_user := await db.user_collection.find_one({"_id": user_id})
            ) is not None:
                return updated_user
    # 변경 점이 없으면
    if (existing_user := await db.user_collection.find_one({"_id": user_id})) is not None:
        return existing_user
    raise HTTPException(status_code=404, detail=f"User {user_id} is not found")


@app.delete("/user/{user_id}")
async def delete_user(user_id: str):
    is_valid = True  # TODO: Create method to check this request is valid.
    if is_valid and ((db.user_collection.find_one({"_id": user_id})) is not None):
        await db.user_collection.delete_one({"_id": user_id})
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content={"config": "User has been deleted successfully"})
    raise HTTPException(status_code=404, detail=f"User {user_id} is not found")


@app.post("/posts", response_description="Add new post", response_model=PostModelIn)
async def create_post(post_data: PostModelIn = Body(...)):
    post_data = jsonable_encoder(post_data)
    post_data["created_at"] = str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    pprint(post_data)
    new_post = await db.post_collection.insert_one(post_data)
    created_post = await db.post_collection.find_one({"_id": new_post.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED,
                        content=created_post)
