import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {

    return (
        <div
            className="relative flex w-[70%] flex-wrap items-stretch p-4">
            <input
                type="text"
                className="px-2 py-1 h-8 border border-solid border-gray-600  text-sm leading-snug
                 text-gray-700 bg-gray-100 shadow-none outline-none focus:outline-none w-full
                 font-normal flex-1 placeholder-gray-300"
                placeholder="Search gray"/>
            <span
                className="h-8 font-normal leading-snug flex text-center white-space-no-wrap border border-solid
                border-gray-600 text-sm bg-gray-100 items-center px-2 py-1 text-gray-800 
                placeholder-gray-300">
                검색
            </span>
        </div>
    )
}