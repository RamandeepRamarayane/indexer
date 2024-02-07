import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import SVGIcon from "../../components/SVGIcon/SVGIcon";

const Dashboard = () => {
  const [addWSModal, setAddWSModal] = useState(false);
  return (
    <div style={{ width: "100%" }}>
      <div className={styles.dashboardHeader}>
        <div className={styles.dashboardMeta}>Overview of your websites</div>
        <h1 className={styles.dashboardTitle}>Dashboard</h1>
        <div className={styles.subtext}>
          From here you can manage your websites, add new ones, and see the most
          important metrics in a glance.
        </div>
        <Button
          text={"Add a Website"}
          handler={() => {
            setAddWSModal(true);
          }}
          style={{ background: "var(--secondary-color1)" }}
        />
      </div>
      {addWSModal && (
        <Modal
          setModal={() => {
            setAddWSModal(false);
          }}
        >
          <div className={styles.addWSModalWrapper}>
            <div className={styles.wsModal_iconWrap}>
              <SVGIcon />
            </div>
            <div className={styles.wsModal_title}>Add a Website</div>
            <div className={styles.instruction_line1}>
              Select below a site from your Google Search Console. By choosing a
              site, it will be added to Bulk Indexer.
            </div>
            <div className={styles.websiteListingContainer}></div>
            <div className={styles.bottomCta}>
              <Button
                text={"Cancel"}
                handler={() => {
                  setAddWSModal(false);
                }}
                style={{
                  background: "white",
                  color: "var(--secondary-color1)",
                }}
              />
              <Button
                text={"Add"}
                handler={() => {
                  setAddWSModal(false);
                }}
                style={{
                  background: "var(--primary-color1)",
                  color: "white",
                }}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
