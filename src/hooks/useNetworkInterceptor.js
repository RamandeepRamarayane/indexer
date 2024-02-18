import axios from "axios";
import React, { useEffect } from "react";
import { CustomAlertMessageEvent } from "../components/CustomAlertMessages/CustomAlerts.js";
import combinedStore from "../zustore/combinedStore.js";

function useNetworkInterceptor() {
  const logoutRequest = combinedStore((state) => state.logoutRequest);
  useEffect(() => {
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (!error.config.skipErrorMsg)
          document.dispatchEvent(
            CustomAlertMessageEvent({
              duration: 3000,
              type: "error",
              open: true,
              message:
                error?.response?.data?.message || "Something went wrong!",
            })
          );
        if (error.response.status === 401) {
          // logoutRequest();
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return null;
}

export default useNetworkInterceptor;
