import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Wrapper.module.css";
import Navbar from "../Navbar/Navbar";
import Aside from "../../pages/Aside/Aside";

const Wrapper = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        background: "var(--bg-color1)",
      }}
    >
      <Aside />
      <Outlet />
    </div>
  );
};

export default Wrapper;
