import React from "react";
import { CircularProgress } from "@mui/material";
import styles from "./styles.module.css";
function Progress({ height, width, circleSize = 36, color }) {
  return (
    <div style={{ height, width }} className={styles.container}>
      <CircularProgress
        size={circleSize}
        style={{ color: color || "var(--primary-color1)" }}
      />
    </div>
  );
}

export default Progress;
