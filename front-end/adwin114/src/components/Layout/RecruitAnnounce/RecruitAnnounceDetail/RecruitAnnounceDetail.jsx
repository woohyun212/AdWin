import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {ReactComponent as SpeechBubble } from 'images/speech-bubble-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const RECRUIT_TYPE_DATA = [
    { id: "SalesPerson", value: '직원' },
    { id: "TeamLeader", value: '팀장' },
    { id: "Director", value: '본부장' },
    { id: "General", value: '총괄' },
    { id: "Agency", value: '대행사' },
    ];

export default function RecruitAnnounceDetail() {
    let { post_id } = useParams();
    let navigate = useNavigate();

    const [Likes, setLikes] = useState();
    const [isLiked, setIsLiked] = useState(0);
    const [postDetail, setPostDetail] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetctGetPosts = async () => {
        try {
            setError(null);
            setPostDetail({});
            setLoading(true);
            const API_URI = `http://localhost:8000/posts/${post_id}`
            const response = await axios.get(API_URI);
            response.data.recruit_type = RECRUIT_TYPE_DATA.filter(el => el.id === response.data.recruit_type)[0].value;

            setPostDetail(response.data);
            setIsLiked(response.data.is_liked);
            setLikes(response.data.likes);
            
            // console.log(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };
    
    const fetctLike = async () => {
        const user_id = "63033dc1f7c78b7416dce005"
        try {
            const API_URI = `http://localhost:8000/likes`
            const response = await axios.put(API_URI, {
                "target_id": post_id,
                "user_id": user_id
              }
            );
        } catch (e) {
            console.log(e)
        }
    };

    const like = async () => {
        if (isLiked){
            alert("좋아요는 한번만 누를 수 있습니다!")
            return;
        }
        fetctLike();
        setIsLiked(!isLiked);
        setLikes(Likes+1);
    };

    useEffect(() => {
        fetctGetPosts();
    // eslint-disable-next-line
    }, [post_id]);

    return(
        <div  className="flex flex-col bg-[#FFFFFF] pt-[0vh] w-screen h-screen overflow-scroll">
            <div className="flex w-full sm:w-[75%] lg:w-[55%] mt-[7vh] mx-auto h-[90%] 
            justify-center content-center ">
                <div className="flex flex-col h-full w-full overflow-x-hidden border-x border-black">
                    <div className='flex flex-row w-full my-4 mt-9 gap-6 mx-4'>
                        <span className="flex flex-col text-3xl justify-center content-center w-[10%]">
                            <p className="whitespace-nowrap justify-center mx-auto">
                            {postDetail.area}
                            </p>
                            <hr className="m-1 border-black"></hr>
                            <p className="whitespace-nowrap justify-center mx-auto"
                            >{postDetail.recruit_type}</p>
                        </span>
                        <h1 className='flex sm:w-[35%] lg:w-[65%] text-3xl self-center'>{postDetail.title}</h1>
                        <Link to="update" className=' self-center align-middle'>
                                <p className='whitespace-nowrap px-4 py-[0.75rem] h-12 bg-[#FF8C32] rounded-md'>글 수정</p>
                        </Link>
                        <button type='button' onClick={like} className="h-12 px-3 whitespace-nowrap self-center \
                             bg-[#EEEEEE] border border-[#CCCCCC] rounded-md align-middle float-right">글 삭제</button>  
                    </div>
                    <hr className=' border-black'/>
                    <div className='flex flex-row justify-between my-2 mx-auto w-full'>
                        <span className="flex text-sm justify-center self-center w-[10%]">{postDetail.user_name}</span>
                        <span className='flex text-sm justify-center content-center  w-[10%]'>{postDetail.created_at}</span>                     
                    </div>
                    <hr className=' border-black'/>
                    <div className='w-full px-12 pt-5 '
                        dangerouslySetInnerHTML={{"__html":postDetail.content}}/>
                </div>
                {/* <div className='flex bg-gray-300 w-36 h-72 ml-8 my-auto'>아마이건광고일거야</div> */}
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex justify-center mx-auto w-full h-screen'>
                    <div className='flex flex-row h-[7%] w-full '>
                        <div className="flex w-full justify-center "></div>
                        <div className="flex w-full gap-6 justify-center ">
                                <div className="flex flex-row gap-2 ">
                                    <div className="flex w-5"><SpeechBubble/></div>
                                    <div className="flex text-2xl justify-center items-center  ">{postDetail.comments?.length}</div>
                                </div>
                                <div className="flex text-2xl flex-row gap-2">
                                    <button type='button' onClick={like} className={"transition-all ease-in-out duration-500" + (isLiked ? " text-red-600":"")} >
                                        {isLiked ? "♥" : "♡"}</button>
                                    <div className="flex text-2xl justify-center items-center">{Likes}</div>
                                </div>
                        </div>
                        <div className="flex w-full justify-start align-middle">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}