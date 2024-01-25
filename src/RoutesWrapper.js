import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";

export const RoutesWrapper = () => {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
    </Routes>
  );
};
