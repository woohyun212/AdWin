import React from "react";
import FreeBoardCard from "./FreeBoardCard";
import NewsCard from "./NewsCard";
import {Link} from "react-router-dom";

export default function Section3() {
    return (
        <section
            className="m-auto flex flex-col h-screen w-screen snap-start items-center justify-center bg-white text-[#06113C]">
            <h1
                className='flex font-SenRegular justify-center mx-auto mt-[18vh] mb-[6vh] text-2xl uppercase'>Community</h1>
            <div
                className='grid grid-cols-2 gap-x-[2vw] gap-0 h-[55vh] w-[60vw] mx-auto mb-[17.4vh] leading-9 font-bold'>
                {/* 인기1개 최상위 3개 */}
                <div className="자유게시판">
                    <div className='flex justify-between'>
                        <span className='ml-[1.1vw]'>자유 게시판</span>
                        <Link className=' text-2xl' to="frb">+</Link>
                    </div>
                    <div className='h-full w-full border-2 border-y-[#06113C] border-x-transparent'>
                        <FreeBoardCard
                            id={1}
                            title={"이거슨 제목이요"}
                            author={"이거슨 이름이로다"}
                            publishedAt={"2022-08-14"}
                            Views={0}
                            Likes={0}
                            thumnailUrl={require("images/carousel/분양2.png")}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <FreeBoardCard
                            id={2}
                            title={"이것은 아무런 의미가 없는 제목"}
                            author={"이것은 이름이로다"}
                            publishedAt={"2022-08-14"}
                            Views={0}
                            Likes={0}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <FreeBoardCard
                            id={3}
                            title={"이거슨 제목이요"}
                            author={"홍길동s"}
                            publishedAt={"2022-08-14"}
                            Views={0}
                            Likes={0}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <FreeBoardCard
                            id={4}
                            title={"이거슨 제목이요"}
                            author={"김아무개"}
                            publishedAt={"2022-08-14"}
                            Views={0}
                            Likes={0}/>
                    </div>
                </div>
                <div className="뉴스">
                    <div className='flex justify-between'>
                        <span className='ml-[1.1vw]'>뉴스</span>
                        <Link className=' text-2xl' to="news">+</Link>
                    </div>
                    <div className='h-full w-full border-2 border-y-[#06113C] border-x-transparent'>
                        <NewsCard
                            Id={1}
                            title={"긴제목ㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱㄱ"}
                            publishedAt={"2022-08-15"}
                            Views={1}
                            Likes={1}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <NewsCard Id={2} title={"ㅉ"} publishedAt={"2022-08-15"} Views={1} Likes={1}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <NewsCard
                            Id={3}
                            title={"[자막뉴스] 샤워 5분 이내 권고.. 유럽 최악의 기후 상황"}
                            publishedAt={"2022-08-15"}
                            Views={1}
                            Likes={1}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <NewsCard
                            Id={4}
                            title={"평택 ‘오션센트럴비즈’ …교통 호재, 편의성 ↑"}
                            publishedAt={"2022-08-15"}
                            Views={1}
                            Likes={1}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <NewsCard
                            Id={5}
                            title={"평택포승 BIX 개발·동반성장…'오션센트럴비즈' 분양"}
                            publishedAt={"2022-08-15"}
                            Views={1}
                            Likes={1}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <NewsCard
                            Id={6}
                            title={"골드랜드제이앤제이, 미래산업 거점도시 부상 평택서 `오션센트럴비즈` 공급"}
                            publishedAt={"2022-08-15"}
                            Views={1}
                            Likes={1}/>
                        <hr className="border-[#06113C] opacity-30"/>
                        <NewsCard
                            Id={7}
                            title={"경기 평택에 초대형 지식산업센터 ‘오션센트럴비즈’ 공급"}
                            publishedAt={"2022-08-15"}
                            Views={1}
                            Likes={1}/>
                    </div>
                </div>
            </div>
        </section>
    )
}
