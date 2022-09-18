import asyncio

import json
from pprint import pprint
import datetime
# from pymongo import MongoClient  # 비동기 처리를 위해 AsyncIOMotorClient로 변경
from motor import motor_asyncio

with open('./keys.json', 'r', encoding='utf-8') as keys:
    keys = json.load(keys)
    mgdb_id = keys['mgdb_id']
    mgdb_password = keys['mgdb_password']
    database_name = keys['database_name']

mongo_client = motor_asyncio.AsyncIOMotorClient(host='localhost', port=27017,
                                                username=mgdb_id, password=mgdb_password)
db = mongo_client[database_name]
user_collection = db['User']
post_collection = db['Post']
comment_collection = db['Comment']
re_comment_collection = db['ReComment']
like_collection = db['Like']

if __name__ == "__main__":
    pass
