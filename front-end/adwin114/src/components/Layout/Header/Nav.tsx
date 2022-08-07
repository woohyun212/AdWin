import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitterSquare, faFacebookSquare} from '@fortawesome/free-brands-svg-icons';
import Logo from './Logo';
import Search from './Search';

export default function Nav() {
    return (
        <nav
            className="relative flex flex-wrap items-center justify-between px-2 py-1 bg-indigo-500 mb-3">
            <div
                className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                    <a
                        className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                        href="#pablo">
                        <Logo/>AdWin114
                    </a>
                    <button
                        className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button">
                        <span className="block relative w-6 h-px rounded-sm bg-white"></span>
                        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
                    </button>
                </div>
                <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
                    <ul className="flex flex-col lg:flex-row list-none mr-auto">
                        <li className="nav-item">
                            <a
                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo">
                                <FontAwesomeIcon
                                    icon={faFacebookSquare}
                                    className="text-lg leading-lg text-white opacity-75"></FontAwesomeIcon>
                                <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"/>
                                <span className="ml-2">Facebook</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo">
                                <FontAwesomeIcon
                                    icon={faTwitterSquare}
                                    className="text-lg leading-lg text-white opacity-75"></FontAwesomeIcon>
                                <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"/>
                                <span className="ml-2">Tweet</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                                href="#pablo">
                                <span className="ml-2">Settings</span>
                            </a>
                        </li>
                    </ul>
                    <Search/>
                </div>
            </div>
        </nav>
    );
}