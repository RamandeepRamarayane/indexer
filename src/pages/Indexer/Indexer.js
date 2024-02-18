import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { screens } from "../../screens";
import IndexerDashboard from "./IndexerDashboard";
import { trimDomainName } from "../../Utils/constants";

const Indexer = () => {
  const [toFetchDomain, setToFetchDomain] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const domain_name = queryParams.get("domain_name");
    if (domain_name) {
      setToFetchDomain(domain_name);
      navigate(screens.indexer + "/" + trimDomainName(domain_name), {
        replace: true,
      });
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/:siteUrl"
        element={<IndexerDashboard toFetchDomain={toFetchDomain} />}
      />
    </Routes>
  );
};

export default Indexer;
