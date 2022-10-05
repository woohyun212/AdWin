import React, {useState, useEffect} from "react";
import FreeBoardCard from "./FreeBoardCard";
import NewsCard from "./NewsCard";
import {Link} from "react-router-dom";
import axios from "axios";
import { API_ORIGIN } from "components/APIRequest/APIRequest";



export default function Section3() {
    const [posts, setPosts] = useState([]);
    const [news, setNews] = useState([]);
    const fetchPosts = async () => {
        try {
            setPosts([]);
            const API_URI = `${API_ORIGIN}/posts?post_type=FreeBoard&page_number=1`
            const response = await axios.get(API_URI);
            // console.log(response.data["posts"]);
            setPosts(response.data["posts"]);
        } catch (e) {
            console.log(e)
        }
    };
    const fetchNews = async () => {
        try {
            setNews([]);
            const API_URI = `${API_ORIGIN}/news`
            const response = await axios.get(API_URI);
            setNews(response.data);
            // console.log(response.data);
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        fetchPosts();
        fetchNews();
    // eslint-disable-next-line
    }, []);

    return (
        <section
            className="m-auto flex flex-col h-screen w-screen items-center justify-center bg-white text-[#06113C]">
            <h1
                className='flex font-SenRegular justify-center mx-auto mt-[3vh] mb-[1vh] md:mt-[18vh] md:mb-[6vh] text-2xl uppercase'>Community</h1>
            <div
                className='flex flex-col md:flex-row gap-x-[2vw] gap-y-[7vh] h-[55vh] w-[80vw] mb:w-[60vw] mx-auto mb-[17.4vh] lg:w-[60vw] leading-9 font-bold'>
                {/* 인기1개 최상위 3개 */}
                <div className="뉴스 w-full md:w-[50%] h-[30vh]">
                    <div className='flex justify-between'>
                        <span className='ml-[1.1vw]'>뉴스</span>
                        <Link className=' text-2xl' to="news">+</Link>
                    </div>
                    <div className='h-full w-full border-2 border-y-[#06113C] border-x-transparent'>
                        {/* <NewsCard article=}/> */}
                        <hr className="border-[#06113C] opacity-30"/>
                        {
                            news?.map((article) =>(
                            <React.Fragment key={article._id}>
                                <NewsCard article={article}/>
                                <hr className="border-[#06113C] w-full opacity-30"/>
                            </React.Fragment>)
                            )
                        }
                    </div>
                </div>
                <div className="자유게시판 w-full md:w-[50%] h-[30vh]">
                    <div className='flex justify-between'>
                        <span className='ml-[1.1vw]'>자유 게시판</span>
                        <Link className=' text-2xl' to="freeboard">+</Link>
                    </div>
                    <div className='h-full w-full border-2 border-y-[#06113C] border-x-transparent'>
                        {
                            posts.slice(0, 4).map((post) =>(
                            <React.Fragment key={post._id}>
                                <FreeBoardCard post={post}/>
                                <hr className="border-[#06113C] w-full opacity-30"/>
                            </React.Fragment>)
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
