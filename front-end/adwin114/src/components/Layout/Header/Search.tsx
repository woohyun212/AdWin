import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
    return (
        <div
            className="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
            <div className="flex">
                <span
                    className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-indigo-600 rounded-full text-sm bg-indigo-100 items-center rounded-r-none pl-2 py-1 text-indigo-800 border-r-0 placeholder-indigo-300">
                    <FontAwesomeIcon icon={faSearch}/>
                </span>
            </div>
            <input
                type="text"
                className="px-2 py-1 h-8 border border-solid  border-indigo-600 rounded-full text-sm leading-snug text-indigo-700 bg-indigo-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-indigo-300"
                placeholder="Search indigo"/>
        </div>
    )
}