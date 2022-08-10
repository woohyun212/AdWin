import React from 'react';
import 'images/pedro-lastra.jpg';
import Search from './Search';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBuilding} from '@fortawesome/free-regular-svg-icons';
import ApartmentLogo from 'images/apartment-building.svg'

export default function Cover() {
    return (
        <main>
            <div className="flex flex-col w-full place-items-center">
                <section
                    className="flex flex-col space-y-16 mt-[30vh] h-full place-items-center items-center">
                    <Search/>
                    <div className="grid grid-cols-2 gap-4 text-black text-xl">
                        <div
                            className='flex flex-col justify-center items-center border-solid w-[5vw] h-[5vw] bg-white 
                            leading-8 py-2 cursor-pointer hover:bg-[#FF8C32] hover:text-white'>
                            <FontAwesomeIcon icon={faBuilding} className="text-5xl"/>
                            <p className=''>분양홍보</p>
                        </div>
                        <span className='flex justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:text-white'>커뮤니티</span>
                        <span className='flex justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:text-white'>뉴스</span>
                        <span className='flex justify-center text-center items-center border-solid w-[5vw] h-[5vw] bg-white py-1
                        cursor-pointer hover:bg-[#FF8C32] hover:text-white'>분양<br/>상담사<br/>모집</span>
                    </div>
                </section>

                <section
                    className="grid h-screen card bg-base-300 rounded-box place-items-center text-white">section2</section>
            </div>
        </main>
    )
}