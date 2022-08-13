import React, {useState, useEffect} from "react";
import Logo from './Logo';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from "@fortawesome/free-solid-svg-icons";

export default function Navbar({fixed} : any) {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [Color, setColor] = useState("white");

    const changeFontColor = () => {
        if (window.scrollY >= 200) {
            setColor('white');
        } else {
            setColor('black');
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', changeFontColor, true);
        return() => window.removeEventListener('scroll', changeFontColor);
    }, []);

    return (
        <nav
            className={"w-full flex flex-wrap items-center justify-between border-b border-" +
                    Color + "bg-transparent text-" + Color + " transition-color ease-in-out duration-500"}>
            <div
                className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div
                    className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <a
                        className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                        href="#pablo">
                        <Logo/>AdWin114
                    </a>
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
                        <li className="nav-item">
                            <Item title="분양홍보" href="/" addClass="px-6 py-2"/>
                        </li>
                        <li className="nav-item">
                            <Item title="분양상담사 모집" href="/" addClass="px-6 py-2"/>
                        </li>
                        <li className="nav-item">
                            <Item title="커뮤니티" href="/" addClass="px-6 py-2"/>
                        </li>
                        <li className="nav-item">
                            <Item title="뉴스" href="/" addClass="px-6 py-2"/>
                        </li>
                    </ul>
                    <Item title="로그인" href="/" addClass="px-3 py-2"/>
                    <Item
                        title="회원가입"
                        href="/"
                        addClass={"border rounded-lg px-3 py-2 border-" + Color}/>
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
            className={"flex items-center text-base uppercase font-bold leading-snug hover:opacity-75 " +
                    addClass}
            href={href}>
            <span className="">{title}</span>
        </a>
    );
}
