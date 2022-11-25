/* eslint-disable react/jsx-props-no-spreading */
import ReactDOM from "react-dom";
import format from "xml-formatter";
import { EventEmitter } from "events";
import hoistNonReactStatics from "hoist-non-react-statics";
import React, { useRef, useState, useEffect, useCallback } from "react";

import XMLViewerContainer from "../components/XMLViewerContainer";

export default function withXMLViewer(SourceComponent) {
  function TargetComponent(props, ref) {

    const eventbus = useRef();

    const is_mount = useRef(false);

    const [ready_status, change_ready_status] = useState(false);

    useEffect(() => {
      eventbus.current = new EventEmitter();
      change_ready_status(true);
    }, []);

    useEffect(() => {
      const target_container = document.createElement("div");

      eventbus.current.on("watch_value_start", (watch_value) => {
        document.body.appendChild(target_container);
        ReactDOM.render((
          <XMLViewerContainer
            eventbus={eventbus.current}
            onMountComplate={() => {
              eventbus.current.emit("watch_value", watch_value ? format(watch_value) : null);
            }}
          />
        ), target_container, () => {
          is_mount.current = true;
        });
      });

      eventbus.current.on("watch_value_cancel", () => {
        ReactDOM.unmountComponentAtNode(target_container);
        target_container.parentNode.removeChild(target_container);
        is_mount.current = false;
      });

    }, []);

    const handleStartWatch = useCallback((watch_value) => {
      if (is_mount.current) {
        eventbus.current.emit("watch_value", watch_value ? format(watch_value) : null);
      } else {
        eventbus.current.emit("watch_value_start", watch_value);
        is_mount.current = true;
      };
    }, []);

    const handleCancelWatch = useCallback(() => {
      if (is_mount.current) {
        eventbus.current.emit("watch_value_cancel");
        is_mount.current = false;
      }
    }, []);

    if (!ready_status) {
      return null;
    };

    return (
      <SourceComponent
        ref={ref}
        {...props}
        start_watch={handleStartWatch}
        cancel_watch={handleCancelWatch}
      />
    )
  };
  hoistNonReactStatics(SourceComponent, TargetComponent);
  return React.forwardRef(TargetComponent);
};