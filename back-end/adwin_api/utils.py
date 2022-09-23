import datetime
import encodings
from pprint import pprint
import math
import bcrypt

from routers.likes import initialize_likes
from urllib.request import urlopen
from bs4 import BeautifulSoup


def get_string_from_html(html: str = "") -> str:
    soup = BeautifulSoup(html, features="html.parser")
    # kill all script and style elements
    for script in soup(["script", "style"]):
        script.extract()  # rip it out
    # get text
    text = soup.get_text()
    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in text.splitlines())
    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # drop blank lines
    text = '\n'.join(chunk for chunk in chunks if chunk)
    return text


def get_thumbnail_from_html(html: str = "") -> str:
    soup = BeautifulSoup(html, features="html.parser")
    # get image in base64 format
    if (img := soup.find('img')) is not None:
        return img['src']
    return ""


async def drop_none(data: dict):
    return {k: v for k, v in data.items() if v is not None}


async def initialize_data(data: dict, **kwargs) -> None:
    data["created_at"] = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    await initialize_likes({"target_id": data["_id"]})
    if kwargs:
        for k, v in kwargs.items():
            data[k] = v


def hash_string(string: str):
    return bcrypt.hashpw(string.encode('utf-8'), bcrypt.gensalt())
