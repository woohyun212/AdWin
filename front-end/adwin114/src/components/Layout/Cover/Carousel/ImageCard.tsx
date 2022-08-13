import React from "react";

interface ImageCardProps {
    src: any;
    addClass?: string;
    alt?: string;
}

export default function ImageCard({src, addClass="", alt=""} : ImageCardProps) {
    return (
        <div className="overflow-hidden">
            <img
                src={src}
                className="object-cover object-left-top"
                alt={alt}/>
        </div>
    );
}