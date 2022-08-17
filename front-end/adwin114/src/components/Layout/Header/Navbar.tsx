import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {ReactComponent as AdWinLogo} from 'assets/WINAD.svg';
import { Link } from "react-router-dom";

export default function Navbar({fixed} : any) {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [Color, setColor] = useState("white");

    const changeFontColor = () => {
        if (window.scrollY >= 1000) {
            setColor('white');
        } else {
            setColor('[#06113C]');
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', changeFontColor, true);
        return() => {window.removeEventListener('scroll', changeFontColor);}
    }, []);

    return (
        <nav
            className={`w-full flex flex-wrap items-center justify-between border-b border-slate-300 bg-transparent text-${Color} transition-color ease-in-out duration-500`}>
            <div
                className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div
                    className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <Link
                        className="text-lg tracking-widest font-sans leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                        to="/">
                        <AdWinLogo/>AdWin114
                    </Link>
                    <button
                        className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none "
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}>
                        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                    </button>
                </div>
                <div
                    className={"lg:flex flex-grow items-center" + (
                        navbarOpen
                            ? " flex"
                            : " hidden"
                    )}>

                    <ul className="flex flex-col lg:flex-row list-none mr-auto">
                        <li className="nav-item px-6 py-2">
                            <Item title="분양홍보 " href="/"/>
                        </li>
                        <li className="nav-item px-6 py-2">
                            <Item title="분양상담사 모집" href="/"/>
                        </li>
                        <li className="nav-item px-6 py-2">
                            <Item title="커뮤니티" href="/"/>
                        </li>
                        <li className="nav-item px-6 py-2">
                            <Item title="뉴스" href="/"/>
                        </li>
                        <li className="nav-item px-6 py-2">
                            <Item title="문의사항" href="/"/>
                        </li>
                    </ul>
                    <Item title="로그인" href="/" addClass="px-3 py-2"/>
                    <Item
                        title="회원가입"
                        href="/"
                        addClass={`border rounded-lg px-3 py-2 border-${Color}`}/>
                </div>
            </div>
        </nav>
    );
}

interface Props {
    title: string;
    href: string;
    addClass?: string;
}
function Item({
    title,
    href,
    addClass = ''
} : Props) {
    return (
        <a
            // className뒤에 꼭 공백하나 이상 남겨두기
            className={"flex items-center text-base font-semibold uppercase leading-snug hover:opacity-75 tracking-widest " +
                    addClass}
            href={href}>
            <span className="">{title}</span>
        </a>
    );
}
