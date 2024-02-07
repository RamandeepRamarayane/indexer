import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { screens } from "../../screens";
import { getData, postData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import combinedStore from "../../zustore/combinedStore";
import Progress from "../../components/Progress/Progress";
let apiCall = 0;
const Verify = () => {
  const loginRequest = combinedStore((state) => state.loginRequest);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get("email");
  const _token = queryParams.get("token");
  const handleVerify = async (token) => {
    const res = await postData({
      url: `${endPoints.verify}?token=${token}`,
    });
    if (res.status == 200 || res.status == 201) {
      loginRequest({
        email: "rxy@yopmail.com",
        password: "R1234567",
        navigate,
      });
    } else {
      navigate(screens.login);
    }
  };
  useEffect(() => {
    if (_token && apiCall == 0) {
      apiCall = 1;
      handleVerify(_token);
    } else {
      apiCall = 0;
      navigate(screens.login);
    }
  }, []);

  return <Progress width={"100%"} height={"100%"} />;
};

export default Verify;
