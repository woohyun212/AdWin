// eslint-disable-next-line
import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as BunyangmonLogo} from 'assets/dragon.svg';
import {Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';
import { fetchToken, fetchUserData } from "Auth";

export default function Navbar({fixed}) {
    const [navbarOpen, setNavbarOpen] = useState(false);
    // eslint-disable-next-line
    const [Color, setColor] = useState("[#06113C]");

    const userData = fetchUserData();
    // console.log(userData);
    // const changeFontColor = () => {     if (window.scrollY >= 1000) {
    // setColor('white');     } else {         setColor('[#06113C]');     } };
    // useEffect(() => {     window.addEventListener('scroll', changeFontColor,
    // true);     return() => {window.removeEventListener('scroll',
    // changeFontColor);} }, []);

    return (
        <>
        <nav
            className={`h-[9vh] w-full flex flex-wrap items-center justify-between border-b border-${Color} ${useLocation().pathname === '/'
                ? 'bg-transparent'
                : 'bg-white'} text-${Color} transition-color ease-in-out duration-500`}>
            <div
                className="container static px-4 mx-auto flex flex-wrap items-center justify-between ">
                <div
                    className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link
                        className="text-xs tracking-widest font-sans mr-4 whitespace-nowrap uppercase"
                        to="/">
                        <BunyangmonLogo className="h-[6vh] self-center justify-center mx-auto"/>
                        Bunyangmon
                    </Link>
                    <button
                        className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none "
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}>
                        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                    </button>
                </div>
                <div
                    className={`absolute lg:flex items-center w-[75vw]  left-[12.5vw] lg:left-[15.5vw] md:w-[75vw] md:right-[9vw]` + (
                        navbarOpen
                            ? " flex top-[9vh] bg-white/90 border border-black lg:bg-transparent"
                            : " hidden"
                    )}>

                    <ul className="relative flex flex-col lg:flex-row list-none mr-auto">
                        {/* <li className="px-6 py-2">
                            <Item title="분양홍보 " to="/promotion"/>
                        </li> */}
                        <li className="px-6 py-2">
                            <Item title="분양상담사 모집" to="/recruit-announce"/>
                        </li>
                        <li className="px-6 py-2">
                            <Item title="커뮤니티" to="/freeboard"/>
                        </li>
                        <li className="px-6 py-2">
                            <Item title="뉴스" to="/news"/>
                        </li>
                        {/* <li className="px-6 py-2">
                            <Item title="문의사항" to="/qna"/>
                        </li> */}
                    </ul>
                    
                    {
                        fetchToken()
                            ? (
                                <div className={`flex items-center justify-center align-middle` + (
                                    navbarOpen
                                        ? " flex-col"
                                        : " felx-row"
                                )}> 
                            {/* <Link to="/profile">
                            <div className="flex rounded-full h-14 aspect-square border-2 overflow-hidden border-black">
                                <img
                                className="object-cover self-center"
                                alt="프로필 사진"
                                src={fetchProfileImage()}/></div>
                            </Link> */}
                            <Item title="내 정보" to="/profile" addClass="px-3 py-2"/>
                            <Item title="로그아웃" to="/logout" addClass="px-3 py-2"/>
                        </div>
                            )
                            : (
                                <> < Item title = "로그인" to = "/login" addClass = "px-3 py-2" /> <Item
                                    title="회원가입"
                                    to="/register"
                                    addClass={`border rounded-lg px-3 py-2 border-${Color} mr-1`}/></>
                            )
                    }
                </div>
            </div>

        </nav>
        
        </>
    );
}

function Item({
    title,
    to,
    addClass = ''
}) {
    return (
        <Link
            // className뒤에 꼭 공백하나 이상 남겨두기
            className={"flex items-center text-xs whitespace-nowrap md:text-base font-semibold uppercase leading-snug hover:opacity" +
                    "-75 tracking-widest " + addClass} to={to}>
            <span className="">{title}</span>
        </Link>
    );
}
