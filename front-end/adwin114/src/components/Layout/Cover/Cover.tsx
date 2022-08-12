import React from 'react';
import 'images/pedro-lastra.jpg';
import Search from './Search';
import {ReactComponent as OfficeBuilding} from 'images/office-building.svg'
import {ReactComponent as Annotation} from 'images/annotation.svg'
import {ReactComponent as Building} from 'images/building.svg'
import {ReactComponent as SpeechBubble} from 'images/speech_bubble.svg'
import {ReactComponent as Newspaper} from 'images/newspaper.svg'
import {ReactComponent as MagnifyingGlass} from 'images/MagnifyingGlass.svg'
import Carousel_1 from './Carousel_1'
import Carousel_2 from './Carousel_2'

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

            <section className="snap-end h-screen w-screen card bg-slate-400 text-black">
                <div
                    className='flex flex-col gap-3 h-[80vh] w-[80vh] border-4 border-red-400 mx-auto my-[10vh]'>
                    <div className='flex flex-row border-2 gap-2 border-yellow-400 h-2/5'>
                        <Carousel_1/>
                        {/* <Carousel_2/> */}
                    </div>
                    <div className='flex border-2 border-yellow-400 h-3/5'></div>
                </div>

            </section>
            <section className="snap-end h-screen w-screen card bg-amber-200 text-black">
                <div
                    className='grid grid-cols-2 gap-4 h-[80vh] w-[80vh] border-4 border-red-400 mx-auto my-[10vh]'></div>
            </section>
            <section className="snap-end h-screen w-screen card bg-green-300 text-black">

                <div
                    className='grid grid-cols-2 gap-4 h-[80vh] w-[80vh] border-4 border-red-400 mx-auto my-[10vh]'></div>
            </section>
        </main>
    )
}