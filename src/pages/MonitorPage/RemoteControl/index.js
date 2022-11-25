import { Modal } from "antd";
import ReactDOM from "react-dom";
import React, { useState, useCallback } from "react";

import ControlForm from "./forms/ControlForm";

export function RemoteControl(props) {
  const { onAction, afterClose } = props;

  const [status, set_status] = useState(true);

  const handleAction = useCallback((action_values) => {
    onAction(action_values);
    set_status(false);
  }, [onAction]);

  return (
    <Modal
      title="遥控"
      width="900px"
      open={status}
      footer={null}
      maskClosable={false}
      onCancel={() => handleAction(false)}
      afterClose={afterClose}
    >
      <ControlForm onAction={handleAction} />
    </Modal>
  )
};

RemoteControl.defaultProps = {
  onAction() { },
  afterClose() { }
};


export function remote_control() {
  const mount_container = document.createElement("div");
  document.body.appendChild(mount_container);

  return new Promise((resolve, reject) => {

    try {

      const afterClose = () => {
        ReactDOM.unmountComponentAtNode(mount_container);
        mount_container.parentNode.removeChild(mount_container);
        resolve(false);
      };

      ReactDOM.render((
        <RemoteControl
          onAction={resolve}
          afterClose={afterClose}
        />
      ), mount_container);
    } catch (error) {
      reject(error);
    };

  });

};