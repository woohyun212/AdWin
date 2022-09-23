from fastapi import APIRouter, Body, HTTPException, status, Depends
from fastapi.encoders import jsonable_encoder


from fastapi.responses import JSONResponse

import database as db
from models import LikesModelIn, LikesInitModel
from utils import *
from routers.auth import get_current_active_user

router = APIRouter(prefix='/likes',
                   tags=['Likes'],
                   responses={404: {"description": "Not found"}})


@router.post("", response_description="Initialize a new like")
async def initialize_likes(init_data: LikesInitModel):
    init_data = jsonable_encoder(init_data)
    init_data["ids_clicked_like"] = []
    init_data["count"] = 0
    if await db.like_collection.find_one({"target_id": init_data["target_id"]}) is None:
        await db.like_collection.insert_one(init_data)
        return 0
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="The 'like' information already exists.")


@router.put("", response_description="Like posts or comments")
async def likes_to_target(likes_data: LikesModelIn = Body(...),
                          current_user: get_current_active_user = Depends()):
    """
    Like a single object(posts or comments)
    :param current_user:
    :param likes_data: POST BODY data
    :return: count of likes in Integer
    """
    likes_data = jsonable_encoder(likes_data)
    if current_user:
        like_doc = await db.like_collection.find_one({"target_id": likes_data["target_id"]})
        if like_doc is not None:
            if current_user["_id"] not in like_doc["ids_clicked_like"]:
                like_doc["ids_clicked_like"].append(current_user["_id"])
                like_doc["count"] += 1
                await db.like_collection.update_one({"target_id": likes_data["target_id"]}, {"$set": like_doc})
                new_like_doc = await db.like_collection.find_one({"target_id": likes_data["target_id"]})
                return new_like_doc["count"]
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Already pressed \"Like\"")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Target to \"Like\" is not initialized.")
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"request is invalid")


@router.get("", response_description="Get \"like\" count")
async def get_likes_data(target_id: str):
    """
    `Get` "like" count
    :param target_id:
    :return: int
    """
    if (like_doc := (await db.like_collection.find_one({"target_id": target_id}))) is not None:
        return like_doc
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"request is invalid")


@router.delete("/{target_id}", response_description="Delete \"like\" information")
async def delete_like(target_id: str):
    """
    `Delete` "like" information
    :param target_id:
    :return: None
    """
    if await db.like_collection.find_one({"target_id": target_id}) is not None:
        await db.like_collection.delete_one({"target_id": target_id})
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content={"config": "\"like\" information has been deleted successfully"})
    raise HTTPException(status_code=404, detail=f"Target \"{target_id}\" does not exist")
