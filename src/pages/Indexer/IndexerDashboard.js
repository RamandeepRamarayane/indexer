import React, { useEffect } from "react";
import styles from "./Indexer.styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { screens } from "../../screens";

const IndexerDashboard = () => {
  const { siteUrl } = useParams();

  return <div className={styles.indexerContainer}>{siteUrl}</div>;
};

export default IndexerDashboard;
