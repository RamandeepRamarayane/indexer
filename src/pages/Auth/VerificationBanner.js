import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import Button from "../../components/Button/Button";
const INTERVAL = 5;

const VerificationBanner = () => {
  return (
    <div className={styles.vbContainer}>
      Verification link has been sent to your registered email
    </div>
  );
};

export default VerificationBanner;
