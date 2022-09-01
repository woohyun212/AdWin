import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Community from "components/Layout/Community";
import News from "components/Layout/News";
import Promotion from "components/Layout/Promotion";
import RecruitAnnounce from "components/Layout/RecruitAnnounce";
import RecruitAnnounceWrite from "components/Layout/RecruitAnnounce/RecruitAnnounceWrite";
import LandingPage from "./LandingPage";
import Header from "components/Layout/Header";

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
            </Routes>
        </BrowserRouter>
    );
}