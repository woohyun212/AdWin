import React from "react";
import Search from './Search';
import {Link} from "react-router-dom";

export default function Section1() {
    return (
        // 랜딩페이지 최상단. 메인화면.
        <section
            className="m-auto flex flex-col h-screen w-screen items-center justify-center text-white space-y-16 ">
            <Search/>
            <div className="static grid grid-cols-2 gap-4 text-[#06113C]">
                <div
                    className="flex flex-col relative border-4 border-[#06113c] bg-[#eeeeee] w-[45vw] h-[50vh] md:w-[30vw] md:h-auto md:aspect-square lg:w-[45vh] text-black justify-center items-center">
                    <p className="font-bold text-base">분양 상담사 모집</p>
                    <p className="font-bold text-xl ">지역별</p>
                    <div
                        className="flex flex-col gap-3 absolute hover:bg-pointColor w-[45vw] h-[50vh] md:w-[30vw] md:h-auto md:aspect-square lg:w-[45vh]
                     text-transparent hover:text-white justify-center items-center transition-color ease-in-out duration-150">
                        {/* <p className="text-base">지역별</p> */}

                        <div className="grid grid-cols-1 gap-2 gap-y-1 justify-center justify-items-center">
                            <Link
                                to="/recruit-announce?area=서울특별시"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">서울특별시</Link>
                            <Link
                                to="/recruit-announce?area=경기·인천"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">경기·인천</Link>

                            <Link
                                to="/recruit-announce?area=부산·울산·경남"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">부산·울산·경남</Link>
                            <Link
                                to="/recruit-announce?area=대구·경북"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">대구·경북</Link>

                            <Link
                                to="/recruit-announce?area=대전·충청"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">대전·충청</Link>
                            <Link
                                to="/recruit-announce?area=광주·전라"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">광주·전라</Link>
                        
                            <Link
                                to="/recruit-announce?area=강원·제주"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">강원·제주</Link>
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col relative border-4 border-[#06113C] bg-[#eeeeee] w-[45vw] h-[50vh] md:w-[30vw] md:h-auto md:aspect-square lg:w-[45vh] text-black justify-center items-center">
                    <p className="font-bold text-base">분양 상담사 모집</p>
                    <p className="font-bold text-xl">물건별</p>
                    <div
                        className="flex flex-col gap-1 absolute hover:bg-pointColor w-[45vw] h-[50vh] md:w-[30vw] md:h-auto md:aspect-square lg:w-[45vh]
                     text-transparent hover:text-white justify-center items-center transition-color ease-in-out duration-150">
                        {/* <p className="text-base">물건별</p> */}

                        <div className="grid grid-cols-1 gap-y-1 justify-center justify-items-center">
                            <Link
                                to="/recruit-announce?real_estate_type=아파트"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">아파트</Link>
                            <Link
                                to="/recruit-announce?real_estate_type=빌라"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">빌라</Link>

                            <Link
                                to="/recruit-announce?real_estate_type=지식산업센터"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">지식산업센터</Link>
                            <Link
                                to="/recruit-announce?real_estate_type=상가"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">상가</Link>

                            <Link
                                to="/recruit-announce?real_estate_type=오피스텔"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">오피스텔</Link>
                            <Link
                                to="/recruit-announce?real_estate_type=토지"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">토지</Link>
                        </div>
                        <Link
                                to="/recruit-announce?real_estate_type=기타"
                                className="font-bold area whitespace-nowrap text-md lg:text-base hover:text-base lg:hover:text-lg transition-[font-size] ease-in-out duration-150">기타</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}