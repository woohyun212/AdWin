import re
import sys
import asyncio
from datetime import datetime
import time
import schedule
import requests
from bs4 import BeautifulSoup
from fastapi.encoders import jsonable_encoder
from database import news_collection
from models import NewsModel


async def crawling_news(news_num):
    date = str(datetime.now())
    date = date[:date.rfind(':')].replace(' ', '_')[:10]
    # date = date.replace(':', '시') + '분'
    with open('검색어.txt', 'r', encoding='utf-8') as f:
        query = f.read().replace('\n', ' ').replace(' ', '+')
        print("검색어:", query)
    news_url = f'https://search.naver.com/search.naver?where=news&sm=tab_jum&query={query}'
    req = requests.get(news_url)
    soup = BeautifulSoup(req.text, 'html.parser')
    idx = 0
    cur_page = 1

    while idx < news_num:
        table = soup.find('ul', {'class': 'list_news'})
        li_list = table.find_all('li', {'id': re.compile('sp_nws.*')})
        area_list = [li.find('div', {'class': 'news_area'}) for li in li_list]
        a_list = [area.find('a', {'class': 'news_tit'}) for area in area_list]
        for n in a_list[:min(len(a_list), news_num - idx)]:
            news_data = jsonable_encoder(
                NewsModel(**({'title': n.get('title'),
                              'url': n.get('href'),
                              'created_at': date}
                )))
            await news_collection.insert_one(news_data)
            idx += 1
        cur_page += 1
        pages = soup.find('div', {'class': 'sc_page_inner'})
        next_page_url = [p for p in pages.find_all('a') if p.text == str(cur_page)][0].get('href')
        req = requests.get('https://search.naver.com/search.naver' + next_page_url)
        soup = BeautifulSoup(req.text, 'html.parser')


def main():
    print("Starting crawling ...")
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(news_collection.drop())
        loop.run_until_complete(crawling_news(7))
        loop.close()
    except Exception as e:
        print(e)
        pass
    print("News DB is updated.")


if __name__ == '__main__':
    py_ver = int(f"{sys.version_info.major}{sys.version_info.minor}")
    if py_ver > 37 and sys.platform.startswith('win'):
        print("asyncio setting..")
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    print("메인 함수 테스트")
    main()
    print("스케줄러 준비")
    schedule.every().minute.do(main)
    while True:
        schedule.run_pending()
        time.sleep(1)
