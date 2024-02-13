import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { ConnectedSites } from "./ConnectedSites";
import { AddWebsiteFlow } from "./AddWebsiteFlow";

const Dashboard = () => {
  const [addWSModal, setAddWSModal] = useState(false);

  const addDomain = async () => {};

  const removeDomain = async () => {};
  return (
    <div style={{ width: "100%" }}>
      <div className={styles.dashboardHeader}>
        <Button
          text={"Add a Website"}
          handler={() => {
            setAddWSModal(true);
          }}
          style={{ background: "var(--secondary-color1)" }}
        />
      </div>
      <ConnectedSites />
      {addWSModal && (
        <Modal
          setModal={() => {
            setAddWSModal(false);
          }}
        >
          <AddWebsiteFlow modal={addWSModal} setModal={setAddWSModal} />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
