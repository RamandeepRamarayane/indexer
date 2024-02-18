import React, { useEffect, useState } from "react";
import styles from "./Indexer.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { screens } from "../../screens";
import Button from "../../components/Button/Button";
import { getData, postData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { Checkbox, Skeleton, makeStyles } from "@mui/material";
import { removeDomain } from "../../Utils/constants";
import CustomTextField from "../../components/CustomTextField/CustomTextField";

const DummyRows = [1, 2, 3, 4, 5];

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

const PageRow = ({ page = {}, idx = 0, indexPages = () => {} }) => {
  const [checked, setChecked] = useState(false);
  return (
    <div className={styles.pageRowWrapper}>
      <div className={styles.itemCheckbox}>
        <Checkbox
          checked={checked}
          onChange={(e) => {
            setChecked(!checked);
          }}
          defaultChecked
          checkedIcon={
            <SVGIcon
              src={"/assets/svg/check-filled.svg"}
              size={18}
              style={{ color: "var(--primary-color1)" }}
            />
          }
          icon={
            <SVGIcon
              src={"/assets/svg/check-empty.svg"}
              size={18}
              style={{ color: "var(--tertiary-color1)" }}
            />
          }
          size={"small"}
        />
      </div>
      <div className={styles.itemPage}>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(page.page, "_blank");
          }}
          className={styles.pageUrl}
        >
          {removeDomain(page.page)}
        </div>
      </div>
      <div className={styles.itemStatus}>{page.status}</div>
      <div className={styles.itemCta}>
        <Button
          text={"Index"}
          height={28}
          handler={(e) => {
            e.preventDefault();
            e.stopPropagation();
            indexPages([page.id]);
          }}
        />
      </div>
    </div>
  );
};

