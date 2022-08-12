import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel_1.css"
import React from "react";
import Slider from "react-slick";
import ImageCard from "./Carousel/ImageCard";

export default function Carousel_1() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return (
        <div className="w-3/4 h-full">
            <Slider {...settings} className="w-full h-full">
                <div className="overflow-hidden">
                    <img
                        src={require("images/carousel/anthony-esau.png")}
                        className="w-[30vw] h-[32vh] object-cover"
                        alt=""/>
                </div>
                <div className="overflow-hidden">
                    <img
                        src={require("images/carousel/분양1.png")}
                        className="w-[30vw] h-[32vh] object-cover object-left-top"
                        alt=""/>
                </div>
                <div className="overflow-hidden">
                    <img
                        src={require("images/carousel/분양2.png")}
                        className="w-[30vw] h-[32vh] object-cover object-left-top"
                        alt=""/>
                </div>
                <div className="overflow-hidden">
                    <img
                        src={require("images/carousel/scott-webb.png")}
                        className="w-[30vw] h-[32vh] object-cover object-left-top"
                        alt=""/>
                </div>
                <div className="overflow-hidden">
                    <img
                        src={require("images/carousel/img1.jpg")}
                        className="w-[30vw] h-[32vh] object-cover object-left-top"
                        alt=""/>
                </div>
                <div className="overflow-hidden">
                    <img
                        src={require("images/carousel/img2.jpg")}
                        className="w-[30vw] h-[32vh] object-cover object-left-top"
                        alt=""/>
                </div>
                <ImageCard src="./images/carousel/img2.jpg" width="30vw" height="32vh"></ImageCard>
            </Slider>
        </div>
    );
}
