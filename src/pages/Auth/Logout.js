import React, { useEffect } from "react";
import useCombinedStore from "../../zustore/combinedStore";

const Logout = () => {
  const { logoutRequest } = useCombinedStore((state) => state);
  useEffect(() => {
    logoutRequest();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
