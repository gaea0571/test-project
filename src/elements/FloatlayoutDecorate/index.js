import { Modal } from "antd";
import ReactDOM from "react-dom";
import React, { useState, useCallback } from "react";

export function ConfirmModal(props) {
  const { title, content, onConfirm, onCancel, onAfterClose, ...otherProps } = props;

  const [open_status, change_open_status] = useState(true);

  const handleConfirm = useCallback(() => {
    onConfirm();
    change_open_status(false);
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    onCancel();
    change_open_status(false);
  }, [onCancel]);

  return (
    <Modal
      centered
      closable
      title={title}
      footer={null}
      open={open_status}
      maskClosable={false}
      onOk={handleConfirm}
      onCancel={handleCancel}
      afterClose={onAfterClose}
      {...otherProps}
    >
      {content({ confirmModal: handleConfirm, cancelModal: handleCancel })}
    </Modal>
  )
};

export function FloatlayoutDecorate(SourceComponent) {

  return ({ modal, props }) => new Promise((resolve, reject) => {
    const target_element = document.createElement("div");
    document.body.appendChild(target_element);

    const handleConfirm = () => {
      resolve({ command: "confirm", data: null });
    };

    const handleCancel = () => {
      resolve({ command: "cancel", data: null });
    };

    const handleAfterClose = () => {
      ReactDOM.unmountComponentAtNode(target_element);
      target_element.parentNode.removeChild(target_element);
    };

    ReactDOM.render((
      <ConfirmModal
        width={900}
        content={({ confirmModal, cancelModal }) => (
          <SourceComponent {...props} onConfirm={() => { handleConfirm(); confirmModal() }} onCancel={() => { handleCancel(); cancelModal() }} />
        )}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onAfterClose={handleAfterClose}
        {...modal}
      />
    ), target_element);
  });
};