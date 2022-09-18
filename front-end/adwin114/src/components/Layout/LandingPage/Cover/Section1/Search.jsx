import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

export default function Search() {
    return (
        <>
        <form
            className="flex sm:w-[60vw] md:w-[45vw] px-4 flex-wrap items-stretch">
            <div className="flex">
                <span
                    className="font-normal leading-snug flex text-center white-space-no-wrap
                        rounded-r-none py-0 px-4 border border-solid border-[#06113C] rounded-none
                    bg-[#06113C] items-center  text-white border-r-0 text-2xl" >
                    <FontAwesomeIcon icon={faSearch}/>
                </span>
            </div>
            <input
                type="text"
                className="px-5 py-2 h-full w-full border-2 border-solid  border-[#06113C] rounded-none text-2xl leading-snug
                 text-[#06113C] bg-placeholder-slate-300 focus:outline-none
                 font-normal rounded-l-none flex-1 border-l-0 placeholder-indigo-300"
                placeholder="검색할 내용을 입력하세요"/>
        </form>      
        </>
    )
}