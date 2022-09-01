import React from "react";
import {Link} from "react-router-dom";

interface NewsCardProps {
    Id: number,
    title: string,
    publishedAt: string,
    Views: number,
    Likes: number
}

export default function NewsCard(
    {Id, title, publishedAt, Views, Likes} : NewsCardProps
) {
    return (
        <Link to={`#${Id}`} className="flex flex-row h-[14.28571428571429%] w-[96%] justify-between align-middle">
            <div className="flex grow h-full w-1/4">
                <h4
                    className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis left-0 my-auto mx-4">
                    {title}</h4>
            </div>
            <div className="right-0 flex justify-end items-baseline text-[#979797]  my-auto">
                <span
                    className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">{publishedAt}</span>
                <span
                    className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">조회수</span>
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{Views}</span>
                <span
                    className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">❤️</span>
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{Likes}</span>
            </div>
        </Link>
    )
}