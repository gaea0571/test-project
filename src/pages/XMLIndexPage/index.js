/* eslint-disable react/prop-types */
import { DOMParser } from "xmldom";
import { v4 as uuidv4 } from "uuid";
import { Space, Button } from "antd";
import React, { useRef, useEffect, useCallback } from "react";
// import propTypes from "prop-types";
// import classnames from "classnames";

// import css from "./style.scss";
// import css from "./style.less";

// import useXMLViewer from "./hooks/useXMLViewer";
import withXMLViewer from "./methods/withXMLViewer";

function XMLIndexPage({ start_watch, cancel_watch }) {

  const xml_document = useRef();

  // const [xml_string, set_xml_string] = useState("");

  // useXMLViewer(xml_string);

  const handleAppendNode = useCallback(() => {
    const box_element = xml_document.current.createElement("box1");
    box_element.setAttribute("type", uuidv4());
    xml_document.current.documentElement.appendChild(box_element);
    start_watch(xml_document.current.toString());
  }, [start_watch]);

  useEffect(() => {
    xml_document.current = new DOMParser().parseFromString(
      `<xml xmlns="a" xmlns:c="./lite"></xml>`, "text/xml"
    );
    start_watch(xml_document.current.toString());
  }, [start_watch]);

  const handleChangeAttribute = useCallback(() => {
    const box_element = xml_document.current.getElementsByTagName("box1");
    const box_list = Array.from(box_element);
    box_list.forEach((current_element) => {
      current_element.setAttribute("type", uuidv4());
    });
    start_watch(xml_document.current.toString());
  }, [start_watch]);

  return (
    <Space>
      <Button type="primary" onClick={handleAppendNode}>新增节点</Button>
      <Button type="primary" onClick={handleChangeAttribute}>改变属性值</Button>
      <Button type="primary" onClick={cancel_watch}>取消预览</Button>
    </Space>
  )
};


XMLIndexPage.propTypes = {


};
XMLIndexPage.defaultProps = {


};

export default withXMLViewer(XMLIndexPage);