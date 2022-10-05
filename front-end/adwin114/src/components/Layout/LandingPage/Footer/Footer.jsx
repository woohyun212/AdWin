import React from 'react';
import {ReactComponent as BunyangmonLogo} from 'images/dragon_color.svg';

export default function Footer() {
    return (
        <> 
        <footer
            className="bottom-0 mx-auto flex flex-row w-screen items-center justify-self-end bg-[#D9D9D9] text-[#06113C] py-3">
            <div className='aspect-square hitespace-nowrap uppercase justify-center text-center ml-auto mr-7 w-16 md:w-auto text-[0.5rem] lg:text-base'>
            <img className="h-12 self-center m-auto" src={require("images/logo.png")} alt=""/>
            </div>
            <span className='flex flex-col h-2/3 w-2/3 mr-auto text-[0.5rem] lg:text-base'>
                <p>주식회사 윈애드컴퍼니 </p>
                <p>대표이사: 최용재 / 소재지: 경기도 안산시 단원구 산단로 325, 11층 1169호<br/>
                사업자등록번호: 271-86-01944 </p> 
                <p>문의: 1666-8482</p>
                <p>Copyright 2022. WOOHYUN PARK, JIYEON JANG, WINAD COMPANY All rights reserved.</p>
            </span>
        </footer>
    </>
    )
}