/* eslint-disable no-unused-vars */
import { Button } from "antd";
import ReactDOM from "react-dom";
import React, { useRef, useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";


async function mount_container(point) {
  const render_target = document.createElement("div");
  document.body.appendChild(render_target);

  await new Promise((resolve, reject) => {
    try {
      ReactDOM.render((
        <Button type="primary">dsfdsfsdfdsf</Button>
      ), render_target, resolve);
    } catch (error) {
      reject(error);
    }
  });

  return render_target;
};

export default function AmapPage() {

  const element = useRef();

  useEffect(() => {
    (async () => {
      const AMap = await AMapLoader.load({
        key: "4e081e510bbfea199f26b66fbe8342be",
        version: "2.0",
        plugins: [],
        AMapUI: {
          version: "1.1",
          plugins: [],
        },
        resizeEnable: true,
        zoom: 12,
        center: [121.498586, 31.239637],
        showIndoorMap: false
      });
      const map = new AMap.Map(element.current);

      const marker1 = new AMap.Marker({
        map,
        position: [116.481181, 39.989792]
      });

      const marker2 = new AMap.Marker({
        map,
        position: [120, 39.989792]
      });

      const infoWindow = new AMap.InfoWindow({
        isCustom: true,  // 使用自定义窗体
        content: await mount_container(),
        offset: new AMap.Pixel(16, -45)
      });

      marker1.on("click", () => {
        infoWindow.open(map, marker1.getPosition());
      });

      marker2.on("click", () => {
        infoWindow.open(map, marker2.getPosition());
      });
    })();
  }, []);

  return (
    <div ref={element} style={{ height: "100%" }} />
  )
};