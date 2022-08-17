import React from "react";

interface ImageCardProps {
    src: any;
    className?: string;
    alt?: string;
    ratio?: string
}

export default function ImageCard({src, className="", alt="",ratio="5/3"} : ImageCardProps) {
    return (
        <div className={`flex aspect-[${ratio}] overflow-hidden`}>
            <img
                src={src}
                className={"flex grow object-cover object-left-top "+ className}
                alt={alt}/>
        </div>
    );
}