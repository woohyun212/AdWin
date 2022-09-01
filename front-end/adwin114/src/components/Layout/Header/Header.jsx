import React from 'react';
import Navbar from './Navbar';
export default function Header() {
    return (
        <header className='top-0 absolute z-50 w-full flex flex-wrap items-center justify-between'>
            <Navbar/>
        </header>
    )
}