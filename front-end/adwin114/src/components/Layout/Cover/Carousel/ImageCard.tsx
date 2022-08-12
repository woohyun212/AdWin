import React from "react";

interface ImageCardProps {
    src: string;
    width: string;
    height: string;
    addClass?: string;
    alt?: string;
}

export default function ImageCard({src, width, height, addClass, alt} : ImageCardProps) {
    return (
        <div className="overflow-hidden">
            <img
                src={require(src)}
                className={"w-[" + width + "] h-[" + height + "] object-cover object-left-top" +
                        addClass}
                alt={alt}/>
        </div>
    );
}