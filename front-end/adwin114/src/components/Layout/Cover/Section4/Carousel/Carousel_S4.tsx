import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel_S4.css"
import React from "react";
import Slider from "react-slick";
import ImageCard from "./ImageCard";

export default function Carousel_S4() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <Slider {...settings} className="Carousel_S4 w-[100%] h-[70%] border-2 border-sky-500" speed={1000}>
            <ImageCard src={require("images/carousel/분양1.jpg")} className="asas"/>
            <ImageCard src={require("images/carousel/분양1.png")}/>
            <ImageCard src={require("images/carousel/malcolm-shadrach-_r80LCluvVM-unsplash 1.png")}/>
            <ImageCard src={require("images/carousel/malcolm-shadrach-_r80LCluvVM-unsplash 1.png")}/>
            <ImageCard src={require("images/carousel/malcolm-shadrach-_r80LCluvVM-unsplash 1.png")}/>
            <ImageCard src={require("images/carousel/malcolm-shadrach-_r80LCluvVM-unsplash 1.png")}/>
            <ImageCard src={require("images/carousel/malcolm-shadrach-_r80LCluvVM-unsplash 1.png")}/>
            <ImageCard src={require("images/carousel/malcolm-shadrach-_r80LCluvVM-unsplash 1.png")}/>
            <ImageCard src={require("images/carousel/point3d-commercial-imaging-ltd-6GruB-1L9kE-unsplash 1.png")}/>
            <ImageCard src={require("images/carousel/point3d-commercial-imaging-ltd-r68eIg0hzpo-unsplash 2.png")}/>
        </Slider>
    );
}
