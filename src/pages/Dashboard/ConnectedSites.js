import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { screens } from "../../screens";
import styles from "./Dashboard.module.css";
import { Skeleton } from "@mui/material";
import Button from "../../components/Button/Button";
import { endPoints } from "../../endPoints";
import { getData } from "../../networkCalls";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import Modal from "../../components/Modal/Modal";
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
    <tr className={styles.siteRowWrapperEmpty} style={{ cursor: "default" }}>
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

const ConnectedSitesRow = ({ site = {}, setDeleteDomain = () => {} }) => {
  const navigate = useNavigate();

  const siteHandler = (site) => {
    if (!site) return;
    navigate(screens.indexer + "?domain_name=" + site);
  };
  return (
    <tr className={styles.siteRowWrapper}>
      <td>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            siteHandler(site.domain_name);
          }}
          className={styles.domainName}
        >
          {site.domain_name}
        </div>
      </td>
      <td className={styles.rowCtas}>
        <div className={styles.ctaWrapper}>
          <Button
            text={site?.steps == 4 ? "Details" : "Setup"}
            handler={(e) => {
              e.preventDefault();
              e.stopPropagation();
              siteHandler(site.domain_name);
            }}
            style={{
              background: site?.steps == 4 ? "" : "var(--tertiary-color1)",
            }}
            width={"100px"}
          />
          <Button
            text={""}
            handler={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDeleteDomain({ isShow: true, obj: site });
            }}
            Icon={() => <SVGIcon src={"/assets/svg/deleteBin.svg"} size={24} />}
            style={{
              color: "var(--secondary-color2)",
              background: "white",
            }}
          />
        </div>
      </td>
    </tr>
  );
};

const ConnectedSites = ({
  fetchedDomains = [],
  setFetchedDomains = () => {},
  loading,
  setLoading,
  setDeleteDomain = () => {},
}) => {
  return loading ? (
    <SkeletonRows />
  ) : (
    <table className={styles.connectedSitesTable}>
      <thead>
        <tr>
          <th>Domain</th>
          <th className={styles.headCtas}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!!fetchedDomains.length ? (
          fetchedDomains.map((site) => {
            return (
              <ConnectedSitesRow
                site={site}
                setDeleteDomain={setDeleteDomain}
              />
            );
          })
        ) : (
          <NoDomains />
        )}
      </tbody>
    </table>
  );
};

export default ConnectedSites;
