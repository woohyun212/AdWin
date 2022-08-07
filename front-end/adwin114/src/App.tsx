/* eslint-disable */
import React from 'react';
import './App.css';
import ModalSmall from './basement/ModalSmall';
import ModalRegular from './basement/ModalRegular';
import ScreenSize from "./components/Debug/ScreenSize"
import Header from 'components/Layout/Header';
import Cover from 'components/Layout/Cover';
import Introduction from 'components/Layout/Introduction';
import Footer from 'components/Layout/Footer';

export default function App() {
    return (
        <div className="App">
            <ScreenSize/>
            <Header/>
            <Cover/>
            <Introduction/>
            <Footer/>
                <div className="">
                    <div className="">랜딩div</div>
                    <div className="">광고div</div>
                </div> 
        </div>
    );
}