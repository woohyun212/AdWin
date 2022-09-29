import React from "react"
import { Link } from "react-router-dom"


// const RECRUIT_TYPE_DATA = [
//     { id: "SalesPerson", value: '직원' },
//     { id: "TeamLeader", value: '팀장' },
//     { id: "Director", value: '본부장' },
//     { id: "General", value: '총괄' },
//     { id: "Agency", value: '대행사' },
//     ];

// function changeRecruitTypeIdToValue (_id) {
//     return RECRUIT_TYPE_DATA.filter(el => el.id === _id)[0]?.value; 
// }

export default function FreeBoardCard({
    post
}) {
    return (
        <Link to={post._id} className="flex flex-row h-[12.5%] w-full justify-between">
            {/* <span className="flex flex-col w-[10%] items-center justify-center h-full">
                <p>{post.area}</p>
                <hr className="border-black w-[50%]"/>
                <p>{changeRecruitTypeIdToValue(post.recruit_type)}</p>
            </span> */}
            <div className="flex flex-col h-full w-[75%] content-between ">
                <h4
                    className="font-bold pt-2 text-base whitespace-nowrap overflow-hidden text-ellipsis">
                    {post.title}</h4>
                <span
                    className="mt-[1%] block w-[60%] text-xs whitespace-nowrap overflow-hidden text-ellipsis text-[#979797]">
                    {post.preview}</span>
                <div className="flex items-baseline text-[#979797]">
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[10%]">{post.user_name}</span>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[25%]">{post.created_at}</span>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-[16%] mr-4 ">조회수 {post.views}</span>
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-auto mr-auto">❤️ {post.likes}</span>
                </div>
            </div>
            <div className="flex float-right items-center h-full w-[15%]">
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