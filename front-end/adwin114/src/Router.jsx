import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Community from "components/Layout/Community";
import News from "components/Layout/News";
import Promotion from "components/Layout/Promotion";
import RecruitAnnounce from "components/Layout/RecruitAnnounce";
import RecruitAnnounceWrite from "components/Layout/RecruitAnnounce/RecruitAnnounceWrite";
import RecruitAnnounceDetail from "components/Layout/RecruitAnnounce/RecruitAnnounceDetail";
import RecruitAnnounceUpdate from "components/Layout/RecruitAnnounce/RecruitAnnounceUpdate";
import LandingPage from "./LandingPage";
import Header from "components/Layout/Header";
import Login from "components/Layout/Login/Login";
import Profile from "components/Layout/Profile";
import {RequireToken} from "./Auth";
import Register from "components/Layout/Register";
import Logout from "components/Layout/Logout";


export default function Router() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/recruit-announce" element={<RecruitAnnounce />}/>
                <Route path="/recruit-announce/write" element={<RecruitAnnounceWrite />}/>
                <Route path="/promotion" element={<Promotion />}/>
                <Route path="/news" element={<News />}/>
                <Route path="/community" element={<Community />}/>
                <Route path="/recruit-announce/:post_id" element={<RecruitAnnounceDetail/>}/>
                <Route path="/recruit-announce/:post_id/update" element={<RecruitAnnounceUpdate/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/profile" element={<RequireToken ><Profile/></RequireToken>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>
        </BrowserRouter>
    );
}