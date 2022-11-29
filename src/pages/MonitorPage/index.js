/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Row, Button } from "antd";
import React, { useEffect } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

import { RemoteControlDialog } from "./RemoteControl";

const demo_params_data = {
  dcuId: "0x12345678",
  meterId: "0x6b3a00010001",
  pointId: "0x70000001",
  controlType: "single",
  command: "on"
};

export default function MonitorPage(props) {

  return (
    <Row style={{ height: "100%" }} justify="center" align="middle">
      <Button size="large" type="primary" onClick={() => RemoteControlDialog(demo_params_data)}>
        设置遥控
      </Button>
    </Row>
  )
};


MonitorPage.propTypes = {

};

MonitorPage.defaultProps = {

};