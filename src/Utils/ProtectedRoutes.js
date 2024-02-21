import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Progress from "../components/Progress/Progress";
import Wrapper from "../components/Wrapper/Wrapper";
import Logout from "../pages/Auth/Logout";
import Indexer from "../pages/Indexer/Indexer";
import useCombinedStore from "../zustore/combinedStore";

const ProtectedRoutes = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const { loginViaToken, isAuthenticated, logoutRequest } = useCombinedStore(
    (state) => state
  );

  return loading ? (
    <div>
      <Progress />
    </div>
  ) : isAuthenticated ? (
    <Routes>
      <Route path="*" element={<Wrapper />}>
        <Route path="" exact element={<Dashboard />} />
        <Route path="dashboard" exact element={<Dashboard />} />
        <Route path="indexer" element={<Indexer />} />
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
