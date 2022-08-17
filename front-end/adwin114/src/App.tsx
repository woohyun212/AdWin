/* eslint-disable */
import React from 'react';
import './assets/css/App.css';
import ScreenSize from "./components/Debug/ScreenSize"
import Header from 'components/Layout/Header';
import Cover from 'components/Layout/Cover';
import Introduction from 'components/Layout/Introduction';
import Footer from 'components/Layout/Footer';

export default function App() {
    return (<> 
    < ScreenSize />
    <div className={"bg-fixed bg-blend-darken bg-no-repeat bg-cover bg-center bg-[url('images/pedro-lastra.jpg')] bg-black/50"}>
        <div className="m-auto h-screen w-screen snap-y snap-mandatory overflow-y-scroll">
            <Header/>
            <Cover/>
            <div className="m-auto flex flex-col h-1/5 w-screen snap-start items-center justify-center text-white">
                <Footer/>
            </div>
        </div>
    </div> </>
    );
}