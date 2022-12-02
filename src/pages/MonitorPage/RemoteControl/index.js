/* eslint-disable react/jsx-props-no-spreading */
import { Modal } from "antd";
import ReactDOM from "react-dom";
import { EventEmitter } from "events";
import React, { useState, useEffect } from "react";
import hoistNonReactStatics from "hoist-non-react-statics";

import ControlForm from "./forms/ControlForm";

export function RemoteControl(props) {
  const { dcuId, meterId, pointId, controlType, command, eventbus, onAction, afterClose } = props;

  const [status, set_status] = useState(true);

  useEffect(() => {
    eventbus.on("cancel", () => {
      set_status(false);
    });
    return () => {
      eventbus.removeAllListeners(["cancel"]);
    };
  }, [eventbus]);

  return (
    <Modal
      title="遥控"
      width="600px"
      open={status}
      footer={null}
      maskClosable={false}
      afterClose={afterClose}
      onCancel={() => set_status(false)}
    >
      <ControlForm
        timeout={10}
        dcuId={dcuId}
        command={command}
        meterId={meterId}
        pointId={pointId}
        controlType={controlType}
        onAction={onAction}
        onCancel={() => set_status(false)}
      />
    </Modal>
  )
};

RemoteControl.defaultProps = {
  onAction() { },
  afterClose() { }
};


export function withRemoteControlDialog(SourceComponent) {

  let mount_container;

  const eventbus = new EventEmitter();

  const handleAfterClose = () => {
    ReactDOM.unmountComponentAtNode(mount_container);
    mount_container.parentNode.removeChild(mount_container);
  };

  function handleOpenDialog(params) {
    const { dcuId, meterId, pointId, controlType, command } = params || {};
    mount_container = document.createElement("div");
    document.body.appendChild(mount_container);
    ReactDOM.render((
      <RemoteControl
        dcuId={dcuId}
        command={command}
        meterId={meterId}
        pointId={pointId}
        eventbus={eventbus}
        controlType={controlType}
        afterClose={handleAfterClose}
        onAction={({ type, result }) => eventbus.emit(type, { type, result })}
      />
    ), mount_container);
  };

  function listen(callback) {
    eventbus.on("on_alarm", callback);
    eventbus.on("off_alarm", callback);
    return () => {
      eventbus.removeAllListeners(["on_alarm"]);
      eventbus.removeAllListeners(["off_alarm"]);
    };
  };

  function TargetComponent(props, ref) {
    return (
      <SourceComponent ref={ref} {...props} RemoteControlDialog={{ open: handleOpenDialog, listen }} />
    )
  };

  hoistNonReactStatics(SourceComponent, TargetComponent);
  return React.forwardRef(TargetComponent);
};