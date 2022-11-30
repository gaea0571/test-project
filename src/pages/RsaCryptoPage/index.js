/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Input } from "antd";
import React, { useState, useEffect, useCallback } from "react";


// import propTypes from "prop-types";
// import classnames from "classnames";

import StickyBlock from "./elements/StickyBlock";
import MessageBlock from "./elements/MessageBlock";
import ScrollContainer from "./elements/ScrollContainer";


// import css from "./style.scss";
// import css from "./style.less";

const mock_message = [{
  content: "test-message345345345345354353453543风格的风格和打开对话框的风格的风格的和jahjshjdhjsahdjhajdhjksahdahjksdhasjkd", userid: 1
}, {
  content: "test-message345345345345354353453543风格的风格和打开对话框的风格的风格的和", userid: 2
}, {
  content: "test-message345345345345354353453543风格的风格和打开对话框的风格的风格的和jahjshjdhjsahdjhajdhjksahdahjksdhasjkd", userid: 1
}, {
  content: "test-message345345345345354353453543风格的风格和打开对话框的风格的风格的和jahjshjdhjsahdjhajdhjksahdahjksdhasjkd", userid: 1
}, {
  content: "test-message345345345345354353453543风格的风格和打开对话框的风格的风格的和jahjshjdhjsahdjhajdhjksahdahjksdhasjkd", userid: 1
}, {
  content: "test-message", userid: 1
}, {
  content: "test-message", userid: 2
}, {
  content: "test-message", userid: 2
}, {
  content: "test-message", userid: 2
}, {
  content: "test-message", userid: 2
}, {
  content: "test-message", userid: 2
}, {
  content: "test-message", userid: 2
}, {
  content: "test-message", userid: 2
}, {
  content: "test-message", userid: 2
}];

export default function RsaCryptoPage(props) {

  const [message, set_message] = useState("");

  const [message_list, set_message_list] = useState([]);

  useEffect(() => {

  }, []);

  const handlePublish = useCallback(async () => {
    const clone_message_list = [...message_list];
    clone_message_list.push({ content: message, user_id: 1 });
    set_message_list(clone_message_list);
  }, [message, message_list]);

  return (
    <ScrollContainer message_list={message_list}>
      {message_list.map(({ content, userid }, index) => (
        <MessageBlock key={index} content={content} user_id={userid} />
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