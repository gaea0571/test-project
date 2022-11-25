/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { Row, Col, Form, Input, Space, Divider, Button } from "antd";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

import SwitchButton from "../elements/SwitchButton";

const form_config = {
  labelCol: { flex: "100px" },
  wrapperCol: { flex: "auto" }
};

export default function ControlForm(props) {

  const { onAction } = props;

  const [form] = Form.useForm();

  /** 合闸句柄 * */
  const handleOnAlarm = useCallback(async () => {
    const result = await form.validateFields();
    onAction(result);
  }, [form, onAction]);

  /** 分闸句柄 * */
  const handleOffAlarm = useCallback(async () => {
    const result = await form.validateFields();
    onAction(result);
  }, [form, onAction]);


  return (
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
          <SwitchButton />
        </Col>
      </Row>
      <Row justify="center">
        <Space split={(<Divider type="vertical" />)}>
          <Button type="primary" onClick={handleOnAlarm}>合闸</Button>
          <Button type="primary" onClick={handleOffAlarm}>分闸</Button>
          <Button type="default">返回</Button>
        </Space>
      </Row>
    </Space>
  )
};


ControlForm.propTypes = {

};

ControlForm.defaultProps = {
  onAction() { }
};