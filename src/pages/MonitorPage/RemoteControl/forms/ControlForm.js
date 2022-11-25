/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import { Row, Col, Form, Spin, Input, Space, Divider, Button, Skeleton } from "antd";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

import SwitchButton from "../elements/SwitchButton";
import { StatusAlertBlock, useAlarmStatus } from "../elements/StatusAlertBlock";

const form_config = {
  labelCol: { flex: "100px" },
  wrapperCol: { flex: "auto" }
};

export default function ControlForm(props) {

  const { onAction } = props;

  const [form] = Form.useForm();

  const [button_status, set_button_status] = useState(false);
  const [{ action_status, status_text, error_message }, { loading, success, faild }] = useAlarmStatus();

  /** 合闸句柄 * */
  const handleOnAlarm = useCallback(async () => {
    try {
      set_button_status(false);
      loading("on_alarm");
      await form.validateFields();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      success("on_alarm");
      set_button_status(true);
    } catch (error) {
      faild("on_alarm", JSON.stringify(error));
    };
  }, [form, loading, success, faild]);

  /** 分闸句柄 * */
  const handleOffAlarm = useCallback(async () => {
    try {
      set_button_status(false);
      loading("off_alarm");
      await form.validateFields();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      throw new Error("这里输出失败原因");
      // success("off_alarm");
      // set_button_status(true);
    } catch (error) {
      faild("off_alarm", JSON.stringify(error.message));
    }
  }, [form, loading, faild]);

  const handleCancel = useCallback(async () => {
    onAction(false);
  }, [onAction]);

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }} split={(<Divider plain>信息行</Divider>)}>
        <Row gutter={20} justify="space-between">
          <Col flex="500px">
            <Form {...form_config} form={form}>
              <Form.Item label="终端">
                <Input style={{ width: "100%" }} placeholder="请输入DCU编号-名称" />
              </Form.Item>
              <Form.Item label="表计">
                <Input style={{ width: "100%" }} placeholder="请输入表地址-表名称" />
              </Form.Item>
              <Form.Item label="遥控点">
                <Input style={{ width: "100%" }} placeholder="请输入遥控点" />
              </Form.Item>
              <Form.Item label="遥控类型">
                <Input style={{ width: "100%" }} placeholder="请输入遥控类型" />
              </Form.Item>
            </Form>
          </Col>
          <Col flex="auto">
            <SwitchButton status={button_status} />
          </Col>
        </Row>
        <Row justify="center">
          <Space split={(<Divider type="vertical" />)}>
            <Button type="primary" onClick={handleOnAlarm}>合闸</Button>
            <Button type="primary" onClick={handleOffAlarm}>分闸</Button>
            <Button type="default" onClick={handleCancel}>返回</Button>
          </Space>
        </Row>
      </Space>
      <div style={{ marginTop: 20 }}>
        <StatusAlertBlock
          action_status={action_status}
          status_text={status_text}
          error_message={error_message}
        />
      </div>
    </div>
  )
};


ControlForm.propTypes = {

};

ControlForm.defaultProps = {
  onAction() { }
};