import json
from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from pprint import pprint
import datetime


with open('./keys.json', 'r', encoding='utf-8') as keys:
    keys = json.load(keys)
    mgdb_id = keys['mgdb_id']
    mgdb_password = keys['mgdb_password']
    database_name = keys['database_name']

mongo_client = MongoClient(host='localhost', port=27017,
                           username=mgdb_id, password=mgdb_password)

db: Database = mongo_client[database_name]
user_collection: Collection = db['User']

if __name__ == "__main__":
    """
    new3   _users = list([])
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
    for i in user_collection.find():
        pprint(i)