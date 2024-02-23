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
import TransactionInProgress from "./pages/Subscription/TransactionInProgress";
import { screens } from "./screens";

function App() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, loginViaToken, skipLoginViaToken } =
    useCombinedStore((state) => state);
  const navigate = useNavigate();
  useNetworkInterceptor();

  useEffect(() => {
    loginViaToken({ navigate, setLoading });
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Progress />
        </>
      ) : isAuthenticated ? (
        <Routes>
          <Route
            element={<TransactionInProgress />}
            path={screens.transaction}
          />
          <Route path={"*"} element={<ProtectedRoutes />} />
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
