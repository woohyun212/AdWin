import React from 'react';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';

export default function Cover() {
    return (
        <main>
            <Section1/>
            {/* <Section2/> */}
            {/* <hr className='flex w-full border-[#BDBDBD] justify-center items-center mx-auto'/> */}
            <Section3/>
            {/* <hr className='flex w-full border-[#BDBDBD] justify-center items-center mx-auto'/> */}
            {/* <Section4/> */}
        </main>
    )
}