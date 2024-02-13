import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const CustomTextField = ({
  label = "label",
  placeholder = "placeholder",
  type = "",
  inputStyles = {},
  variant = "default",
  props = {},
  errorMsg = "",
  disableUnderline = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl style={{ width: "100%" }}>
      {label && <InputLabel htmlFor="my-input">{label}</InputLabel>}
      <Input
        id={type}
        disableUnderline={disableUnderline}
        type={
          variant?.toLowerCase() == "password"
            ? showPassword
              ? "text"
              : "password"
            : "text"
        }
        {...props}
        aria-describedby={type}
        placeholder={placeholder}
        style={{
          ...inputStyles,
          width: "100%",
          height: "50px",
        }}
        endAdornment={
          variant == "password" && (
            <InputAdornment
              position="end"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </InputAdornment>
          )
        }
      />
      {!!errorMsg?.length && (
        <div
          style={{
            fontSize: "12px",
            color: "red",
            position: "absolute",
            bottom: "-14px",
            left: "4px",
          }}
        >
          {errorMsg}
        </div>
      )}
      {/* <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText> */}
    </FormControl>
  );
};

export default CustomTextField;
