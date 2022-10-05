import React from "react";
import {Link} from "react-router-dom";


export default function FreeBoardCard({
    post
}) {
    return (
        <Link to={`/freeboard/${post?._id}`} className="flex flex-row h-1/4 w-[96%]">
            <div className="h-full w-2/3">
                <h4 className="font-bold mx-[1vw] mt-1 text-[0.75rem] leading-4 md:text-base md:h-2/5 lg:h-1/2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {post?.title}</h4>
                <div className="flex justify-start items-baseline mx-[1vw] text-[#979797]">
                    <span className="text-sm ml-[0.6vw] whitespace-nowrap overflow-hidden text-ellipsis">{post?.nickname}</span>
                    <span className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">{post?.created_at}</span>
                    <span className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">조회수</span>
                    <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{post?.views}</span>
                    <span className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">❤️</span>
                    <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{post?.likes}</span>
                </div>
            </div>
            <div className="flex items-center h-full w-1/3">
                <div className="flex w-full h-5/6 bg-[#D9D9D9] overflow-hidden">
                    {
                        post?.thumbnail !== undefined
                            ? <img src={post?.thumbnail} alt="" className="flex grow object-cover"/>
                            : null
                    }
                </div>
            </div>
        </Link>
    )
}