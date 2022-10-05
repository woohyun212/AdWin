import React from "react"
import { Link } from "react-router-dom"


const RECRUIT_TYPE_DATA = [
    { id: "SalesPerson", value: '직원' },
    { id: "TeamLeader", value: '팀장' },
    { id: "Director", value: '본부장' },
    { id: "General", value: '총괄' },
    { id: "Agency", value: '대행사' },
    ];

function changeRecruitTypeIdToValue (_id) {
    return RECRUIT_TYPE_DATA.filter(el => el.id === _id)[0]?.value; 
}

export default function RecruitAnnounceCard({
    post
}) {
    return (
        <Link to={post._id} className="flex flex-row justify-between h-[12.5%] w-full">
            <span className="flex flex-col w-[22.5%] items-center justify-center h-full">
                <p className="font-bold w-full whitespace-nowrap overflow-hidden text-ellipsis text-xs lg:text-base text-center">{post.area}</p>
                <hr className="border-black w-[75%]"/>
                <p className="font-bold w-full whitespace-nowrap overflow-hidden text-ellipsis text-xs lg:text-base text-center">{post.real_estate_type}</p>
                <hr className="border-black w-[75%]"/>
                <p className="font-bold w-full whitespace-nowrap overflow-hidden text-ellipsis text-xs lg:text-base text-center">{changeRecruitTypeIdToValue(post.recruit_type)}</p>
            </span>
            <div className="flex flex-col h-full w-[60%] content-start grow ml-[3%]">
                <h4
                    className="w-[60%] font-bold pt-2 text-xs md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                    {post.title}</h4>
                <span
                    className="mt-[1%] block w-[60%] text-[0.5rem] md:text-xs whitespace-nowrap overflow-hidden text-ellipsis text-[#979797]">
                    {post.preview}</span>
                <div className="flex items-baseline text-[#979797]">
                    <span className="text-[0.5rem] md:text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[10%]">{post.nickname}</span>
                    <span className="text-[0.5rem] md:text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[25%]">{post.created_at}</span>
                    <span className="text-[0.5rem] md:text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[16%] mr-4 ">조회수 {post.views}</span>
                    <span className="text-[0.5rem] md:text-xs whitespace-nowrap overflow-hidden text-ellipsis w-auto mr-auto">❤️ {post.likes}</span>
                </div>
            </div>
            <div className="flex items-center h-full w-[20%] mr-[1%]">
                <div className="flex w-full h-5/6 bg-[#D9D9D9] overflow-hidden">
                    {
                        post.thumbnail !== undefined
                            ? <img src={post.thumbnail} alt="" className="flex grow object-cover"/>
                            : null
                    }
                </div>
            </div>
        </Link>
    )
}