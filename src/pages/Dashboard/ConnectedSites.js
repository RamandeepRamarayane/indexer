import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { screens } from "../../screens";
import styles from "./Dashboard.module.css";
import { Skeleton, Switch, styled } from "@mui/material";
import Button from "../../components/Button/Button";
import { endPoints } from "../../endPoints";
import { getData, postData } from "../../networkCalls";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import Modal from "../../components/Modal/Modal";
import Progress from "../../components/Progress/Progress";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 39,
  height: 22,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "var(--secondary-color1)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 18,
    height: 18,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

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
    <div className={styles.siteRowWrapperEmpty} style={{ cursor: "default" }}>
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
    </div>
  );
};

const ConnectedSitesRow = ({ site = {}, setDeleteDomain = () => {} }) => {
  const navigate = useNavigate();
  const [updatingAutoIndex, setUpdatingAutoIndex] = useState(false);
  const [isAutoIndex, setIsAutoIndex] = useState(
    site?.autoindex_status == 1 ? true : false
  );

  useEffect(() => {
    if (site?.autoindex_status == 1 && site.steps == 4) {
      setIsAutoIndex(true);
    } else {
      setIsAutoIndex(false);
    }
  }, [site?.autoindex_status]);

  const syncIndexStatus = async (e) => {
    setUpdatingAutoIndex(true);
    let val = e.target.checked || false;
    let payload = {
      domain_name: site?.domain_name,
      status: val ? 1 : 0,
    };
    const res = await postData({ url: endPoints.autoIndexUpdate, payload });
    if (res.status == 200) {
      setIsAutoIndex(val);
    } else {
      setIsAutoIndex(!val);
    }
    setUpdatingAutoIndex(false);
  };
  const siteHandler = (site) => {
    if (!site) return;
    navigate(screens.indexer + "?domain_name=" + site);
  };
  return (
    <div className={styles.rowWrapper}>
      <div className={styles.rowName}>
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
      </div>
      <div className={styles.rowAutoIdx}>
        <div className={styles.autoIndexToggler}>
          {updatingAutoIndex ? (
            <Progress height={"20px"} width={"20px"} circleSize={16} />
          ) : (
            <IOSSwitch
              checked={isAutoIndex}
              onChange={syncIndexStatus}
              inputProps={{
                "aria-label": "controlled",
                disabled: site?.steps == 4 ? updatingAutoIndex || false : true,
              }}
            />
          )}
        </div>
      </div>
      <div className={styles.rowCtas}>
        <div className={styles.ctaWrapper}>
          <Button
            text={site?.steps == 4 ? "Details" : "Setup"}
            handler={(e) => {
              e.preventDefault();
              e.stopPropagation();
              siteHandler(site.domain_name);
            }}
            style={{
              background:
                site?.steps == 4
                  ? "var(--secondary-color1)"
                  : "var(--secondary-color1-op05)",
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
              background: "transparent",
            }}
          />
        </div>
      </div>
    </div>
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
    <div className={styles.connectedSitesTable}>
      <div className={styles.headRowWrapper}>
        <div className={styles.headName}>Domain</div>
        <div className={styles.headAutoIdx}>Auto Index</div>
        <div className={styles.headCtas}>Actions</div>
      </div>
      <div className={styles.rowsContainer}>
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
      </div>
    </div>
  );
};

export default ConnectedSites;
