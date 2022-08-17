import React from "react";
import {Link} from "react-router-dom";

interface FreeBoardCardProps {
    id: number,
    title: string,
    author: string,
    publishedAt: string,
    Views: number,
    Likes: number,
    thumnailUrl?: string
}

export default function FreeBoardCard({
    id,
    title,
    author,
    publishedAt,
    Views,
    Likes,
    thumnailUrl=undefined
} : FreeBoardCardProps) {
    return (
        <Link to={`/#${id}`} className="flex flex-row h-1/4 w-[96%]">
            <div className="h-full w-2/3">
                <h4 className="font-bold mx-[1vw] mt-[1.4vh] text-lg h-4/6 whitespace-nowrap overflow-hidden text-ellipsis">
                    {title}</h4>
                <div className="flex justify-end items-baseline mx-[1vw] text-[#979797]">
                    <span className="text-sm ml-[0.6vw] whitespace-nowrap overflow-hidden text-ellipsis">{author}</span>
                    <span className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">{publishedAt}</span>
                    <span className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">조회수</span>
                    <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{Views}</span>
                    <span className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">❤️</span>
                    <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{Likes}</span>
                </div>
            </div>
            <div className="flex items-center h-full w-1/3">
                <div className="flex w-full h-5/6 bg-[#D9D9D9] overflow-hidden">
                    {
                        thumnailUrl !== undefined
                            ? <img src={thumnailUrl} alt="" className="flex grow object-cover"/>
                            : null
                    }
                </div>
            </div>
        </Link>
    )
}