from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from starlette import status
from fastapi.responses import JSONResponse

import database as db
from authentication import is_valid
from models import UserModelIn, UserModelOut, UpdateUserModel
from utils import *

router = APIRouter(prefix='/users',
                   tags=['Users'],
                   responses={404: {"description": "Not found"}}, )


# User 관련 Endpoints
@router.post("", response_description="Add new user", response_model=UserModelIn)
async def create_user(user_data: UserModelIn = Body()):
    user_data: dict = jsonable_encoder(user_data)
    user_data["created_at"] = str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    user_data.pop("password_check")
    new_user = await db.user_collection.insert_one(user_data)
    created_user = await db.user_collection.find_one({"_id": new_user.inserted_id},
                                                     projection={"password": False,
                                                                 "username": False,
                                                                 "created_at": False,
                                                                 "email": False})
    return created_user


@router.get("/{user_id}", response_description="Get a user by id", response_model=UserModelOut)
async def get_user(user_id: str):
    user = await db.user_collection.find_one({"_id": user_id})
    return user


@router.patch("/{user_id}", response_description="Update a User", response_model=UpdateUserModel)
async def update_user(user_id: str, update_data: UpdateUserModel = Body(...)):
    update_data = {k: v for k, v in update_data.dict().items() if v is not None}
    if update_data != {}:
        update_result = await db.user_collection.update_one({"_id": user_id}, {"$set": update_data})  # await
        if update_result.modified_count == 1:
            if (
                    updated_user := await db.user_collection.find_one({"_id": user_id})
            ) is not None:
                return updated_user
    # 변경 점이 없으면
    if (existing_user := await db.user_collection.find_one({"_id": user_id})) is not None:
        return existing_user
    raise HTTPException(status_code=404, detail=f"User {user_id} is not found")


@router.delete("/{user_id}", response_description="Delete a user")
async def delete_user(user_id: str):
    if is_valid(user_id) and await db.user_collection.find_one({"_id": user_id}) is not None:
        await db.user_collection.delete_one({"_id": user_id})
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content={"config": "User has been deleted successfully"})
    raise HTTPException(status_code=404, detail=f"User {user_id} is not found")
