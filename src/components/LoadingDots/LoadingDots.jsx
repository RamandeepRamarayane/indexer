import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
const loadingDotsData = [".", "..", "..."];

function LoadingDots({
    lessDots,
    width = "72px",
    height = "72px",
    customStyle = {},
    dots,
}) {
    const [loadingDots, setLoadingDots] = useState("");
    const [arrToUse, setArrToUse] = useState(loadingDotsData);

    useEffect(() => {
        let interval1 = null;
        let j = 0;
        interval1 = setInterval(() => {
            if (j === arrToUse.length) {
                j = 0;
            }
            setLoadingDots(arrToUse[j]);
            j++;
        }, 500);

        return () => {
            if (interval1) clearInterval(interval1);
        };
    }, []);
    return dots ? (
        <div style={{ width: 10, display: "inline-block", textAlign: "left" }}>
            {loadingDots}
        </div>
    ) : (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className={styles.svg}
            style={{ ...customStyle }}
        >
            <g transform="translate(50 50)">
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        values="0;45"
                        keyTimes="0;1"
                        dur="0.2s"
                        repeatCount="indefinite"
                    ></animateTransform>
                    <path
                        d="M29.287369291214944 -6.5 L37.287369291214944 -6.5 L37.287369291214944 6.5 L29.287369291214944 6.5 A30 30 0 0 1 25.305491506645296 16.113103351220175 L25.305491506645296 16.113103351220175 L30.962345756137676 21.769957600712555 L21.769957600712555 30.962345756137676 L16.113103351220175 25.305491506645296 A30 30 0 0 1 6.500000000000003 29.28736929121494 L6.500000000000003 29.28736929121494 L6.5000000000000036 37.287369291214944 L-6.499999999999997 37.287369291214944 L-6.499999999999998 29.287369291214944 A30 30 0 0 1 -16.11310335122018 25.305491506645293 L-16.11310335122018 25.305491506645293 L-21.76995760071256 30.962345756137672 L-30.962345756137672 21.769957600712562 L-25.305491506645293 16.113103351220182 A30 30 0 0 1 -29.287369291214944 6.499999999999997 L-29.287369291214944 6.499999999999997 L-37.287369291214944 6.499999999999998 L-37.287369291214944 -6.499999999999989 L-29.287369291214944 -6.49999999999999 A30 30 0 0 1 -25.305491506645296 -16.113103351220175 L-25.305491506645296 -16.113103351220175 L-30.96234575613768 -21.76995760071255 L-21.769957600712566 -30.962345756137665 L-16.113103351220186 -25.30549150664529 A30 30 0 0 1 -6.499999999999999 -29.287369291214944 L-6.499999999999999 -29.287369291214944 L-6.500000000000001 -37.287369291214944 L6.499999999999987 -37.287369291214944 L6.4999999999999885 -29.287369291214944 A30 30 0 0 1 16.113103351220175 -25.305491506645296 L16.113103351220175 -25.305491506645296 L21.76995760071255 -30.96234575613768 L30.962345756137665 -21.769957600712566 L25.30549150664529 -16.113103351220186 A30 30 0 0 1 29.287369291214944 -6.500000000000001 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20"
                        fill="currentColor"
                    ></path>
                </g>
            </g>
        </svg>
    );
}

export default LoadingDots;
