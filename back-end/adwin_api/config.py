import json
from pydantic import BaseSettings

with open('./keys.json', 'r', encoding='utf-8') as keys:
    keys = json.load(keys)
    MONGODB_ID: str
    MONGODB_PASSWORD: str
    DATABASE_NAME: str
    SECRET_KEY: str
    CLIENT_ORIGINS: list
    for k, v in keys.items():
        globals()[k] = v
