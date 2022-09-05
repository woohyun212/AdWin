import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecruitAnnounceDetail() {
    let { post_id } = useParams();

    let navigate = useNavigate();
    const [postDetail, setPostDetail] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetctPosts = async () => {
        try {
            setError(null);
            setPostDetail({});
            setLoading(true);
            const API_URI = `http://localhost:8000/posts/${post_id}`
            const response = await axios.get(API_URI);
            setPostDetail(response.data);
            console.log(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
        console.log(post_id)
    };
    useEffect(() => {
        fetctPosts();
    // eslint-disable-next-line
    }, [post_id]);

    return(
        <div  className="flex bg-[#FFFFFF] justify-center content-center w-screen h-screen">
            <div className="h-[90vh] w-[50%] mt-auto mx-auto">
            <div className=''>
                <h4 className=''>{postDetail.title}</h4>
                <hr className='border-2 border-black'/>
                <div dangerouslySetInnerHTML={{"__html":postDetail.content}}></div>
                
                <button className='' onClick={ () => {
                    navigate('/recruit-announce')
                }}>뒤로가기</button>
            </div>
            </div>
        </div>
    )
}