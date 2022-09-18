import React from "react";
import Search from './Search';
import {ReactComponent as OfficeBuilding} from 'images/building-tower-svgrepo-com.svg'
import {ReactComponent as Annotation} from 'images/chat-svgrepo-com.svg'
import {ReactComponent as Newspaper} from 'images/world-news-svgrepo-com.svg'
import {Link} from "react-router-dom";

export function Section1() {
    return (
        // 랜딩페이지 최상단. 메인화면.
        <section
            className="m-auto flex flex-col h-screen w-screen snap-start items-center justify-center text-white space-y-16 ">
            <Search/>
            <div className="grid grid-cols-2 gap-4 text-[#06113C] text-xl">
                <Link to="promotion">
                    <span
                        className='flex flex-col justify-center items-center border-solid w-[5vw] h-[5vw] bg-white
                    leading-8 py-2 cursor-pointer hover:bg-[#FF8C32] hover:fill-slate-100 hover:text-slate-100 transition-colors ease-out text-base'>
                        <OfficeBuilding className='w-full h-auto '/>분양홍보
                    </span>
                </Link>
                <Link to="community">
                    <span
                        className='flex flex-col justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white  py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:fill-[#FF8C32] hover:text-slate-100 transition-colors ease-out text-base'>
                        <Annotation className='h-1/2'/>커뮤니티
                    </span>
                </Link>
                <Link to="news">
                    <span
                        className='flex flex-col justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white  py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:fill-slate-100 hover:text-slate-100 transition-colors ease-out text-base'>
                        <Newspaper className='h-full'/>뉴스
                    </span>
                </Link>
                <Link to="recruit-announce">
                    <span
                        className='flex flex-col justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white  py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:text-slate-100 transition-colors ease-out text-base'>
                        분양<br/>상담사<br/>모집
                    </span>
                </Link>
            </div>
        </section>
    )
}