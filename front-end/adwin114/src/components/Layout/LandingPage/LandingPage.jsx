/* eslint-disable */
import React from 'react';
import 'assets/css/App.css';
import Cover from './Cover';
import Footer from './Footer';
import { CheckToken } from 'Auth';

export default function App() {
    CheckToken();
    return (<> 
    <div className={"bg-fixed bg-blend-darken bg-no-repeat bg-cover bg-center bg-[url('images/pedro-lastra.jpg')] bg-black/50"}>
        <div className="m-auto h-[200vh] w-screen">
            <Cover/>
            {/* <Footer/> */}
        </div>
    </div> </>
    );
}