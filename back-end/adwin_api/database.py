import json
from pprint import pprint
import datetime
# from pymongo import MongoClient  # 비동기 처리를 위해 AsyncIOMotorClient로 변경
from motor import motor_asyncio
from config import *

mongo_client = motor_asyncio.AsyncIOMotorClient(host='localhost', port=27017,
                                                username=MONGODB_ID, password=MONGODB_PASSWORD)
db = mongo_client[DATABASE_NAME]
user_collection = db['User']
post_collection = db['Post']
comment_collection = db['Comment']
re_comment_collection = db['ReComment']
like_collection = db['Like']
news_collection = db['News']

if __name__ == "__main__":
    pass
