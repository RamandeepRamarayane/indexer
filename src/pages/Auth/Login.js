import React, { useState } from "react";
import styles from "./Auth.module.css";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import Button from "../../components/Button/Button";
import { Checkbox } from "@mui/material";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <>
      <CustomTextField label="" placeholder={"Email address"} />
      <CustomTextField variant={"Password"} label="" placeholder={"Password"} />
      <div className={styles.bottomWrapper}>
        <div className={styles.options}>
          <div
            onClick={() => {
              setRememberMe(!rememberMe);
            }}
            className={styles.rememberMeCta}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              cursor: "pointer",
            }}
          >
            <Checkbox
              checked={rememberMe}
              sx={{
                color: "#ced4da",
                marginLeft: "-11px",
                marginRight: "-5px",
                "&.Mui-checked": {
                  color: "#4f77ff",
                },
                "& .MuiSvgIcon-root": { fontSize: 20 },
                ":hover": {
                  background: "transparent",
                },
                "&.Mui-checked:hover": {
                  background: "transparent",
                },
              }}
            />{" "}
            Remember Me
          </div>
          <div className={styles.forgotPwdCta}>Forgot Password?</div>
        </div>
        <Button
          handler={() => {}}
          height={40}
          text={"Login with email"}
          style={{ padding: "10px 9px", marginTop: "15px" }}
        />
      </div>
    </>
  );
};

export default Login;
