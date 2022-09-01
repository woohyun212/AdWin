import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header from "../Header";
import Search from "./Search";
import axios from "axios"
import RecruitAnnounceList from "./RecruitAnnounceList";
import Pagination from "./Pagination/Pagination";


export default function RecruitAnnounce(): JSX.Element {
    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allPages, setAllPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const fetctPosts = async () => {
        try {
            setError(null);
            setposts([]);
            setLoading(true);
            const API_URI = `http://localhost:8000/posts?post_type=CounselorRecruit&page_number=${currentPage}`
            const response = await axios.get(API_URI);
            setposts(response.data["posts"]);
            setAllPages(response.data["all_pages"])
            console.log(response.data);
        } catch (e : any) {
            setError(e);
        }
        setLoading(false);
        console.log(currentPage)
    };
    useEffect(() => {
        fetctPosts();
    }, [currentPage]);

    return (
        <div
            className="flex bg-[#FFFFFF] justify-center content-center w-screen h-screen">
            <Header/>
            <div className="h-[90vh] w-[50%] mt-auto mx-auto">
                <div className="flex pb-3 w-[85%] justify-center mx-auto">
                    <Search/>
                </div>
                <div
                    className="flex flex-col h-[77.5%] w-full gap-0 items-center justify-center px-2 border-4 border-y-[#06113C] border-x-transparent">
                    <RecruitAnnounceList loading={loading} error={error} posts={posts} />
                </div>
                <div className="flex w-full items-center justify-between ">
                    <div className="w-1/3"/>
                    <Pagination allPages={allPages} currentPage={currentPage} setCurrentPage={setCurrentPage} fetctPosts={fetctPosts}/>
                    <div className="w-1/3">
                        <Link to="write" className="px-3 py-1 bg-[#FF8C32] float-right mr-11">글 작성</Link>
                    </div>
                </div>
                
            </div>    
        </div>
    )
}
