import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import combinedStore from "../../zustore/combinedStore";

const Navbar = () => {
  const logout = combinedStore((state) => state.logout);
  const userInfo = combinedStore((state) => state.userInfo);
  useEffect(() => {
    console.log("dsafadsfasd", userInfo);
  }, [userInfo]);
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.left}>Dashboard</div>
      <div className={styles.right}>
        {userInfo?.email}
        <Button
          text={"Logout"}
          handler={() => {
            logout();
          }}
          style={{ padding: "10px 20px" }}
        />
      </div>
    </div>
  );
};

export default Navbar;
