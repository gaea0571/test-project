/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Row, Button } from "antd";
import React, { useEffect } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

import { remote_control } from "./RemoteControl";

export default function MonitorPage(props) {

  return (
    <Row style={{ height: "100%" }} justify="center" align="middle">
      <Button size="large" type="primary" onClick={remote_control}>
        设置遥控
      </Button>
    </Row>
  )
};


MonitorPage.propTypes = {


};
MonitorPage.defaultProps = {


};