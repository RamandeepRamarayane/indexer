import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import Login from "./Login";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import combinedStore from "../../zustore/combinedStore";
import Progress from "../../components/Progress/Progress";

const Auth = () => {
  const location = useLocation();
  console.log("location", location);
  const { setAppLoading, isAuthenticated } = combinedStore((state) => state);
  const isSignup = location.pathname.includes("/signup");
  console.log("zustand", isAuthenticated);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return loading ? (
    <div>
      Auth
      <Progress />
    </div>
  ) : isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <div className={styles.authWrapper}>
      <div className={styles._left}>
        <div className={styles.logoWrapper}>
          <SVGIcon
            src={"/assets/svg/Logo.svg"}
            style={{ width: "150px", height: "max-content" }}
          />
        </div>
        <div className={styles.wrapper}>
          <div className={styles.metaLogin}>
            <div className={styles.tagline}>
              {isSignup
                ? "Signup for your Bulk Indexer account"
                : "Login to your Bulk Indexer account"}
            </div>
            <div className={styles.subtext}>
              {isSignup ? "Already have an account!" : "Don't have an account?"}
              <Link to={isSignup ? "/auth/login" : "/auth/signup"}>
                {isSignup ? "Login" : "Sing Up Free!"}
              </Link>
            </div>
          </div>
          <div className={styles.loginWrapper}>
            <Outlet />
          </div>
        </div>
      </div>
      <div className={styles._right}></div>
    </div>
  );
};

export default Auth;
