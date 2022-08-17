import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"
import React from "react";
import Slider from "react-slick";
import ImageCard from "./ImageCard";

export default function Carousel1() {
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
        <Slider {...settings} className="w-[69%]">
            <ImageCard src={require("images/carousel/분양2.png")}/>
            <ImageCard src={require("images/carousel/anthony-esau.png")}/>
            <ImageCard src={require("images/carousel/scott-webb.png")}/>
            <ImageCard src={require("images/carousel/img1.jpg")}/>
            <ImageCard src={require("images/carousel/img2.jpg")}/>
        </Slider>
    );
}
