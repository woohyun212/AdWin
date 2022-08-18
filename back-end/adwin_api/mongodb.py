from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
import datetime
from pprint import pprint

# 방법2 - HOST, PORT
mgdb_id = 'admin'
mgdb_password = 'hansung89'
database_name = 'tatabase'

mongo_client = MongoClient(host='localhost', port=27017,
                           username=mgdb_id, password=mgdb_password)
db: Database = mongo_client[database_name]
collection: Collection = db['tollection']

"""
items = [{"author": "앤드류테이트",
          "text": "상남자",
          "tags": ["상남자", "1조원"],
          "date": datetime.datetime.now()
          },

         {
             "author": "Eliot",
             "title": "MongoDB is fun",
             "text": "and pretty easy too!",
             "date": datetime.datetime.now()
         }]
collection.insert_many(items)
# """
d = datetime.datetime(2022, 8, 18, 19, 10, 00)
print(d)
for item in collection.find({"data": {"$lt":d}}).sort("author"):
    pprint(item)
