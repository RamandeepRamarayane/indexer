import React, { useEffect } from "react";
import styles from "./styles.module.css";
import Button from "../Button/Button";
import combinedStore from "../../zustore/combinedStore";
import { useNavigate } from "react-router-dom";
import { screens } from "../../screens";

const Navbar = () => {
  const { logoutRequest, userInfo } = combinedStore((state) => state);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("dsafadsfasd", userInfo);
  }, [userInfo]);
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.left}>
        <Button
          text={"Dashboard"}
          handler={() => {
            navigate(screens.dashboard);
          }}
          style={{
            color: "var(--primary-color1)",
            fontWeight: "var(--fw-sb)",
            background: "var(--primary-color1-op01)",
          }}
        />
      </div>
      <div className={styles.right}>
        {!!userInfo?.name && (
          <div className={styles.greetText}>Welcome {userInfo?.name}</div>
        )}
        <Button
          text={"Logout"}
          handler={() => {
            logoutRequest();
          }}
          width={"90px"}
          style={{
            border: "1px solid var(--secondary-color1)",
            color: "var(--secondary-color1)",
            fontWeight: "var(--fw-sb)",
            background: "white",
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
