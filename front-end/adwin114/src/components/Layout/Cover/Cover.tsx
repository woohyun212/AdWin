import React from 'react';
import 'images/pedro-lastra.jpg';
import Search from './Search';
import {ReactComponent as OfficeBuilding} from 'images/office-building.svg'
import {ReactComponent as Annotation} from 'images/annotation.svg'
import {ReactComponent as Newspaper} from 'images/newspaper.svg'
import Carousel1 from './Carousel/Carousel1'
import Carousel2 from './Carousel/Carousel2'
import Carousel3 from './Carousel/Carousel3'

export default function Cover() {
    return (
        <main
            className="overflow-y-scroll snap-y snap-mandatory flex flex-col h-screen w-screen ">
            <section
                className="snap-center flex flex-col h-screen w-screen space-y-16 mt-[30vh] mb-[37vh] place-items-center items-center">
                <Search/>
                <div className="grid grid-cols-2 gap-4 text-black text-xl">
                    <span
                        className='flex flex-col justify-center items-center border-solid w-[5vw] h-[5vw] bg-white
                            leading-8 py-2 cursor-pointer hover:bg-[#FF8C32] hover:text-slate-100 transition-colors ease-out'>
                        <OfficeBuilding className='h-full'/>분양홍보
                    </span>

                    <span
                        className='flex flex-col justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:text-slate-100 transition-colors ease-out'>
                        <Annotation className='h-1/2'/>커뮤니티</span>
                    <span
                        className='flex flex-col justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:text-slate-100 transition-colors ease-out'>
                        <Newspaper className='h-full'/>뉴스</span>
                    <span
                        className='flex flex-col justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:text-slate-100 transition-colors ease-out'>분양<br/>상담사<br/>모집</span>
                </div>
            </section>

            <section
                className="snap-end h-screen w-screen flex flex-col justify-center items-center bg-white text-black py-[14.3vh]">
                <span className='flex font-bold text-2xl mb-[5vh]'>분양 광고</span>
                <div
                    className='flex flex-col gap-[1vw] h-[65vh] w-[65vh] mx-auto drop-shadow-2xl'>
                    <div className='flex flex-row gap-[1vw] h-[40.5%]'>
                        <Carousel1/>
                        <Carousel2/>
                    </div>
                    <div className='flex h-[57.5%] '>
                        <Carousel3/>
                    </div>
                    <a
                        className='flex bg-orange-400 font-bold justify-center w-1/4 leading-[2.5] mx-auto  ' href='#'>MORE</a>
                </div>

            </section>

            <section className="snap-start h-screen w-screen bg-amber-200 text-black">
                <div
                    className='grid grid-cols-2 gap-4 h-[80vh] w-[80vh] border-4 border-red-400 mx-auto my-[10vh]'></div>
            </section>

            <section className="snap-start h-screen w-screen bg-transparent text-black">

                <div
                    className='grid grid-cols-2 gap-4 h-[80vh] w-[80vh] border-4 border-red-400 mx-auto my-[10vh]'></div>
            </section>
        </main>
    )
}