import React, { useState, useCallback, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
const CustomAlertMessageEventName = "CustomAlertMessageEventName";

const initialState = {
  open: false,
  duration: 0,
  message: "",
  type: undefined,
};

function CustomAlerts() {
  const [state, setState] = useState(initialState);

  const onAlert = useCallback((e) => {
    const { open, duration, message, type } = e.detail;

    setState({ open, duration, message, type });
  }, []);

  useEffect(() => {
    document.addEventListener(CustomAlertMessageEventName, onAlert);

    return () =>
      document.removeEventListener(CustomAlertMessageEventName, onAlert);
  }, []);

  return (
    state.open && (
      <Snackbar
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={state.open}
        autoHideDuration={state.duration}
        onClose={() => setState((ps) => ({ ...ps, open: false }))}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setState(initialState);
              }}
            >
              X
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert
          onClose={() => setState((ps) => ({ ...ps, open: false }))}
          severity={state.type}
          variant="filled"
        >
          {state.message}
        </Alert>
      </Snackbar>
    )
  );
}

export const CustomAlertMessageEvent = (data) =>
  new CustomEvent(CustomAlertMessageEventName, {
    detail: { ...data },
  });

export default CustomAlerts;
