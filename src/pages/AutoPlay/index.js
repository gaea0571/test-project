/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";
import { autoPlayAudio } from "./methods/auto_play";

export default function AutoPlay(props) {

  useEffect(() => {
    setInterval(autoPlayAudio, 1000);
  }, []);

  return (
    <div>
      {null}
    </div>
  )
};


AutoPlay.propTypes = {


};
AutoPlay.defaultProps = {


};