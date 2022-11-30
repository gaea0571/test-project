import React from "react";
import { Routes, Route } from "react-router-dom";

import BasicLayout from "@/layouts/basic_layouts";

// import AmapPage from "@/pages/AmapPage";
// import AutoPlay from "@/pages/AutoPlay";
// import IndexPage from "@/pages/IndexPage";
// import SoundPage from "@/pages/SoundPage";

import AmapPage from "@/pages/AmapPage";
import SwiperPage from "@/pages/SwiperPage";
// import MonitorPage from "@/pages/MonitorPage";

import LoginPage from "@/pages/LoginPage";
import RsaCryptoPage from "@/pages/RsaCryptoPage";

import "@/global.less";


export default () => (
  <Routes>
    <Route path="/" element={(<BasicLayout />)}>
      <Route path="/" element={(<LoginPage />)} />
      <Route path="/map" element={(<AmapPage />)} />
      <Route path="/chat" element={(<RsaCryptoPage />)} />
      <Route path="/banner" element={(<SwiperPage />)} />
    </Route>
  </Routes>
);