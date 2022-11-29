/* eslint-disable consistent-return */
import axios from "axios";
import { useRef, useCallback, useState } from "react";

export function useExecuteRemoteControl() {

  const count = useRef(0);
  const interval = useRef(null);
  const status_result = useRef(null);

  const [showtime, set_showtime] = useState(count.current);

  const handleRemoteControl = useCallback(async ({ params, timeout }) => {
    count.current = 0;
    set_showtime(count.current);
    clearInterval(interval.current);
    await axios({
      method: "POST",
      url: "/executeRemoteControl",
      data: params
    });
    await new Promise((resolve, reject) => {

      async function callback() {
        if (count.current >= timeout) {
          resolve(status_result.current);
          clearInterval(interval.current);
        } else {
          try {
            status_result.current = await axios({
              method: "GET",
              url: "/getOperationStatus",
              params: { dcuId: params.dcuId }
            });
            count.current += 1;
            set_showtime(count.current);
          } catch (error) {
            reject(error);
          };
        };
      };

      callback();
      interval.current = setInterval(callback, 1000);
    });
  }, []);

  return [showtime, handleRemoteControl];

};