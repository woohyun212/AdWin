import React from "react";
import { Link } from "react-router-dom";
import CarouselS4 from "./Carousel/CarouselS4";

export default function Section4() {
    return (
        <section className="m-auto flex flex-col h-screen w-screen items-center justify-end lg:space-y-40 bg-[#FF8C32] text-[#06113C] pb-16">
            <div className='h-[40vh] w-[400vw] md:w-[250vw] lg:w-full flex items-center justify-center space-x-20'>
                <CarouselS4/>
            </div>
            <div className="flex items-center justify-center w-full h-[20%] mt-[10vh] bg-[#D9D9D9]">
                <div className="w-auto h-full overflow-hidden">
                    <Link to={`#배너`} className="flex aspect-auto lg:aspect-[22/2] overflow-hidden">
                        <img src={require("images/carousel/조금독특한배너.png")} alt=""
                        className="flex self-center object-cover"/>
                    </Link>
                </div>
            </div>
        </section>
    )
    }