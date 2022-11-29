/* eslint-disable react/prop-types */
import { Spin, Result, Skeleton } from "antd";
import React, { useRef, useMemo, useState, useCallback } from "react";

// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

const on_alarm_message_enums = {
  PEDDING: "正在合闸",
  SUCCESS: "合闸成功",
  FAILD: "合闸失败"
};


const off_alarm_message_enums = {
  PEDDING: "正在分闸",
  SUCCESS: "分闸成功",
  FAILD: "分闸失败"
};

export function useAlarmStatus() {
  const namespace_ref = useRef();

  const [error_message, set_error_message] = useState("");

  const [action_status, set_action_status] = useState(false);

  const status_text = useMemo(() => {
    if (action_status) {
      if (namespace_ref.current === "on_alarm") {
        return on_alarm_message_enums[action_status]
      };
      if (namespace_ref.current === "off_alarm") {
        return off_alarm_message_enums[action_status]
      };
    };
    return "";
  }, [action_status]);

  const loading_handle = useCallback((namespace) => {
    namespace_ref.current = namespace;
    set_action_status("PEDDING");
  }, []);

  const success_handle = useCallback((namespace) => {
    namespace_ref.current = namespace;
    set_action_status("SUCCESS");
  }, []);

  const faild_handle = useCallback((namespace, message) => {
    namespace_ref.current = namespace;
    set_action_status("FAILD");
    set_error_message(message);
  }, []);

  return [
    { action_status, status_text, error_message },
    { loading: loading_handle, success: success_handle, faild: faild_handle }
  ];
};


export function StatusAlertBlock(props) {

  const { showtime, action_status, status_text, error_message } = props;

  if (action_status) {
    if (action_status === "PEDDING") {
      return (
        <Spin style={{ background: "white" }} tip={`${status_text} (${showtime})s`}>
          <Skeleton title="100%" active />
        </Spin>
      )
    };
    if (action_status === "SUCCESS") {
      return (
        <Result status="success" title={status_text} />
      )
    };
    if (action_status === "FAILD") {
      return (
        <Result status="error" title={status_text} subTitle={error_message} />
      )
    };
    return (
      <Skeleton title="100%" style={{ background: "white" }} />
    );
  };
  return null;
};


StatusAlertBlock.propTypes = {

};

StatusAlertBlock.defaultProps = {
  showtime: 0,
  action_status: "PEDDING",
  status_text: "",
  error_message: ""
};