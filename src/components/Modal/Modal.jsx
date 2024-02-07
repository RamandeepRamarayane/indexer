import React from "react";
import styles from "./styles.module.css";
import MUIModal from "@mui/material/Modal";

function Modal({
  customClass = "",
  setModal = () => {},
  children = <></>,
  props = {},
}) {
  return (
    <MUIModal
      className={styles.container + " " + customClass}
      open={true}
      onClose={() => setModal(false)}
      {...props}
    >
      {children}
    </MUIModal>
  );
}

export default Modal;
