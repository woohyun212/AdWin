import React from "react";
import Search from './Search';
import {ReactComponent as OfficeBuilding} from 'images/building-tower-svgrepo-com.svg'
import {ReactComponent as Annotation} from 'images/chat-svgrepo-com.svg'
import {ReactComponent as Newspaper} from 'images/world-news-svgrepo-com.svg'
import {Link} from "react-router-dom";

export default function Section1() {
    return (
        // 랜딩페이지 최상단. 메인화면.
        <section
            className="m-auto flex flex-col h-screen w-screen snap-start items-center justify-center text-white space-y-16 ">
            <Search/>
            <div className="grid grid-cols-2 sm:grid-flow-row gap-4 text-[#06113C] text-xl">
                <div
                    className="flex flex-col static bg-white w-[20vh] aspect-square text-black justify-center items-center">
                    <p className="text-base">분양 상담사 모집</p>
                    <p className="text-xl ">지역별</p>
                    <div
                        className="flex flex-col gap-3 absolute hover:bg-[#FF8C32] w-[20vh] aspect-square
                     text-transparent hover:text-white justify-center items-center transition-color ease-in-out duration-150">
                        <p className="text-base">지역별</p>

                        <div className="grid grid-cols-2 gap-2 gap-y-5 justify-center justify-items-center">
                            <Link
                                to="/recruit-announce?area=서울"
                                className="area whitespace-nowrap text-xs hover:text-base transition-all ease-in-out duration-150">서울특별시</Link>
                            <Link
                                to="/recruit-announce?area=ㅅ"
                                className="area whitespace-nowrap text-xs hover:text-base transition-all ease-in-out duration-150">경기·인천</Link>

                            <Link
                                to="/recruit-announce?area=ㅅ"
                                className="area whitespace-nowrap text-xs hover:text-base transition-all ease-in-out duration-150">부산·울산·경남</Link>
                            <Link
                                to="/recruit-announce?area=ㅅ"
                                className="area whitespace-nowrap text-xs hover:text-base transition-all ease-in-out duration-150">대구·경북</Link>

                            <Link
                                to="/recruit-announce?area=ㅅ"
                                className="area whitespace-nowrap text-xs hover:text-base transition-all ease-in-out duration-150">대전·충청</Link>
                            <Link
                                to="/recruit-announce?area=ㅅ"
                                className="area whitespace-nowrap text-xs hover:text-base transition-all ease-in-out duration-150">광주·전라</Link>
                        </div>
                        <Link
                                to="/recruit-announce?area=ㅅ"
                                className="area whitespace-nowrap text-xs hover:text-base transition-all ease-in-out duration-150">강원·제주</Link>

                    </div>
                </div>

                <div
                    className="flex flex-col static bg-white w-[20vh] aspect-square text-black justify-center items-center">
                    <p className="text-base">분양 상담사 모집</p>
                    <p className="text-xl">물건별</p>
                </div>
            </div>
        </section>
    )
}