import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RedirectTo = (link) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(link);
  }, [link]);
  return null;
};
