/* eslint-disable react/prop-types */
import ReactDOM from "react-dom";
import format from "xml-formatter";
import { EventEmitter } from "events";
import React, { useRef, useState, useEffect } from "react";
// import {Outlet,Navigate,useLocation} from "react-router-dom";

// import useInitalValue from "@/hooks/useInitalValue";
import XMLViewerContainer from "../../components/XMLViewerContainer";

// import classnames from "classnames";
// import propTypes from "prop-types";

export default function useXMLViewer(watch_value) {

  const eventbus = useRef();

  const [ready_status, change_ready_status] = useState(false);

  useEffect(() => {
    const target_container = document.createElement("div");
    document.body.appendChild(target_container);
    eventbus.current = new EventEmitter();
    ReactDOM.render((
      <XMLViewerContainer eventbus={eventbus.current} />
    ), target_container, () => {
      change_ready_status(true);
    });
  }, []);

  useEffect(() => {
    if (ready_status) {
      eventbus.current.emit("watch_value", watch_value ? format(watch_value) : null);
    };
  }, [watch_value, ready_status]);

};
