import datetime


async def drop_none(data: dict):
    return {k: v for k, v in data.items() if v is not None}


def initialize_data(data: dict, **kwargs) -> None:
    data["created_at"] = str(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    data["likes"] = 0
    if kwargs:
        for k, v in kwargs.items():
            data[k] = v

