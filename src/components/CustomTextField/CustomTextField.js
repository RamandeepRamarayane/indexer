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

const TextField = ({
  label = "label",
  placeholder = "placeholder",
  type = "",
  inputStyles = {},
  variant = "default",
  props = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl style={{ width: "100%" }}>
      {label && <InputLabel htmlFor="my-input">{label}</InputLabel>}
      <Input
        id={type}
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
        style={{ ...inputStyles, width: "100%", height: "50px" }}
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
      {/* <FormHelperText id="my-helper-text">
        We'll never share your email.
      </FormHelperText> */}
    </FormControl>
  );
};

export default TextField;
