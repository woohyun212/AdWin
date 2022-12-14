import datetime
from enum import Enum

from bson import ObjectId
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict

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


class NewsModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    url: str
    created_at: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class UserModelBase(BaseModel):
    """중복되는 내용을 Base로 두고 In Out에서 필요한 자료만 추가한다."""
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str
    nickname: str
    email: EmailStr
    profile_image: Optional[str]
    disabled: bool = False

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "string",
                "hashed_password": "string",
                "email": "user@example.com",
                "profile_image": "base64 image"
            }
        }


class UserModelIn(UserModelBase):
    password: str
    password_check: str

    # 추후에 저장할 때는 암호화하여 저장
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "nickname": "string",
                "username": "string",
                "email": "user@example.com",
                "password": "string",
                "password_check": "string",
                "profile_image": "string"
            }
        }


class UserModelOut(UserModelBase):
    """User 모델의 Output을 위한 모델"""
    created_at: datetime.datetime


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


class CommentModelBase(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    content: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class CommentModelIn(CommentModelBase):
    class Config:
        schema_extra = {
            "example": {
                "user_id": "63086d10af036fc170696eec",  # 댓글봇 ID
                "content": "댓글봇 입니당"
            }
        }


class CommentModelOut(CommentModelBase):
    post_id: str
    likes: int
    created_at: str


class UpdateCommentModel(BaseModel):
    content: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "content": "str : 대댓글내용"
            }
        }


class ReCommentModelBase(BaseModel):
    parent_comment: Optional[str]


class PostType(str, Enum):
    CounselorRecruit = "CounselorRecruit"
    SalePromotion = "SalePromotion"
    RealEstateNews = "RealEstateNews"
    FreeBoard = "FreeBoard"


class RecruitType(str, Enum):
    SalesPerson = "SalesPerson"  # 영업 사원
    TeamLeader = "TeamLeader"  # 팀장
    Director = "Director"  # 본부장
    General = "General"  # 총괄
    Agency = "Agency"  # 대행사


class AreaType(str, Enum):
    Seoul = '서울특별시'
    GyeonggiIncheon = '경기·인천'
    BusanUlsanGyeongnam = '부산·울산·경남'
    DaeguGyeongbuk = '대구·경북'
    DaejeonChungcheong = '대전·충청'
    GwangjuJeolla = '광주·전라'
    GangwonJeju = '강원·제주'


class RealEstateType(str, Enum):
    Apartment = '아파트'
    Villa = '빌라'
    IndustrialCenter = '지식산업센터'
    Store = '상가'
    Officetel = '오피스텔'
    Land = '토지'
    ETC = '기타'


class PostModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: str
    title: str
    content: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PostModelIn(PostModel):
    area: Optional[str] = None
    recruit_type: Optional[RecruitType] = None
    real_estate_type: str = None
    url: Optional[str] = None

    class Config:
        schema_extra = {
            "example": {
                "user_id": "63033dc1f7c78b7416dce005",  # Test 1
                "title": "string",
                "content": "string",
                "area": "string [CounselorRecruit, SalePromotion]",
                "recruit_type": "SalesPerson [CounselorRecruit]",
                "url": "string [RealEstateNews]"
            }
        }


class PostModelOut(PostModel):
    created_at: datetime.datetime = None
    post_type: str = None
    comments: List[CommentModelOut]
    area: Optional[str] = None
    recruit_type: Optional[str] = None
    url: Optional[str] = None


class UpdatePostModel(BaseModel):
    title: str
    content: str
    area: Optional[str]
    recruit_type: Optional[str]
    building_type: Optional[str]
    url: Optional[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class LikesModelIn(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    target_id: str
    user_id: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "target_id": "string",
                "user_id": "63086d10af036fc170696eec"
            }
        }


class LikesInitModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    target_id: str
    ids_clicked_like: List = []
    count: int = 0

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "target_id": "string"
            }
        }


class LoginModel(BaseModel):
    username: str
    password: str


class RegisterItem(BaseModel):
    nickname: str
    username: str
    email: EmailStr
    password: str
    password_check: str
    profile_image: Optional[str]


class TokenModel(BaseModel):
    access_token: str


class TokenAndProfileImage(BaseModel):
    access_token: str
    token_type: str
    profile_image: Optional[str]


class TokenData(BaseModel):
    username: str | None = None


class UserInDB(UserModelBase):
    hashed_password: str
