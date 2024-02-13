import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { screens } from "../../screens";
import styles from "./Dashboard.module.css";
import { Skeleton } from "@mui/material";
import Button from "../../components/Button/Button";
import { endPoints } from "../../endPoints";
import { getData } from "../../networkCalls";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
const DummyRows = [1, 2, 3, 4, 5, 6];

const SkeletonRows = () => {
  return DummyRows.map((row) => {
    return (
      <div className={styles.dummyRow}>
        <Skeleton
          width={"100%"}
          height={80}
          style={{ marginBottom: "-20px" }}
        />
      </div>
    );
  });
};

const NoDomains = () => {
  return (
    <tr className={styles.siteRowWrapper}>
      <td colSpan={10}>
        <div className={styles.noDomainsWrapper}>
          <div className={styles.emptyIcon}>
            <SVGIcon
              src={"/assets/svg/emptyData.svg"}
              size={80}
              style={{ color: "inherit" }}
            />
          </div>
          No Connected Domains
        </div>
      </td>
    </tr>
  );
};

const ConnectedSitesRow = ({ siteHandler = () => {} }) => {
  const site = "bulkIndexer.net";
  return (
    <tr className={styles.siteRowWrapper}>
      <td>
        <div
          onClick={() => {
            siteHandler(site);
          }}
        >
          {site}
        </div>
      </td>
      <td className={styles.rowCtas}>
        <div className={styles.ctaWrapper}>
          <Button
            text={"Details"}
            handler={(e) => {
              e.preventDefault();
              e.stopPropagation();
              siteHandler(site);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

export const ConnectedSites = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fetchedDomains, setFetchedDomains] = useState([]);
  const siteHandler = (site) => {
    navigate(screens.indexer + "/" + site);
  };

  useEffect(() => {
    fetchDomains();
  }, []);
  const fetchDomains = async () => {
    const res = await getData({ url: endPoints.getDomains });
    if (res.status == 200) {
      if (!!res.data?.domains?.length) {
        setFetchedDomains(res.data.domains);
      } else {
        setFetchedDomains([]);
      }
      setLoading(false);
    } else {
      setFetchedDomains([]);
    }
  };

  return loading ? (
    <SkeletonRows />
  ) : (
    <table className={styles.connectedSitesTable}>
      <thead>
        <tr>
          <th></th>
          <th className={styles.headCtas}></th>
        </tr>
      </thead>
      <tbody>
        {!!fetchDomains.length ? (
          fetchedDomains.map((site) => {
            return <ConnectedSitesRow siteHandler={siteHandler} site={site} />;
          })
        ) : (
          <NoDomains />
        )}
      </tbody>
    </table>
  );
};
