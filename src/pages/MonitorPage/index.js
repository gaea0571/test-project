/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Row, Button } from "antd";
import React, { useEffect, useCallback } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

import { withRemoteControlDialog } from "./RemoteControl";

const demo_params_data = {
  dcuId: "0x12345678",
  meterId: "0x6b3a00010001",
  pointId: "0x70000001",
  controlType: "single",
  command: "on"
};

const MonitorPage = withRemoteControlDialog((props) => {

  const { RemoteControlDialog } = props;

  useEffect(() => {
    RemoteControlDialog.listen((params) => {
      console.log(params);
    });
    return () => RemoteControlDialog.unlisten();
  }, [RemoteControlDialog]);

  const handleClick = useCallback(async () => {
    await RemoteControlDialog.open(demo_params_data);
  }, [RemoteControlDialog]);

  return (
    <Row style={{ height: "100%" }} justify="center" align="middle">
      <Button size="large" type="primary" onClick={handleClick}>
        设置遥控
      </Button>
    </Row>
  )
});


MonitorPage.propTypes = {

};

MonitorPage.defaultProps = {

};

export default MonitorPage;