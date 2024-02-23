import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import Button from "../../components/Button/Button";
import useCombinedStore from "../../zustore/combinedStore";
import { IoIosMailOpen } from "react-icons/io";
const INTERVAL = 5;

const VerificationBanner = () => {
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(INTERVAL);
  const ref = useRef(null);
  const { loginRequest, userInfo } = useCombinedStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.password) {
      setCanResend(false);
    } else {
      setCanResend(true);
    }
    setTimer(INTERVAL);
    let interval;
    interval = setInterval(() => {
      setTimer((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);
    setCanResend(false);
    setTimeout(() => {
      setCanResend(true);
      clearInterval(interval);
    }, INTERVAL * 1000);
  }, [userInfo.password]);

  const resendEmail = () => {
    loginRequest({
      email: userInfo?.userEmail,
      password: userInfo?.password,
      navigate,
    });

    setTimer(INTERVAL);
    let interval;
    interval = setInterval(() => {
      setTimer((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);
    setCanResend(false);
    setTimeout(() => {
      setCanResend(true);
      clearInterval(interval);
    }, INTERVAL * 1000);
  };
  return (
    <div className={styles.vbWrapper}>
      <div className={styles.vbTextContainer}>
        <div className={styles.titleHead}>
          <span style={{ fontSize: 30, marginRight: 5 }}>
            <IoIosMailOpen />
          </span>{" "}
          Just a Click Away!!
        </div>
        <div className={styles.subText}>
          We have <b>{userInfo?.password ? "sent" : "resent"}&nbsp;</b>
          a confirmation link to your email address. <br />
          Please verify your email by clicking the confirmation link
        </div>

        <Button
          text={canResend ? "Resend Email" : `Resend in ${timer} seconds`}
          disabled={!canResend}
          handler={resendEmail}
          width="200px"
        />

        <div className={styles.footerNote}>
          Didn't receive the email? Check spam or request a new one. Verifying
          your address helps fight spam and fraud. <br />
          <br /> <span>Thank you!</span>
        </div>
      </div>
    </div>
  );
};

export default VerificationBanner;
