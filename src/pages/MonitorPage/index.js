/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

import { remote_control } from "./RemoteControl";

export default function MonitorPage(props) {

  useEffect(() => {
    remote_control();
  }, []);

  return (
    <div>
      {null}
    </div>
  )
};


MonitorPage.propTypes = {


};
MonitorPage.defaultProps = {


};