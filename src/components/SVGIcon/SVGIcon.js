import React, { useRef } from "react";
import { ReactSVG } from "react-svg";
import styled, { css } from "styled-components";
import styles from "./styles.module.css";

const StyledIcon = styled(ReactSVG)`
  svg {
    ${({ size }) =>
      size &&
      css`
        width: ${size}px;
        height: ${size}px;
      `}

    [fill="#000000"] {
      fill: currentColor;
    }

    [stroke="#000000"] {
      stroke: currentColor;
    }
    [fill="black"] {
      fill: currentColor;
    }

    [stroke="black"] {
      stroke: currentColor;
    }
  }
`;

const SVGIcon = React.memo(
  ({
    tooltip,
    tooltipPlacement,
    color,
    size,
    hover,
    transform,
    src = "/assets/svg/info.svg",
    outerRef,
    style,
    ...props
  }) => {
    const ref = useRef();

    return (
      <div
        style={{ height: size, width: size, color, ...style }}
        className={styles.wrapper}
        ref={outerRef}
      >
        <StyledIcon
          ref={ref}
          src={src}
          size={size}
          hover={hover}
          transform={transform}
          style={{
            ...style,
          }}
          wrapper="div"
          {...props}
        />
      </div>
    );
  }
);

export default SVGIcon;
