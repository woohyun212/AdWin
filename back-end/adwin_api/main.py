from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi_jwt_auth.exceptions import AuthJWTException
from fastapi.middleware.cors import CORSMiddleware

import database as db
import models
from routers import users, posts, comments, likes, auth
import authentication
import utils
from config import *

app = FastAPI()

allowed_origins = CLIENT_ORIGINS

# CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(likes.router)
app.include_router(auth.router)
# app.include_router(authentication.router)


@app.get("/all_users", response_description="List all users",
         response_model=models.List[models.UserModelOut], tags=['All'])
async def list_users():
    """지금은 저장되는 User 수가 많지 않으므로 전체를 다 불러올 수 있지만
    나중에는 500 단위씩 끊어서 가져올 것.
    User list 를 사용할 일이 있을까 싶긴함."""
    # TODO: Search "What is an `async_generator`"
    return [document async for document in db.user_collection.find()]


# post 마다 타입이 다르기 때문에 응답 모델을 지정하지 않음.
@app.get("/all_posts", response_description="List all posts", tags=['All'])
async def get_all_posts(post_type: models.PostType | None = None):
    _posts: list[dict] = [await utils.drop_none(post) async for post in
                          db.post_collection.find({"post_type": post_type})] \
        if post_type is not None \
        else [await utils.drop_none(post) async for post in db.post_collection.find()]
    for _post in _posts:
        _post["user_name"] = (await users.get_user_by_id(_post["user_id"]))["username"]
    return _posts


@app.exception_handler(AuthJWTException)
def authjwt_exception_handler(request: Request, exc: AuthJWTException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )
