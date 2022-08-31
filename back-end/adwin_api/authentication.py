"""
각종 인증 JWT, OAuth2, Cookies, Sections 에 대한 인증을 처리
"""
import database as db


async def is_user_exist(_id: str):
    """
    Check if _id is valid
    :param _id: ObjectId with string
    :return: boolean
    """
    import database as db
    if await db.user_collection.find_one({"_id": _id}):
        return True
    return False


async def is_post_exist(_id: str):
    """
    Check if _id is valid
    :param _id: ObjectId with string
    :return: boolean
    """
    import database as db
    if await db.post_collection.find_one({"_id": _id}):
        return True
    return False


async def is_comment_exist(_id: str):
    """
    Check if _id is valid
    :param _id: ObjectId with string
    :return: boolean
    """
    import database as db
    if await db.comment_collection.find_one({"_id": _id}):
        return True
    return False


async def is_exist(_id: str):
    """
    Check _id is existed
    :param _id: ObjectId with string
    :return: boolean
    """
    if await is_user_exist(_id) or await is_post_exist(_id) or await is_comment_exist(_id):
        return True
    return False


def is_valid(user_id: str):
    if (db.user_collection.find_one({"_id": user_id})) is not None:
        return True
    return False
