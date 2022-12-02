import React from "react";
import { Routes, Route } from "react-router-dom";

import BasicLayout from "@/layouts/basic_layouts";

// import AmapPage from "@/pages/AmapPage";
// import AutoPlay from "@/pages/AutoPlay";
// import IndexPage from "@/pages/IndexPage";
// import SoundPage from "@/pages/SoundPage";

import AmapPage from "@/pages/AmapPage";
import SwiperPage from "@/pages/SwiperPage";
import MonitorPage from "@/pages/MonitorPage";

import "@/global.less";

export default () => (
  <Routes>
    <Route path="/" element={(<BasicLayout />)}>
      <Route path="/" element={(<MonitorPage />)} />
      <Route path="/map" element={(<AmapPage />)} />
      <Route path="/banner" element={(<SwiperPage />)} />
    </Route>
  </Routes>
);