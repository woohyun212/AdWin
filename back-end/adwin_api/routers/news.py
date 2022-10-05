from fastapi import APIRouter, HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

import database as db
from utils import *
from models import PyObjectId

import news_crawler

router = APIRouter(prefix='/news',
                   tags=['News'],
                   responses={404: {"description": "Not found"}})


@router.get("", response_description="Get 7 news articles")
async def get_7_news():
    """
    `Get` "뉴스 기사" 7개 가져옴
    """
    # if (news := await db.news_collection.find({}).to_list(7)) is not None:
    #     for i in news:
    #         pprint(news)
    #     return news
    news_data = await db.news_collection.find({}).to_list(7)
    # news_data = jsonable_encoder(news_data)
    return news_data
    # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"request is invalid")
