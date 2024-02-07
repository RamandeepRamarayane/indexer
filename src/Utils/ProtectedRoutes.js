import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import combinedStore from "../zustore/combinedStore";
import Progress from "../components/Progress/Progress";

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
      <Route path="" element={<Dashboard />}>
        <Route path="about" element={<div>About </div>} />
        <Route path="1" element={<div>About </div>} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default ProtectedRoutes;
