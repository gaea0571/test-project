/* eslint-disable react/prop-types */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Navigation } from "swiper";
// import propTypes from "prop-types";
// import classnames from "classnames";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import css from "./style.scss";
// import css from "./style.less";

export default function BannerBlock(props) {
  return (
    <div style={{ padding: 50 }}>
      <Swiper
        loop
        mousewheel
        navigation
        spaceBetween={30}
        pagination={{
          clickable: true,
          dynamicBullets: true
        }}
        direction="horizontal"
        modules={[Mousewheel, Pagination, Navigation]}
        style={{
          boxSizing: "content-box",
          width: 1200, height: 500
        }}
        onSlideChange={(current) => console.log(current)}
      >
        <SwiperSlide style={{ background: "red", color: "#FFF" }}>Slide 1</SwiperSlide>
        <SwiperSlide style={{ background: "green", color: "#FFF" }}>Slide 2</SwiperSlide>
        <SwiperSlide style={{ background: "yellow", color: "#FFF" }}>Slide 3</SwiperSlide>
        <SwiperSlide style={{ background: "black", color: "#FFF" }}>Slide 4</SwiperSlide>
        <SwiperSlide style={{ background: "blue", color: "#FFF" }}>Slide 5</SwiperSlide>
        <SwiperSlide style={{ background: "grey", color: "#FFF" }}>Slide 6</SwiperSlide>
        <SwiperSlide style={{ background: "black", color: "#FFF" }}>Slide 7</SwiperSlide>
        <SwiperSlide style={{ background: "black", color: "#FFF" }}>Slide 8</SwiperSlide>
        <SwiperSlide style={{ background: "black", color: "#FFF" }}>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  )
};


BannerBlock.propTypes = {


};
BannerBlock.defaultProps = {


};