import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Search from "./Search";
import axios from "axios"
import RecruitAnnounceList from "./RecruitAnnounceList";
import Pagination from "./Pagination/Pagination";
 import { API_ORIGIN } from "components/APIRequest/APIRequest";
import { CheckToken, fetchToken } from "Auth";

export default function RecruitAnnounce() {
    CheckToken();
    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allPages, setAllPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const onWriteButtonClick = () => {
        if (fetchToken()){
            navigate('write');
        } else {
            alert("로그인 후 이용하여 주시기 바랍니다.");
            if (window.confirm("로그인 하시겠습니까?")) {
                navigate('/login');
            }
        }
    };
    const fetctPosts = async () => {
        try {
            setError(null);
            setposts([]);
            setLoading(true);
            const API_URI = `${API_ORIGIN}/posts?post_type=CounselorRecruit&page_number=${currentPage}`
            const response = await axios.get(API_URI);
            // console.log(response.data["posts"]);
            setposts(response.data["posts"]);
            setAllPages(response.data["all_pages"])
            // console.log(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        // console.log(currentPage)
    };
    useEffect(() => {
        fetctPosts();
    // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div
            className="flex bg-[#FFFFFF] justify-center content-center w-screen h-screen">
            <div className="h-[90vh] lg:w-[50%] mt-auto mx-auto">
                <div className="flex pb-3 h-[10%] w-[85%] justify-center mx-auto">
                    <Search/>
                </div>
                <div
                    className="container flex flex-col h-[77.5%] w-full gap-0 items-center justify-start px-2 border-4 border-y-[#06113C] border-x-transparent">
                    <RecruitAnnounceList loading={loading} error={error} posts={posts}/>
                </div>
                <div className="flex w-full items-center justify-between ">
                    <div className="w-1/3"/>
                    <Pagination
                        allPages={allPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}/>
                    <div className="w-1/3">
                        <button onClick={onWriteButtonClick}
                        className="px-3 py-1 mr-5 lg:mr-11 bg-[#FF8C32] float-right ">글 작성</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
