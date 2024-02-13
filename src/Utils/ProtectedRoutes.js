import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import combinedStore from "../zustore/combinedStore";
import Progress from "../components/Progress/Progress";
import Wrapper from "../components/Wrapper/Wrapper";
import IndexerDashboard from "../pages/Indexer/IndexerDashboard";
import Aside from "../pages/Aside/Aside";
import Logout from "../pages/Auth/Logout";

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { loginViaToken, isAuthenticated, logoutRequest } = combinedStore(
    (state) => state
  );
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
        <Route path="" exact element={<Dashboard />} />
        <Route path="dashboard" exact element={<Dashboard />} />
        <Route path="indexer/:siteUrl" element={<IndexerDashboard />} />
        <Route path="about" exact element={<div>About </div>} />
        <Route path="dashboard/logout" exact element={<Logout />} />

        <Route path="*" element={<Navigate to={"/dashboard"} replace />} />
      </Route>
    </Routes>
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default ProtectedRoutes;
