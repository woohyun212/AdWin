import json

from motor import motor_asyncio
from pprint import pprint
import datetime
# from pymongo import MongoClient  # 비동기 처리를 위해 AsyncIOMotorClient로 변경
import motor.motor_asyncio as masyncio

with open('./keys.json', 'r', encoding='utf-8') as keys:
    keys = json.load(keys)
    mgdb_id = keys['mgdb_id']
    mgdb_password = keys['mgdb_password']
    database_name = keys['database_name']

mongo_client = masyncio.AsyncIOMotorClient(host='localhost', port=27017,
                                           username=mgdb_id, password=mgdb_password)
db = mongo_client[database_name]
user_collection = db['User']
post_collection = db['Post']
if __name__ == "__main__":
    """
    new_users = list([])
    for count in range(1, 11):
        fake_user = {
            "username": f"user{count}",
            "password": "ㅂㅁㅂㅎㅂㅁㅂㅎ",
            "email": "이메일@nave.rocm",
            # "hope_area": "서울",
            "profile_image": "/image/defautprofile.gif",
            "created_at": datetime.datetime.now()
        }
        new_users.append(fake_user)
    user_collection.insert_many(new_users)
    #"""
    pass
