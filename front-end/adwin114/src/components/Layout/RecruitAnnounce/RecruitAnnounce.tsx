import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header from "../Header";
import Search from "./Search";
import RecruitAnnounceList from "./RecruitAnnounceList";


export default function RecruitAnnounce(): JSX.Element {
    return (
        <div
            className="flex bg-[#EFEFEF] justify-center content-center w-screen h-screen">
            <Header/>
            <div className="h-[90vh] w-[50%] mt-[10vh] mx-auto">
                <Search/>
                <div
                    className="flex flex-col h-[77.5%] w-full gap-0 items-center justify-center px-2 border-4 border-y-[#06113C] border-x-transparent">
                    <RecruitAnnounceList/>
                </div>
                <div className="flex items-center justify-center border-4 border-blue-500"></div>
            </div>
        </div>
    )
}
