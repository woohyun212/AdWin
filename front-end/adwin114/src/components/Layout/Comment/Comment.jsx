import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import CommentList from './CommentList';
import {API_ORIGIN} from 'components/APIRequest/APIRequest';

export default function Comment({comments}) {
    const [commentContent, setCommentContent] = useState("");

    const handleChangeComment = (e) => {
        setCommentContent(e.target.value);
        console.log("comment changed", commentContent);
    };

    const {post_id} = useParams();
    const fetchPostComments = async () => {
        const user_id = "63033dc1f7c78b7416dce005"
        try {
            const API_URI = `${API_ORIGIN}/${post_id}/comments`
            const response = await axios.post(API_URI, {
                "user_id": user_id,
                "content": commentContent
            });
            console.log(response.data)

        } catch (e) {
            console.log(e)

        }
    };

    return (
        <> < div className = 'flex flex-col w-full self-center items-center my-10' > <div
            className='flex flex-row gap-3 w-screen bg-gray-300 justify-center h-20 py-2'>
            {/* 프로필 */}
            <div className='flex flex-row gap-3 self-center align-middle'>
                {/* 프로필 사진 DB에 이미지를 BASE64로 넣어벎 */}
                <img className="h-16 w-16 rounded-full bg-white" alt="프로필 사진" src={""}/>
                <p
                    className='flex self-center align-middle whitespace-nowrap overflow-hidden \ text-ellipsis '>닉네임</p>
            </div>
            {/* 댓글 입력 */}
            <div className='align-middle self-center h-[90%] w-[30%]'>
                <input
                    onChange={handleChangeComment}
                    type='text'
                    className='border border-[#EEEEEE] bg-white \
                    h-full w-full px-4'></input>
            </div>
            <button
                type='button'
                className='border border-[#EEEEEE] bg-white \
                h-[90%] self-center px-6'
                onClick={fetchPostComments}>제출</button>
        </div>
    </div>
    <CommentList comments={comments}/>
</>
    )
}