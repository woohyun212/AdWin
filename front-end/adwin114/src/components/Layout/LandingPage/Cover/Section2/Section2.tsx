import React from "react";
import { Link } from "react-router-dom";
import Carousel1 from './Carousel/Carousel1'
import Carousel2 from './Carousel/Carousel2'
import Carousel3 from './Carousel/Carousel3'

export default function Section2() {
    return (
        <section
            className="m-auto flex flex-col h-screen w-screen snap-start items-center justify-center bg-white text-[#06113C]">
            <span className='flex font-bold text-2xl mb-[3vh]'>분양 광고</span>
            <div className='flex flex-col gap-[1vw] h-[65vh] w-[65vh] mx-auto overflow-hidden'>
                <div className='flex flex-row gap-[1vw] h-[40.5%] '>
                    <Carousel1/>
                    <Carousel2/>
                </div>
                <div className='flex h-[57.5%] '>
                    <Carousel3/>
                </div>
                <Link
                    className='flex bg-orange-400 justify-center w-1/4 leading-[2.5] mx-auto font-SenRegular text-white uppercase text-lg'
                    to='/Advertise'>More</Link>
            </div>
        </section>
    )
}