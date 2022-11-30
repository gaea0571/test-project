/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import io from "socket.io-client";
import { Button, Input } from "antd";
import { useSearchParams } from "react-router-dom";
import React, { useRef, useState, useEffect, useCallback } from "react";


// import propTypes from "prop-types";
// import classnames from "classnames";

import StickyBlock from "./elements/StickyBlock";
import MessageBlock from "./elements/MessageBlock";
import ScrollContainer from "./elements/ScrollContainer";


// import css from "./style.scss";
// import css from "./style.less";

export default function RsaCryptoPage(props) {

  const socket = useRef();

  const [search_params] = useSearchParams();

  const [message, set_message] = useState("");

  const [message_list, set_message_list] = useState([]);

  useEffect(() => {
    const room_id = search_params.get("room_id");
    const user_id = search_params.get("user_id");
    socket.current = io(`ws://localhost:13500?room_id=${room_id}&user_id=${user_id}`);
  }, [search_params]);

  useEffect(() => {
    socket.current.on("connect", () => {
      console.log("已连接");
    });
    socket.current.on("load_record", (records) => {
      set_message_list(records);
    });
    socket.current.on("message", (content) => {
      const json_content = JSON.parse(content);
      set_message_list((message_list) => {
        const clone_message_list = [...message_list];
        return [...clone_message_list, json_content];
      });
    });
  }, [search_params]);

  const handlePublish = useCallback(async () => {
    const user_id = search_params.get("user_id");
    socket.current.emit("emit_message", JSON.stringify({ content: message, user_id }));
  }, [message, search_params]);

  return (
    <ScrollContainer message_list={message_list}>
      {message_list.map(({ content, user_id }, index) => (
        <MessageBlock key={index} content={content} user_id={user_id} />
      ))}
      <StickyBlock>
        <Input.Group compact>
          <Input.TextArea value={message} onChange={(event) => set_message(event.target.value)} style={{ width: "80%" }} autoSize={{ minRows: 1, maxRows: 4 }} placeholder="请输入聊天信息" />
          <Button block type="primary" style={{ width: "20%", height: "100%" }} onClick={handlePublish}>
            发送
          </Button>
        </Input.Group>
      </StickyBlock>
    </ScrollContainer>
  )
};


RsaCryptoPage.propTypes = {

};

RsaCryptoPage.defaultProps = {

};