from fastapi import APIRouter, Body, HTTPException, status, Depends, Header
from fastapi.encoders import jsonable_encoder

from fastapi.responses import JSONResponse

import database as db
from models import PostModelIn, UpdatePostModel, PostType, RecruitType
import routers.auth as auth
from routers.comments import get_comments_in_post, delete_comment_in_post
from routers.likes import delete_like, get_likes_data
from routers.users import get_user_by_id
from utils import *

router = APIRouter(prefix='/posts',
                   tags=['Posts'],
                   responses={404: {"description": "Not found"}}, )


# Post 관련 Endpoints
@router.post("", response_description="Add new post", response_model=PostModelIn)
async def create_post(post_type: PostType, post_data: PostModelIn = Body(...),
                      current_user: auth.get_current_user = Depends()):
    """ Post 글 생성합니다."""
    post_data = jsonable_encoder(post_data)
    if post_type == PostType.CounselorRecruit and post_data["recruit_type"] is None:
        raise HTTPException(status_code=400, detail="required parameter `recruit_type` missing")
    post_data["user_id"] = current_user["_id"]
    if current_user:
        if post_type != PostType.CounselorRecruit:
            post_data["recruit_type"] = None

        await initialize_data(data=post_data, post_type=post_type,
                              recruit_type=post_data["recruit_type"], views=0,
                              preview=get_string_from_html(post_data["content"])[:30],
                              thumbnail=get_thumbnail_from_html(post_data["content"]))
        new_post = await db.post_collection.insert_one(post_data)
        created_post = await db.post_collection.find_one({"_id": new_post.inserted_id})
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_post)
    if current_user is None:
        raise HTTPException(status_code=400, detail=f"Post {post_data['user_id']} is not found")
    raise HTTPException(status_code=400, detail=f"What are you doing now?")


@router.get("/counts", response_description="Get posts count")
async def get_posts_count(post_type: PostType):
    docs_count = await db.post_collection.count_documents({"post_type": post_type})
    res = {
        "all_pages": math.ceil(docs_count / 8)
    }
    return res


@router.get("/{post_id}", response_description="Get a post")
async def get_post_detail(post_id: str,
                          Authorization: str | None = Header(default=None)):
    token = Authorization[7:]
    current_user_id = (await auth.get_current_user(token))["_id"] if token != 'null' else ''
    # TODO : 요청 header 든 이용해서 user_id 가져오기
    if (post_detail := await db.post_collection.find_one({"_id": post_id})) is not None:
        post_detail = await drop_none(post_detail)
        post_detail["nickname"] = (await get_user_by_id(post_detail["user_id"]))["nickname"]
        post_detail["comments"] = await get_comments_in_post(post_id, user_id=current_user_id)
        likes_data = await get_likes_data(post_id)
        post_detail["likes"] = likes_data["count"]
        post_detail["is_liked"] = current_user_id in likes_data["ids_clicked_like"]
        await db.post_collection.update_one({"_id": post_id}, {"$set": {"views": post_detail["views"] + 1}})
        return post_detail
    raise HTTPException(status_code=404, detail=f"Post {post_id} is not found")


@router.get("", response_description="Get 8 posts")
async def get_8_posts(post_type: PostType, page_number: int = 1,
                      area='', recruit_type='', real_estate_type='', search=''):
    _filter = {"post_type": post_type}
    if area != '' and area != 'null':
        _filter['area'] = area
    if recruit_type != '' and recruit_type != 'null':
        _filter['recruit_type'] = recruit_type
    if real_estate_type != '' and real_estate_type != 'null':
        _filter['real_estate_type'] = real_estate_type
    if search != '' and search != 'null':
        regx = re.compile(search, re.IGNORECASE)
        _filter['title'] = {"$regex": regx}
    _posts: list[dict] = await db.post_collection.find(_filter,
                                                       skip=(page_number - 1) * 8,
                                                       projection={"content": False}) \
        .sort("created_at", -1).to_list(length=8)
    # post_type 필터링하고 page 만큼 skip, 다음에 정렬.? -> 어떻게든 됨..
    for _post in _posts:
        _post["nickname"] = (await get_user_by_id(_post["user_id"]))["nickname"]
        _post["likes"] = (await get_likes_data(_post["_id"]))["count"]
        _post = await drop_none(_post)
    docs_count = await db.post_collection.count_documents({"post_type": post_type})
    res = {
        "all_pages": math.ceil(docs_count / 8),
        "page_number": page_number,
        "posts": _posts,
    }
    return res


@router.patch("/{post_id}", response_description="Update a post", response_model=UpdatePostModel)
async def update_post(post_id: str, update_data: UpdatePostModel = Body(...)):
    update_data = {k: v for k, v in update_data.dict().items() if v is not None}
    if update_data:
        update_data["preview"] = get_string_from_html(update_data["content"])[:30]
        update_data["thumbnail"] = get_thumbnail_from_html(update_data["content"])
        update_result = await db.post_collection.update_one({"_id": post_id}, {"$set": update_data})
        if update_result.modified_count == 1:
            if (updated_post := await db.post_collection.find_one({"_id": post_id})) is not None:
                return updated_post
    if (existing_post := await db.post_collection.find_one({"_id": post_id})) is not None:
        return existing_post
    raise HTTPException(status_code=404, detail=f"Post {post_id} is not found")


@router.delete("/{post_id}", response_description="Delete a post")
async def delete_post(post_id: str):
    if await db.post_collection.find_one({"_id": post_id}) is not None:
        await db.post_collection.delete_one({"_id": post_id})
        await delete_like(post_id)
        await delete_comment_in_post(post_id)
        return JSONResponse(status_code=status.HTTP_200_OK,
                            content={"config": "Post has been deleted successfully"})
    raise HTTPException(status_code=404, detail=f"Post {post_id} is not found")
