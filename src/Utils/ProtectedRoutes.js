import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import combinedStore from "../zustore/combinedStore";
import Progress from "../components/Progress/Progress";
import Wrapper from "../components/Wrapper/Wrapper";

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { loginViaToken, isAuthenticated } = combinedStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {}, [isAuthenticated]);

  return loading ? (
    <div>
      Dash
      <Progress />
    </div>
  ) : isAuthenticated ? (
    <Routes>
      <Route path="*" element={<Wrapper />}>
        <Route path="dashboard" exact element={<Dashboard />} />
        <Route path="about" exact element={<div>About </div>} />
      </Route>
    </Routes>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default ProtectedRoutes;
