from typing import List
from fastapi import FastAPI
from routers import users, posts, comments, re_comments

import database as db
from models import *
from utils import *

app = FastAPI()

app.include_router(users.router)
app.include_router(posts.router)
app.include_router(comments.router)


@app.get("/all_users", response_description="List all users",
         response_model=List[UserModelOut], tags=['All'])
async def list_users():
    """지금은 저장되는 User 수가 많지 않으므로 전체를 다 불러올 수 있지만
    나중에는 500 단위씩 끊어서 가져올 것.
    User list 를 사용할 일이 있을까 싶긴함."""
    # TODO: Search "What is an `async_generator`"
    return [document async for document in db.user_collection.find()]


# post 마다 타입이 다르기 때문에 응답 모델을 지정하지 않음.
@app.get("/all_posts", response_description="List all posts", tags=['All'])
async def get_all_posts(post_type: PostType | None = None):
    _posts: list[dict] = [await drop_none(post) async for post in db.post_collection.find({"post_type": post_type})] \
        if post_type is not None \
        else [await drop_none(post) async for post in db.post_collection.find()]
    for _post in _posts:
        _post["user_name"] = (await users.get_user(_post["user_id"]))["username"]
    return _posts


@app.get("/all_comments", response_description="List all comments",
         response_model=List[CommentModelOut], tags=['All'])
async def get_all_comments():
    return [await drop_none(comment) async for comment in db.comment_collection.find()]
