import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import ScreenSize from "./components/Debug/ScreenSize"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    // <React.StrictMode>
        <>
        < ScreenSize />
        <Router/>
        </>
    // </React.StrictMode>
    )
reportWebVitals();
