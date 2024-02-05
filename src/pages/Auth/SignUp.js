import React, { useState } from "react";
import styles from "./Auth.module.css";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { Link } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import { Checkbox } from "@mui/material";
import Button from "../../components/Button/Button";

const SignUp = () => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <>
      <CustomTextField label="" placeholder={"Email address"} />
      <CustomTextField label="" placeholder={"Name"} />
      <CustomTextField variant={"Password"} label="" placeholder={"Password"} />
      <div className={styles.bottomWrapper}>
        <Button
          handler={() => {}}
          height={40}
          text={"Signup"}
          style={{ padding: "10px 9px", marginTop: "15px" }}
        />
        <div className={styles.policy_terms}>
          By creating an account, I accept the content of{" "}
          <a href="#">Regulations</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
};

export default SignUp;
