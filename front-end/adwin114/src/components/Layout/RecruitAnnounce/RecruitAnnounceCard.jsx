import React from "react"
import { Link } from "react-router-dom"


interface RecruitAnnounceCardProps {
    post : { 
        _id: string,
        title: string,
        area: string,
        user_name: string,
        content: string,
        created_at: string,
        views: number,
        likes: number,
        thumnailUrl?: string
    }
}


export default function RecruitAnnounceCard({
    post
} : RecruitAnnounceCardProps) {
    return (
        <Link to={post._id} className="flex flex-row h-[12.5%] w-full">
            <span className="flex w-[10%] items-center justify-center h-full">{post.area}</span>
            <div className="flex flex-col h-full w-[75%] content-between ">
                <h4
                    className="font-bold pt-2 text-base whitespace-nowrap overflow-hidden text-ellipsis">
                    {post.title}</h4>
                <span
                    className="mt-[1%] block w-[60%] text-xs whitespace-nowrap overflow-hidden text-ellipsis text-[#979797]">
                    {post.content}</span>
                <div className="flex items-baseline text-[#979797]">
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[10%]">{post.user_name}</span>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[25%]">{post.created_at}</span>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[16%] mr-4 ">조회수 {post.views}</span>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-auto mr-auto">❤️ {post.likes}</span>
                </div>
            </div>
            <div className="flex left-0 items-center h-full w-[15%]">
                <div className="flex w-full h-5/6 bg-[#D9D9D9] overflow-hidden">
                    {
                        post.thumnailUrl !== undefined
                            ? <img src={post.thumnailUrl} alt="" className="flex grow object-cover"/>
                            : null
                    }
                </div>
            </div>
        </Link>
    )
}