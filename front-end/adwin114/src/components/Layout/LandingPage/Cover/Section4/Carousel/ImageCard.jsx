import React from "react";
import { Link } from "react-router-dom";

interface ImageCardProps {
    src: any;
    className?: string;
    alt?: string;
}

export default function ImageCard({src, className="", alt=""} : ImageCardProps) {
    return (
        <Link to={`#1`} className="flex aspect-[2/3] overflow-hidden">
            <img
                src={src}
                className={"flex grow object-cover object-left-top "+ className}
                alt={alt}/>
        </Link>
    );
}