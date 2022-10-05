/* eslint-disable */
import React from 'react';
import Cover from './Cover';
import { CheckToken } from 'Auth';

export default function App() {
    CheckToken();
    return (<>  
    <div className={" bg-fixed bg-no-repeat bg-cover bg-center bg-[url('images/메인배경화면.jpg')] bg-[#eeeeee]"}>
        <div className="m-auto h-[200vh] w-screen">
            <Cover/>
            {/* <Footer/> */}
        </div>
    </div> </>
    );
}