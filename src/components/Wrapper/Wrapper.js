import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Wrapper.module.css";
import Navbar from "../Navbar/Navbar";

const Wrapper = () => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Wrapper;
