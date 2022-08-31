import datetime
from pprint import pprint
from routers.likes import initialize_likes


async def drop_none(data: dict):
    return {k: v for k, v in data.items() if v is not None}


async def initialize_data(data: dict, **kwargs) -> None:
    data["created_at"] = str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    await initialize_likes(data["_id"])
    if kwargs:
        for k, v in kwargs.items():
            data[k] = v