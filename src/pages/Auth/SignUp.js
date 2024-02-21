import React, { useState } from "react";
import styles from "./Auth.module.css";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import { Checkbox } from "@mui/material";
import Button from "../../components/Button/Button";
import { emailValidator, pwdValidator } from "../../utilityFunctions";
import combinedStore from "../../zustore/combinedStore";

const SignUp = () => {
  const signUpRequest = combinedStore((state) => state.signUpRequest);
  const [rememberMe, setRememberMe] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const [isValid, errorMsg] = pwdValidator(password);
    const [isValidE, errorMsgE] = emailValidator(email);

    if (isValid && isValidE && name.trim()) {
      setLoading(true);
      await signUpRequest({ name, email, password, company, navigate });
      setLoading(false);
    }
  };

  return (
    <>
      <form id="sign_up_form" onSubmit={(e) => e.preventDefault()}>
        <CustomTextField
          label=""
          placeholder={"Email address"}
          props={{
            value: email,
            onChange: (e) => {
              setEmail(e.target.value);
            },
          }}
        />
        <CustomTextField
          label=""
          placeholder={"Company Name"}
          props={{
            value: company,
            onChange: (e) => {
              setCompany(e.target.value);
            },
          }}
        />
        <CustomTextField
          label=""
          placeholder={"Name"}
          props={{
            value: name,
            onChange: (e) => {
              setName(e.target.value);
            },
          }}
        />
        <CustomTextField
          variant={"Password"}
          label=""
          placeholder={"Password"}
          props={{
            value: password,
            onChange: (e) => {
              setPassword(e.target.value);
            },
          }}
        />
        <div className={styles.bottomWrapper}>
          <Button
            props={{
              id: "sign-up-button",
            }}
            handler={handleRegister}
            height={40}
            text={"Signup"}
            loading={loading}
            width={"100%"}
            style={{ padding: "10px 9px", marginTop: "15px" }}
          />
          <div className={styles.policy_terms}>
            By creating an account, I accept the content of{" "}
            <a href="#">Regulations</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
