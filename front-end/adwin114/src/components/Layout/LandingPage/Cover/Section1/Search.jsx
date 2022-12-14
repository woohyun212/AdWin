import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";



export default function Search() {
    const navigate = useNavigate();

    const onKeyPress = (e) => {
        if (e.key == 'Enter') { 
            navigate(`/recruit-announce?search=${e.target.value}`);
        }
    };
    return (
        <>
        <div
            className="flex sm:w-[60vw] md:w-[45vw] px-4 flex-wrap items-stretch">
            <div className="flex">
                <span
                    className="font-normal leading-snug flex text-center whitespace-nowrap
                        rounded-r-none py-0 px-4 border border-solid border-[#06113C] rounded-none
                    bg-[#06113C] items-center  text-white border-r-0 text-2xl" >
                    <FontAwesomeIcon icon={faSearch}/>
                </span>
            </div>
            <input
                type="text"
                onKeyPress={onKeyPress}
                className="px-5 py-2 h-full w-full border-2 border-solid  border-[#06113C] rounded-none text-2xl leading-snug
                 text-[#06113C] bg-placeholder-slate-300 focus:outline-none
                 font-normal rounded-l-none flex-1 border-l-0 placeholder-indigo-300"
                placeholder="검색할 내용을 입력하세요"/>
        </div>      
        </>
    )
}