import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import combinedStore from "../zustore/combinedStore";

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = combinedStore((state) => state.isAuthenticated);
  console.log("zustand", isAuthenticated);
  return isAuthenticated ? (
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
