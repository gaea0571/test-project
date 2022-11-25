/* eslint-disable react/prop-types */
import React from "react";
import { EffectCards } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

import "swiper/css";
import "swiper/css/effect-cards";

export default function CardBlock(props) {
  return (
    <Swiper
      grabCursor
      effect="cards"
      modules={[EffectCards]}
      style={{
        width: 240, height: 360
      }}
      onSlideChange={(current) => console.log("card", current)}
    >
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 1</SwiperSlide>
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 2</SwiperSlide>
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 3</SwiperSlide>
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 4</SwiperSlide>
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 5</SwiperSlide>
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 6</SwiperSlide>
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 7</SwiperSlide>
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 8</SwiperSlide>
      <SwiperSlide style={{ background: "red", color: "#fff" }}>Slide 9</SwiperSlide>
    </Swiper>
  )
};


CardBlock.propTypes = {


};
CardBlock.defaultProps = {


};