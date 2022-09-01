import React from "react";
import { Link } from "react-router-dom";
import CarouselS4 from "./Carousel/CarouselS4";

export default function Section4() {
    return (
        <section className="m-auto flex flex-col  h-screen w-screen snap-start items-center justify-end space-y-40 bg-white text-[#06113C] pb-16">
            <div className='h-[40vh] w-[90vw] flex items-center justify-center space-x-20'>
                <CarouselS4/>
            </div>
            <div className="flex items-center justify-center w-full bg-[#D9D9D9]">
                <div className="w-[74%] h-full overflow-hidden">
                    <Link to={`#배너`} className="flex aspect-[22/2] overflow-hidden">
                        <img src={require("images/carousel/조금독특한배너.png")} alt="" className="flex grow object-top"/>
                    </Link>
                </div>
            </div>
        </section>
    )
    }