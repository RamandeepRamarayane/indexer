import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Auth from "./pages/Auth/Auth";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import Verify from "./pages/Auth/Verify";
import useNetworkInterceptor from "./hooks/useNetworkInterceptor";
import VerificationBanner from "./pages/Auth/VerificationBanner";
import { useEffect, useState } from "react";
import useCombinedStore from "./zustore/combinedStore";
import Progress from "./components/Progress/Progress";
import CustomAlerts from "./components/CustomAlertMessages/CustomAlerts";

function App() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loginViaToken } = useCombinedStore();
  const navigate = useNavigate();
  useNetworkInterceptor();
  useEffect(() => {
    window.onstorage = (e) => {
      if (e.key == "token" && localStorage.getItem("token")) {
        window.location = "";
      }
    };
  }, []);

  useEffect(() => {
    loginViaToken({ navigate, setLoading });
  }, []);

  useEffect(() => {}, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Progress />
      ) : isAuthenticated ? (
        <Routes>
          <Route path="dashboard/*" element={<ProtectedRoutes />} />
          <Route path={"*"} element={<Navigate to={"/dashboard"} replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path={"auth/verify-email"} exact element={<Verify />} />
          <Route path={"auth/verify"} exact element={<VerificationBanner />} />
          <Route path={"auth"} element={<Auth />}>
            <Route
              path={""}
              element={<Navigate to={"/auth/login"} replace />}
            />
            <Route path={"login"} exact element={<Login />} />
            <Route path={"signup"} exact element={<SignUp />} />
          </Route>
          <Route path={"*"} element={<Navigate to={"/auth/login"} replace />} />
        </Routes>
      )}
      <CustomAlerts />
    </>
  );
}

export default App;
