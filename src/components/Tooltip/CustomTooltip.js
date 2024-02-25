import React, { useCallback } from "react";
import { ClickAwayListener, Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";
export const CustomTooltip = (props) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  const _ToolTip = useCallback(
    withStyles((theme) => ({
      arrow: {
        // color: "#fcfcfc",
        "&::before": {
          // border: "1px solid rgba(0, 0, 0, 0.2)",
        },
        ...(props.arrowStyle ? props.arrowStyle : {}),
      },
      tooltip: {
        borderRadius: 8,
        border: "1px solid rgba(0, 0, 0, 0.2)",
        fontSize: 14,
        fontWeight: 400,
        ...(props.tooltipStyle ? props.tooltipStyle : {}),
      },
    }))(Tooltip),
    []
  );

  if (props.click)
    return (
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <_ToolTip
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            {...props}
            interactive
          >
            <div style={{ cursor: "pointer" }} onClick={handleTooltipOpen}>
              {props.children}
            </div>
          </_ToolTip>
        </div>
      </ClickAwayListener>
    );

  return <_ToolTip {...props} />;
};
