/* eslint-disable react/prop-types */
import React from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";
import CardBlock from "./components/CardBlock";
import BannerBlock from "./components/BannerBlock";


export default function SwiperPage(props) {
  return (
    <div>
      <BannerBlock />
      <CardBlock />
    </div>
  )
};


SwiperPage.propTypes = {


};
SwiperPage.defaultProps = {


};