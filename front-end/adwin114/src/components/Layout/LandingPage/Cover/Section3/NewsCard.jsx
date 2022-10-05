import React from "react";
import {Link} from "react-router-dom";


export default function NewsCard(
    {article}
) {
    return (
        <button onClick={() => window.open(article.url, '_blank')} className="flex flex-row h-[14%] w-[96%] justify-between align-middle">
            <div className="flex grow h-full w-1/4">
                <h4
                    className="font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis left-0 my-auto mx-4">
                    {article?.title}</h4>
            </div>
            <div className="right-0 flex justify-end items-baseline text-[#979797]  my-auto">
                <span
                    className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">{article?.created_at}</span>
                {/* <span
                    className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">조회수</span>
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{Views}</span>
                <span
                    className="text-sm ml-[0.5vw] whitespace-nowrap overflow-hidden text-ellipsis">❤️</span>
                <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{Likes}</span> */}
            </div>
        </button>
    )
}