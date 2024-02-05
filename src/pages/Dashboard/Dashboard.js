import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
  return (
    <div style={{ width: "100%" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
