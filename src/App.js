import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { RoutesWrapper } from "./RoutesWrapper";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Auth from "./pages/Auth/Auth";
import ProtectedRoutes from "./Utils/ProtectedRoutes";
import { useEffect } from "react";
import { useStore } from "zustand";
import combinedStore from "./zustore/combinedStore";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"auth"} element={<Auth />}>
          <Route path={""} element={<Navigate to={"/auth/login"} replace />} />
          <Route path={"login"} exact element={<Login />} />
          <Route path={"signup"} exact element={<SignUp />} />
        </Route>
        <Route path="dashboard/*" element={<ProtectedRoutes />} />
        <Route path={"*"} element={<Navigate to={"/dashboard"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
