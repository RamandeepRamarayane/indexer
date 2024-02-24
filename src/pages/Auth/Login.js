import React, { useState } from "react";
import styles from "./Auth.module.css";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import Button from "../../components/Button/Button";
import { Checkbox } from "@mui/material";
import combinedStore from "../../zustore/combinedStore";
import { emailValidator, pwdValidator } from "../../utilityFunctions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const loginRequest = combinedStore((state) => state.loginRequest);
  const [email, setEmail] = useState("raman@test.com");
  const [password, setPassword] = useState("R1234567");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const [isValid, errorMsg] = pwdValidator(password);
    const [isValidE, errorMsgE] = emailValidator(email);
    setLoading(true);
    if (isValid && isValidE) {
      const signInData = {
        email: email,
        password: password,
        navigate,
        rememberMe,
      };
      await loginRequest(signInData);
    }
    setLoading(false);
  };
  return (
    <>
      <form
        id="sign_in_form"
        onSubmit={(e) => e.preventDefault()}
        style={{ width: "100%" }}
      >
        <CustomTextField
          label=""
          placeholder={"Email address"}
          props={{
            value: email,
            onChange: (e) => setEmail(e.target.value),
          }}
        />
        <CustomTextField
          variant={"Password"}
          label=""
          placeholder={"Password"}
          props={{
            value: password,
            onChange: (e) => setPassword(e.target.value),
          }}
        />
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
            props={{
              id: "sign-in-button",
            }}
            handler={handleLogin}
            height={40}
            width={"100%"}
            text={"Login"}
            style={{ padding: "10px 9px", marginTop: "15px" }}
            loading={loading}
          />
        </div>
      </form>
    </>
  );
};

export default Login;