const IndexerDashboard = ({ toFetchDomain }) => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState([
    {
      id: 7,
      sitemap_id: 5,
      domain_id: 8,
      user_id: 3,
      page: "https://bulkindexer.net/roadmap/",
      last_index_date: null,
      page_first_found_date: null,
      status: 1,
      error: null,
      created_at: "2024-02-14T15:32:22.000Z",
      updated_at: "2024-02-14T15:32:22.000Z",
    },
  ]);
  const [sitemaps, setSitemaps] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [disable, setDisable] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [domainSitemap, setDomainSitemap] = useState("");
  const [syncStatu, setSyncStatus] = useState({ msg: "" });
  const [errDomainName, setErrDomainName] = useState("");
  const [errJson, setErrJson] = useState("");
  const [addCredential, setAddCredential] = useState("");
  const { siteUrl } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (toFetchDomain) {
      fetchPages(toFetchDomain);
      fetchSitemaps(toFetchDomain);
      fetchCredentials(toFetchDomain);
    }
  }, [toFetchDomain]);

  useEffect(() => {
    if (disable) {
      setActiveTab(2);
    }
  }, [disable]);

  const fetchPages = async (site) => {
    setLoading(true);

    if (!site) {
      navigate(screens.dashboard);
      setLoading(false);

      return;
    }
    const res = await getData({ url: endPoints.getPages + site });
    if (res.status == 200) {
      if (!!res.data.pages.length) {
        setPages([...res.data.pages]);
        setTotalPages(res.data.totalPages || 0);
      } else {
        setPages([]);
        setTotalPages(0);
      }
    } else {
      setPages([]);
      setTotalPages(0);
      navigate(screens.dashboard);
    }
    setLoading(false);
  };

  const indexPages = async (ids = []) => {
    let payload = {
      domain_name: toFetchDomain,
      page_id: [...ids],
    };
    const res = await postData({ url: endPoints.indexPages, payload });
    if (res.status == 200 || res.status == 201) {
    } else {
    }
  };

  const fetchSitemaps = async (domain) => {
    const res = await getData({
      url: endPoints.getSiteMaps + `?domain_name=${domain}`,
    });
    if (res.status == 200 || res.status == 201) {
      setSitemaps(res?.data?.sitemaps || []);
    } else {
      setSitemaps([]);
    }
  };

  const fetchCredentials = async (domain) => {
    const res = await getData({
      url: endPoints.getCredentials + `?domain_name=${domain}`,
    });
    if (res.status == 200 || res.status == 201) {
      setSitemaps(res?.data?.credentials || []);
    } else {
      setSitemaps([]);
    }
  };

  return (
    <div className={styles.indexerContainer}>
      <div className={styles.indexerHeader}>
        <div className={styles.siteUrl}>{siteUrl}</div>
        <div className={styles.pageToggler}>
          <div
            className={`${styles.opt} ${activeTab == 1 && styles.active} ${
              disable && styles.disable
            }`}
            onClick={() => {
              if (!disable) setActiveTab(1);
            }}
          >
            Pages
          </div>
          <div
            className={`${styles.opt} ${activeTab == 2 && styles.active}`}
            onClick={() => {
              setActiveTab(2);
            }}
          >
            <SVGIcon src={"/assets/svg/settings.svg"} />
          </div>
        </div>
      </div>
      {activeTab == 1 && (
        <div className={styles.pagesWrapper}>
          <div className={styles.pageHeadRow}>
            <div className={styles.headCheckbox}></div>

            <div className={styles.headPage}>Page</div>
            <div className={styles.headStatus}>Status</div>
            <div className={styles.headCta}>Action</div>
          </div>
          {loading ? (
            <SkeletonRows />
          ) : !!pages?.length ? (
            <div className={styles.rowWrapper}>
              {pages.map((page, idx) => {
                return (
                  <PageRow
                    key={idx + 1}
                    page={page}
                    idx={idx}
                    indexPages={indexPages}
                  />
                );
              })}
            </div>
          ) : (
            <div className={styles.noPagesWrapper}>
              <div className={styles.emptyIcon}>
                <SVGIcon
                  src={"/assets/svg/emptyData.svg"}
                  size={80}
                  style={{ color: "inherit" }}
                />
              </div>
              No Pages Found
            </div>
          )}
        </div>
      )}
      {activeTab == 2 && (
        <div className={styles.settingWrapper}>
          <div className={styles.settingHeader}>Settings</div>
          <div className={`${styles.settingSection} ${styles.sectionSitemap}`}>
            <div className={styles.sectionHeader}>SiteMap</div>
            {!!sitemaps.length && (
              <div className={styles.siteMaps}>
                {sitemaps.map((sitemap) => {
                  return <div>{sitemap?.sitemap_url}</div>;
                })}
              </div>
            )}
            <div className={styles.inputWrapper}>
              <div style={{ width: "max-content" }}>Add SiteMap : </div>
              <div>
                <CustomTextField
                  label=""
                  placeholder={"Add Sitemap"}
                  errorMsg={errDomainName}
                  props={{
                    value: domainSitemap,
                    onChange: (e) => {
                      setDomainSitemap(e.target.value);
                    },
                  }}
                  disableUnderline
                />
              </div>
            </div>
          </div>
          <div className={`${styles.settingSection} ${styles.sectionSitemap}`}>
            <div className={styles.sectionHeader}>Credential</div>
            {!!credentials.length && (
              <div className={styles.siteMaps}>
                {credentials.map((creds) => {
                  return <div>{creds}</div>;
                })}
              </div>
            )}
            <div className={styles.inputWrapper}>
              <div style={{ width: "max-content" }}>Add Credential : </div>
              <div>
                <div className={styles.jsonInputWrapper}>
                  <input
                    type="file"
                    accept=".json"
                    onChange={() => {}}
                    className={styles.jsonInput}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.bottomCtas}>
        <Button
          text={"Back"}
          handler={() => {
            navigate(screens.dashboard);
          }}
          style={{
            background: "white",
            color: "var(--tertiary-color1)",
            border: "1px solid var(--tertiary-color1)",
            padding: "4px 20px",
          }}
        />
      </div>
    </div>
  );
};

export default IndexerDashboard;
