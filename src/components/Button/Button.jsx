import React, { useRef } from "react";
import { CircularProgress } from "@mui/material";
import styles from "./styles.module.css";
import { RiLock2Fill } from "react-icons/ri";
import SVGIcon from "../SVGIcon/SVGIcon";
import LoadingDots from "../LoadingDots/LoadingDots";

function getIcon(Icon, iconType, iconReverse, iconSize) {
  if (!Icon) return;
  return iconType === "JSX" ? (
    <SVGIcon size={14} src={Icon} />
  ) : (
    <Icon
      style={{ fontSize: iconSize }}
      className={`${styles.buttonIcon} ${
        iconReverse ? styles.iconReverse : ""
      }`}
    />
  );
}

function getButtonContent(
  loading,
  loadingText,
  text,
  Icon,
  iconReverse,
  iconSize,
  lessDots = false,
  iconType,
  loadingTextReverse
) {
  if (loading)
    return <CircularProgress sx={{ color: "white" }} size={"1.1rem"} />;

  if (Icon) {
    return (
      <>
        {text && (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2px",
              flexDirection: loadingTextReverse ? "row-reverse" : "row ",
            }}
          >
            {text}
            {loadingText && <LoadingDots lessDots={lessDots} />}
          </span>
        )}
        {getIcon(Icon, iconType, iconReverse, iconSize)}
      </>
    );
  } else
    return (
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2px",
          flexDirection: loadingTextReverse ? "row-reverse" : "row ",
        }}
      >
        {text}
        {loadingText && <LoadingDots lessDots={lessDots} />}{" "}
      </span>
    );
}

export default function Button({
  type = "submit",
  text = "Confirm",
  Icon = null,
  loading = false,
  handler = () => {},
  secondary,
  tertiary,
  iconReverse,
  loadingTextReverse,
  width = "100%",
  fontSize = 16,
  height = 40,
  fontWeight = 500,
  borderRadius,
  disabled,
  marginTop,
  style = {},
  iconSize,
  customClass = "",
  props,
  loadingText,
  locked,
  lessDots = false,
  LockedTextComponent = "",
  iconType,
  id = "",
}) {
  const ref = useRef();

  disabled = loading || disabled;
  return (
    <button
      id={id}
      ref={ref}
      className={`${styles.button} ${secondary ? styles.secondary : ""} ${
        tertiary ? styles.tertiary : ""
      } ${customClass} ${disabled ? styles.disabled : ""}`}
      onClick={locked || disabled ? () => {} : handler}
      type={type}
      // disabled={disabled}
      style={{
        width,
        fontSize,
        height,
        fontWeight,
        borderRadius,
        marginTop,
        ...style,
      }}
      {...props}
    >
      <div
        className={`${styles.buttonContent} ${
          iconReverse ? styles.iconReverse : ""
        }`}
      >
        {getButtonContent(
          loading,
          loadingText,
          text,
          Icon,
          iconReverse,
          iconSize,
          lessDots,
          iconType,
          loadingTextReverse
        )}
      </div>
      {locked && <RiLock2Fill className={styles.lockIcon} />}
      {LockedTextComponent && locked && (
        <div style={{ top: "100%" }} className={styles.lockedMessageContainer}>
          <div className={styles.lockedMessage}>
            <LockedTextComponent />
          </div>
        </div>
      )}
    </button>
  );
}
