import React from "react";
import Carousel_S4 from "./Carousel/Carousel_S4";

export default function Section4() {
    return (
        <section className="m-auto flex h-screen w-screen snap-start items-center justify-center bg-white text-[#06113C]">
            <div className='h-[65vh] w-[75vw] border-4 border-emerald-300 bg-neutral-400'>
                <Carousel_S4/>
                <div className="flex items-center justify-center border-2 w-full h-[20%] border-sky-500">

                </div>
            </div>
        </section>
    )
}