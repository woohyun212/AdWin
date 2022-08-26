from typing import Optional

from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from starlette import status
from starlette.responses import JSONResponse

import database as db
from authentication import is_valid
from models import PostModelIn, UpdatePostModel, PostType, RecruitType
from utils import *

router = APIRouter(prefix='/posts',
                   tags=['Posts'],
                   responses={404: {"description": "Not found"}}, )


# Post 관련 Endpoints
@router.post("", response_description="Add new post", response_model=PostModelIn)
async def create_post(post_type: PostType, recruit_type: RecruitType | None = None,
                      post_data: PostModelIn = Body(...)):
    """ Post 글 생성합니다."""
    post_data = jsonable_encoder(post_data)
    user_id = post_data["user_id"]
    if post_type == PostType.CounselorRecruit and recruit_type is None:
        raise HTTPException(status_code=400, detail="required parameter `recruit_type` missing")
    if post_type != PostType.CounselorRecruit:
        recruit_type = None
        if post_type == PostType.RealEstateNews:
            post_data["area"] = None
    if is_valid(user_id) and ((db.user_collection.find_one({"_id": user_id})) is not None):
        initialize_data(data=post_data, post_type=post_type, recruit_type=recruit_type)
        new_post = await db.post_collection.insert_one(post_data)
        created_post = await db.post_collection.find_one({"_id": new_post.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_post)
    if user_id is None:
        raise HTTPException(status_code=400, detail=f"Post {user_id} is not found")
    raise HTTPException(status_code=400, detail=f"What are you doing now?")


@router.get("/{post_id}", response_description="Get a post")
async def get_post(post_id: str):
    if (post_detail := await db.post_collection.find_one({"_id": post_id})) is not None:
        post_detail = await drop_none(post_detail)
        # 댓글 불러오는 거부터 시작하면됨 ㅇㅇㅇㅇ
        post_detail["comments"] = await db.comment_collection.find({"article": post_id})
        return post_detail
    raise HTTPException(status_code=404, detail=f"Post {post_id} is not found")


@router.patch("/{post_id}", response_description="Update a post", response_model=UpdatePostModel)
async def update_post(post_id: str, update_data: UpdatePostModel = Body(...)):
    update_data = {k: v for k, v in update_data.dict().items() if v is not None}
    if update_data:
        update_result = await db.post_collection.update_one({"_id": post_id}, {"$set": update_data})
        if update_result.modified_count == 1:
            if (updated_post := await db.post_collection.find_one({"_id": post_id})) is not None:
                return updated_post
    if (existing_post := await db.user_collection.find_one({"_id": post_id})) is not None:
        return existing_post
    raise HTTPException(status_code=404, detail=f"Post {post_id} is not found")


@router.delete("/{post_id}", response_description="Delete a post")
async def delete_post(post_id: str):
    if is_valid(post_id) and await db.post_collection.find_one({"_id": post_id}) is not None:
        await db.post_collection.delete_one({"_id": post_id})
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content={"config": "Post has been deleted successfully"})
    raise HTTPException(status_code=404, detail=f"Post {post_id} is not found")
