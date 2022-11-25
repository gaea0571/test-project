/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import { Typography, Modal, Button } from "antd";
import React, { useState, useCallback } from "react";

import sound_file from "./214161-8bit-status-point-22.mp3";

function ShowPrompt(props) {

  const { onConfirm, onCancel, onAfterClose } = props;

  const [open_status, change_open_status] = useState(true);

  const handleConfirm = useCallback(() => {
    change_open_status(false);
    onConfirm();
  }, [onConfirm]);

  return (
    <Modal
      width="35%"
      closable={false}
      open={open_status}
      maskClosable={false}
      onCancel={onCancel}
      afterClose={onAfterClose}
      title="当前浏览器设置不支持自动播放声音"
      footer={(<Button type="primary" onClick={handleConfirm}>我知道了(本次允许播放)</Button>)}
    >
      <h2>
        Chrome浏览器于2018年四月更改了音视频策略，禁止音频和视频的自动播放。Chrome认为自动播放会打扰用户，是否播放应由用户决定。
        Chrome将通过学习用户的使用习惯来决定哪些网站禁止视频自动播放。在多次手动播放后，Chrome会记住该是可自动播放的网站。
        （经测试需要20多次点击播放并观看5s后，Chrome会记住您的操作行为）
        除Chrome外，其余使用Chrome内核浏览器也会遇到同样情况。
      </h2>
      <div style={{ paddingTop: 20 }}>
        <h2>具体政策请参考以下链接</h2>
        <a href="https://developer.chrome.com/blog/autoplay/">
          https://developer.chrome.com/blog/autoplay/
        </a>
      </div>
      <div style={{ paddingTop: 20 }}>
        <Typography.Title level={5}>
          或者在浏览器中打开链接
          <Typography.Text code copyable>
            chrome://settings/content/sound
          </Typography.Text>
          ,将
          <Typography.Text code copyable>
            {window.location.hostname}
          </Typography.Text>
          添加至播放白名单
        </Typography.Title>
      </div>
    </Modal>
  )
};

ShowPrompt.propTypes = {

};

ShowPrompt.defaultProps = {
  onCancel() { },
  onConfirm() { },
  onAfterClose() { }
};

export function showPrompt() {
  return new Promise((resolve) => {
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
      <ShowPrompt
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onAfterClose={handleAfterClose}
      />
    ), target_element);
  });
};

let is_tiping = false;

export async function autoPlayAudio() {
  if (is_tiping) {
    return false;
  };
  try {
    const audio = new Audio();
    audio.src = sound_file;
    await audio.play();
  } catch (error) {
    is_tiping = true;
    await showPrompt();
    is_tiping = false;
  }
};