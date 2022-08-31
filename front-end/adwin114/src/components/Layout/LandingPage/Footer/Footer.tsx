import React from 'react';
import {ReactComponent as AdWinLogo} from 'assets/WINAD.svg';

export default function Footer() {
    return (
        <> < hr className = 'w-full border-[#BDBDBD] justify-center items-center mx-auto' /> 
        <footer
            className=" mx-auto flex flex-row h-full w-screen snap-start items-center justify-center bg-[#D9D9D9] text-[#06113C]">
            <div className=' aspect-square text-lg tracking-widest font-sans leading-relaxed whitespace-nowrap uppercase justify-center text-center ml-auto mr-7'>
                <AdWinLogo className=''/> 
                ADWIN114
            </div>
            <span className=' flex flex-col h-2/3 w-2/3 mr-auto'>
                <p>회사소개 / 약관 / 개인정보취급방식 / 개인정보취급방식 / 파트너 / 뉴스레터 / 리포트</p>
                <p>회사이름 / 대표이사: 홍길동 번호: 000-0000-0000, 000-000-0000 / 메일: 00000@0000.000 / 소재지: 주소<br/>
                사업자등록번호: 000-00-00000 </p>
                    
                <p>문의: 00-000-0000, 000-0000-0000 팩스: 00-000-0000</p>
                <p>카피라이트 ~~~~~~~~~~~~~</p>
            </span>
        </footer>
    </>
    )
}