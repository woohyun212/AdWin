import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import News from "components/Layout/News";
import Promotion from "components/Layout/Promotion";
import RecruitAnnounce from "components/Layout/RecruitAnnounce";
import RecruitAnnounceWrite from "components/Layout/RecruitAnnounce/RecruitAnnounceWrite";
import RecruitAnnounceDetail from "components/Layout/RecruitAnnounce/RecruitAnnounceDetail";
import RecruitAnnounceUpdate from "components/Layout/RecruitAnnounce/RecruitAnnounceUpdate";
import FreeBoard from "components/Layout/FreeBoard";
import FreeBoardWrite from "components/Layout/FreeBoard/FreeBoardWrite";
import FreeBoardDetail from "components/Layout/FreeBoard/FreeBoardDetail";
import FreeBoardUpdate from "components/Layout/FreeBoard/FreeBoardUpdate";
import LandingPage from "./components/Layout/LandingPage";
import Header from "components/Layout/Header";
import Footer from "components/Layout/LandingPage/Footer";
import Login from "components/Layout/Login/Login";
import Profile from "components/Layout/Profile";
import {RequireToken, CheckToken, isTokenExpired} from "./Auth";
import Register from "components/Layout/Register";
import Logout from "components/Layout/Logout";
import axios from "axios";

export default function Router() { 
    CheckToken();
    return (
        <BrowserRouter>
            <div className="w-screen h-screen overflow-x-hidden">
            <Header/>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/recruit-announce" element={<RecruitAnnounce />}/>
                <Route path="/recruit-announce/write" element={<RecruitAnnounceWrite />}/>
                <Route path="/recruit-announce/:post_id" element={<RecruitAnnounceDetail/>}/>
                <Route path="/recruit-announce/:post_id/update" element={<RecruitAnnounceUpdate/>}/>
                <Route path="/freeboard" element={<FreeBoard />}/>
                <Route path="/freeboard/write" element={<FreeBoardWrite />}/>
                <Route path="/freeboard/:post_id" element={<FreeBoardDetail/>}/>
                <Route path="/freeboard/:post_id/update" element={<FreeBoardUpdate/>}/>
                <Route path="/promotion" element={<Promotion />}/>
                <Route path="/news" element={<News />}/>
                <Route path="register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<RequireToken ><Profile/></RequireToken>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>
            <Footer/>
            </div>
        </BrowserRouter>
    );
}