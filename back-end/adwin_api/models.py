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


class UserModelBase(BaseModel):
    """중복되는 내용을 Base로 두고 In Out에서 필요한 자료만 추가한다."""
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str
    email: EmailStr
    profile_image: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "string",
                "password": "string",
                "email": "user@example.com",
                "profile_image": "string"
            }
        }


class UserModelIn(UserModelBase):
    password: str

    # 추후에 저장할 때는 암호화하여 저장
    class Config:
        schema_extra = {
            "example": {
                "username": "string",
                "password": "string",
                "email": "user@example.com",
                "profile_image": "string"
            }
        }


class UserModelOut(UserModelBase):
    """User 모델의 Output을 위한 모델"""
    created_at: str


class UpdateUserModel(BaseModel):
    """User 모델의 Update를 위한 모델
    UserModelBase를 그대로 상속받으면 상속받는 속성값 때문에
    validation이 제대로 이루어 지지 않음"""
    username: Optional[str]
    password: Optional[str]
    email: Optional[EmailStr]
    profile_image: Optional[str]

    class Config:
        arbitrary_types_allowed = True


class PostModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    author: PyObjectId = Field(default_factory=PyObjectId, alias="author")
    post_type: str
    title: str
    content: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "author": "ObjectId",
                "post_type": "string",
                "title": "string",
                "content": "string?"
            }
        }


class PostModelIn(PostModel):
    pass


class PostModelOut(PostModel):
    likes: int
    created_at: str
    pass


class UpdatePostModel(BaseModel):
    title: str
    content: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "post_type": "string",
                "title": "string",
                "content": "string?"
            }
        }
class CounselorRecruitModelIn(PostModel):
    """
    :param area : 지역
    :param recruit_type : 모집 분야
        salesperson   : 영업 사원
        team_leader   : 팀장
        director      : 본부장
        general       : 총괄
        agency        : 대행사

    """
    area: str
    recruit_type: str


class CounselorRecruitModelOut(PostModel):
    area: str
    recruit_type: str
    created_at: str


class UpdateCounselorRecruitModel(UpdatePostModel):
    area: str
    recruit_type: str


class SalePromotionModel(PostModel):
    area: str
    building_type: str  # 아파트, 상가, 지산 etc
    pass


class RealEstateNewsModel(PostModel):
    url: str


class CommentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    article: PyObjectId = Field(default_factory=PyObjectId, alias="article")
    author: PyObjectId = Field(default_factory=PyObjectId, alias="author")
    content: str
    likes: int
    created_at: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class ReCommentModel(CommentModel):
    parent_comment: PyObjectId = Field(default_factory=PyObjectId, alias="parent_comment")
