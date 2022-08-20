import datetime
from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field
from typing import Optional

"""
이 파일은 FastAPI에서 MongoDB를 구조화하여 사용하기 위해 만듬.
"""


class PyObjectId(ObjectId):
    """
    ObjectId class for MongoDB
    MongoDb 컬렉션 데이터를 Pydantic BaseModel에
    올바르게 매핑하기 위한 클래스.
    https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/
    """
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class UserModelIn(BaseModel):
    """
    User 모델의 Input을 위한 모델
    장고처럼 Serializer가 따로 없기 때문에
    입력, 반환데이터를 따로 지정해줘야 하나 보다.
    """
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str
    password: str
    email: EmailStr
    profile_image: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class UserModelOut(BaseModel):
    """User 모델의 Output을 위한 모델"""
    id: PyObjectId = str  # Field(default_factory=PyObjectId, alias="_id")
    username: str
    email: EmailStr
    profile_image: str
    created_at: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class UpdateUserModel(BaseModel):
    """User 모델의 Update을 위한 모델"""
    username: Optional[str]
    password: Optional[str]
    email: Optional[EmailStr]
    profile_image: Optional[str]
    created_at: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class CounselorRecruitmentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    author: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    content: str
    likes: int
    created_at: datetime.datetime

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class SalePromotionModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    author: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    content: str
    likes: int
    created_at: datetime.datetime

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class RealEstateNewsModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    content: str
    url: str
    likes: int
    created_at: datetime.datetime

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class CommentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    parent_article: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    author: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    content: str
    likes: int
    created_at: datetime.datetime

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class ReCommentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    parent_article: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    parent_comment: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    author: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    content: str
    likes: int
    created_at: datetime.datetime

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
