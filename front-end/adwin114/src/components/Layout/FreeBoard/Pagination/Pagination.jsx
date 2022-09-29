/* This example requires Tailwind CSS v2.0+ */
import React from "react";
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'

export default function Pagination(
    {allPages, currentPage, setCurrentPage}) {
    let arr = []
    if (allPages <= 5) {
        arr = Array(allPages);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = i + 1;
        }
    } else if (currentPage <= 3) {
        arr = Array(5);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = i + 1;
        }
    } else if (currentPage >= allPages - 2) {
        arr = Array(5);
        for (let i = 4; i >= 0; i--) {
            arr[i] = allPages - (4 - i);
        }
    } else {
        arr =  [currentPage - 2,currentPage - 1,currentPage,currentPage + 1,currentPage + 2];
    }

    function changePage(page) {
        if (page <= 1) {
            setCurrentPage(1)
        } else if (page >= allPages) {
            setCurrentPage(allPages)
        } else {
            setCurrentPage(page);
        }
    }
    return (
        <div className="flex w-1/3 items-center justify-between border-t px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => changePage(currentPage - 1)}
                    className="relative inline-flex items-center rounded-md border border-gray-300
                    bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    이전
                </button>
                <button
                    onClick={() => changePage(currentPage + 1)}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300
                     bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    다음
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <nav
                        className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination">
                        <button
                            onClick={() => changePage(currentPage - 1)}
                            className="relative inline-flex items-center rounded-l-md border border-r-transition border-gray-300 \
                             bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:text-[#FF8C32] hover:bg-gray-200">
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5"/>
                        </button>
                        {
                            arr.map(
                                (page_number) => <button
                                    key={page_number}
                                    className={"relative inline-flex items-center border-y border-gray-300 bg-white  px-4 py-2" +
                                            " text-sm font-medium hover:bg-gray-200 text-gray-500 hover:text-[#FF8C32] " + (
                                        page_number === currentPage
                                            ? " text-[#FF8C32] border-[#FF8C32]"
                                            : ""
                                    )}
                                    onClick={() => changePage(page_number)}>{page_number}
                                </button>
                            )
                        }
                        <button
                            onClick={() => changePage(currentPage + 1)}
                            className="relative inline-flex items-center rounded-r-md border border-l-transparent border-gray-300 \
                             bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:text-[#FF8C32] hover:bg-gray-200">
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5"/>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}