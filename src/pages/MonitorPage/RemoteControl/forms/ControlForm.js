/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useCallback } from "react";
import { Row, Col, Form, Input, Space, Divider, Button, Select } from "antd";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

import SwitchButton from "../elements/SwitchButton";
import { useExecuteRemoteControl } from "../hooks/useExecuteRemoteControl";
import { StatusAlertBlock, useAlarmStatus } from "../elements/StatusAlertBlock";


const form_config = {
  labelCol: { flex: "100px" },
  wrapperCol: { flex: "auto" }
};

const control_type_enums = [{
  value: "single",
  label: "single"
}, {
  value: "dual",
  label: "dual"
}];

export default function ControlForm(props) {

  const [form] = Form.useForm();

  const [showtime, handleRemoteControl] = useExecuteRemoteControl();

  const { dcuId, meterId, pointId, controlType, command, timeout, onAction, onCancel } = props;

  const [{ action_status, status_text, error_message }, { loading, success, faild }] = useAlarmStatus();

  /** 合闸句柄 * */
  const handleOnAlarm = useCallback(async () => {
    try {
      await form.setFieldValue("command", true);
      await loading("on_alarm");
      const result = await form.validateFields();
      await handleRemoteControl({ timeout, params: result });
      await success("on_alarm");
      await onAction({ type: "on_alarm", result });
    } catch (error) {
      faild("on_alarm", JSON.stringify(error));
      await form.setFieldValue("command", false);
    };
  }, [form, timeout, loading, success, faild, handleRemoteControl, onAction]);

  /** 分闸句柄 * */
  const handleOffAlarm = useCallback(async () => {
    try {
      await form.setFieldValue("command", false);
      await loading("off_alarm");
      const result = await form.validateFields();
      await handleRemoteControl({ timeout, params: result });
      await success("off_alarm");
      await onAction({ type: "off_alarm", result });
    } catch (error) {
      faild("off_alarm", JSON.stringify(error.message));
      await form.setFieldValue("command", true);
    };
  }, [form, timeout, loading, success, faild, handleRemoteControl, onAction]);

  const handleCancel = useCallback(async () => {
    await onAction({ type: "cancel" });
  }, [onAction]);

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%" }} split={(<Divider plain>信息行</Divider>)}>
        <Form {...form_config} form={form} initialValues={{ dcuId, meterId, pointId, controlType, command }}>
          <Row gutter={20} justify="space-between">
            <Col flex="auto">
              <Form.Item label="终端" name="dcuId">
                <Input style={{ width: "100%" }} placeholder="请输入DCU编号-名称" />
              </Form.Item>
              <Form.Item label="表计" name="meterId">
                <Input style={{ width: "100%" }} placeholder="请输入表地址-表名称" />
              </Form.Item>
              <Form.Item label="遥控点" name="pointId">
                <Input style={{ width: "100%" }} placeholder="请输入遥控点" />
              </Form.Item>
              <Form.Item label="遥控类型" name="controlType">
                <Select style={{ width: "100%" }} placeholder="请选择遥控类型" options={control_type_enums} />
              </Form.Item>
            </Col>
            <Col flex="200px">
              <Form.Item name="command">
                <SwitchButton />
              </Form.Item>
            </Col>
          </Row>
        </Form>
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
          showtime={showtime}
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
  timeout: 10,
  onAction() { },
  onCancel() { }
};