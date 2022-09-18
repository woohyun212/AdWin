from fastapi import APIRouter, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from starlette import status
from fastapi.responses import JSONResponse

import database as db
from authentication import is_valid
from models import *
from routers.likes import delete_like, get_likes_data
from routers.users import get_user
from utils import *

router = APIRouter(prefix='',
                   tags=['Comments'],
                   responses={404: {"description": "Not found"}}, )


# Comment 관련 Endpoints
@router.post("/{post_id}/comments", response_description="Add new comment", response_model=CommentModelIn)
async def create_comment(post_id: str, comment_data: CommentModelIn = Body(...)):
    """Create Comment"""
    comment_data = jsonable_encoder(comment_data)
    user = (await db.user_collection.find_one({"_id": comment_data["user_id"]}))
    if is_valid(user["_id"]) and (user is not None):
        if post := (await db.post_collection.find_one({"_id": post_id})) is not None:
            await initialize_data(comment_data, user_id=user["_id"], post_id=post_id)
            new_comment = await db.comment_collection.insert_one(comment_data)
            created_comment = await db.comment_collection.find_one({"_id": new_comment.inserted_id})
            return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_comment)
    if user is None:
        raise HTTPException(status_code=400, detail=f"Comment {comment_data.user_id} is not found")
    raise HTTPException(status_code=400, detail=f"What are you doing now?")


@router.get("/{post_id}/comments", response_description="List all comments in post",
            response_model=List[CommentModelOut])
async def get_comments_in_post(post_id: str):
    """
    :type post_id: str
    :param post_id: ID of the post
    """
    user_id = "63033dc1f7c78b7416dce005"
    comments = [await drop_none(comment) async for comment in
                db.comment_collection.find({"post_id": post_id})]
    for comment in comments:
        if comment is not None:
            comment["user_name"] = (await get_user(comment["user_id"]))["username"]
            likes_data = await get_likes_data(comment["_id"])
            comment["likes"] = likes_data["count"]
            comment["is_liked"] = user_id in likes_data["ids_clicked_like"]
    return comments


@router.get("/{post_id}/comments/{comment_id}", response_description="Get a comment")
async def get_comment(comment_id: str):
    if (comment_detail := await db.comment_collection.find_one({"_id": comment_id})) is not None:
        return await drop_none(comment_detail)
    raise HTTPException(status_code=404, detail=f"Comment {comment_id} is not found")


@router.patch("/{post_id}/comments/{comment_id}", response_description="Update a comment",
              response_model=UpdateCommentModel)
async def update_comment(comment_id: str, update_data: UpdateCommentModel = Body(...)):
    update_data = {k: v for k, v in update_data.dict().items() if v is not None}
    if update_data:
        update_result = await db.comment_collection.update_one({"_id": comment_id}, {"$set": update_data})
        if update_result.modified_count == 1:
            if (updated_comment := await db.comment_collection.find_one({"_id": comment_id})) is not None:
                return updated_comment
    if (existing_comment := await db.comment_collection.find_one({"_id": comment_id})) is not None:
        return existing_comment
    raise HTTPException(status_code=404, detail=f"Comment {comment_id} is not found")


@router.delete("/comments/{comment_id}", response_description="Delete a comment")
async def delete_comment(comment_id: str):
    if await db.comment_collection.find_one({"_id": comment_id}) is not None:
        await db.comment_collection.delete_one({"_id": comment_id})
        await delete_like(comment_id)
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content={"config": "Comment has been deleted successfully"})
    raise HTTPException(status_code=404, detail=f"Comment {comment_id} is not found")


async def delete_comment_in_post(post_id: str):
    if (comments_cursor := db.comment_collection.find({"post_id": post_id})) is not None:
        async for comment in comments_cursor:
            await delete_like(comment["_id"])
        result = db.comment_collection.delete_many({"post_id": post_id})

        return JSONResponse(status_code=status.HTTP_200_OK,
                            content={"config": "Comments have been deleted successfully"})
    raise HTTPException(status_code=404, detail=f"Comments are not found in Post")