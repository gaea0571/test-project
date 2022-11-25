/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import moment from "moment";
import downloadjs from "downloadjs";
import { Space, Button } from "antd";
import React, { useState, useEffect, useCallback } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

export default function XMLViewerContainer({ eventbus, onMountComplate }) {

  const [watch_value, set_watch_value] = useState("");

  useEffect(() => {
    eventbus.on("watch_value", set_watch_value);
    onMountComplate();
    return () => {
      eventbus.removeAllListeners("watch_value");
    };
  }, [eventbus, onMountComplate]);

  const handleDownload = useCallback(() => {
    const filename = moment().format("YYYY-MM-DD-HH-mm-ss").concat(".template.xml");
    downloadjs(watch_value, filename, "text/xml");
  }, [watch_value]);

  return (
    <Space direction="vertical" style={{ position: "absolute", top: 20, right: 20 }}>
      <pre>{watch_value}</pre>
      <Button onClick={handleDownload}>下载为文件</Button>
    </Space>
  )
};


XMLViewerContainer.propTypes = {

};

XMLViewerContainer.defaultProps = {
  onMountComplate() { }
};
