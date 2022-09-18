import React, {useState} from "react";
import axios from "axios";
import { API_ORIGIN } from "components/APIRequest/APIRequest";

export default function CommentBlock({comment}) {
    console.log(comment)
    const [likes, setLikes] = useState(comment.likes);
    const [isLiked, setIsLiked] = useState(comment.is_liked);

    const likeComment = async () => {
        if (isLiked) {
            alert("좋아요는 한번만 누를 수 있습니다!")
            return;
        }
        const fetctLike = async () => {
            const user_id = "63033dc1f7c78b7416dce005"
            try {
                const API_URI = `${API_ORIGIN}/likes`
                const response = await axios.put(API_URI, {
                    "target_id": comment._id,
                    "user_id": user_id
                });
            } catch (e) {
                console.log(e)
            }
        };
        fetctLike();
        setIsLiked(!isLiked);
        setLikes(likes + 1);
    };


    return (
        <div className="">
            {/* <div className="flex flex-col w-1/2 items-center mx-auto"> */}
            <div className="flex flex-row h-[8vh] gap-3 self-center mt-2">
                <img
                    className="h-16 aspect-square rounded-full bg-gray-400 self-center"
                    alt="프로필 사진"
                    src={""}/>
                <p className="text-center self-center">
                    {comment.user_name}
                </p>
                <p className="text-left self-center w-[30vw]">
                    {comment.content}
                </p>
                <p className="text-center self-center">
                    {comment.created_at}
                </p>
            </div>
            <div className="flex flex-row w-1/2 gap-2 text-xl mb-2  -mt-2">
                <button
                    type='button'
                    onClick={likeComment}
                    className={"ml-16 transition-all ease-in-out duration-500" + (
                        isLiked
                            ? " text-red-600"
                            : ""
                    )}>
                    {
                        isLiked
                            ? "♥"
                            : "♡"
                    }</button>
                <p className="flex text-center self-center">
                    {likes}
                </p>
            </div>

            {/* </div> */}
        </div>
    )
}