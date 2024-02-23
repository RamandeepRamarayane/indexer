import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Indexer.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { screens } from "../../screens";
import Button from "../../components/Button/Button";
import { getData, postData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { Checkbox, Skeleton, debounce, makeStyles } from "@mui/material";
import { removeDomain, trimDomainName } from "../../Utils/constants";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import { IndexerSettings } from "./IndexerSettings";
import Progress from "../../components/Progress/Progress";

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
              src={"/assets/svg/checkbox-filled.svg"}
              size={18}
              style={{ color: "var(--primary-color1)" }}
            />
          }
          icon={
            <SVGIcon
              src={"/assets/svg/checkbox-empty.svg"}
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

const IndexerDashboard = ({}) => {
  const [loading, setLoading] = useState(true);
  const [domain, setDomain] = useState("");
  const [logoSuccess, setLogoSuccess] = useState(true);
  const [fetchingPages, setFetchingPages] = useState(true);
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
  const [step, setStep] = useState(1);
  const [sitemaps, setSitemaps] = useState([]);
  const [credentials, setCredentials] = useState([]);
  const [pageDisable, setPageDisable] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [domainSitemap, setDomainSitemap] = useState("");
  const [file, setFile] = useState(null);
  const [syncStatu, setSyncStatus] = useState({ msg: "" });
  const [errDomainName, setErrDomainName] = useState("");
  const [errJson, setErrJson] = useState("");
  const [addCredential, setAddCredential] = useState("");
  const [domainInfo, setDomainInfo] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const domain_name = queryParams.get("domain_name");
    if (domain_name) {
      setLoading(true);
      setDomain(domain_name);
      getDomainInfo(domain_name);
    }
  }, []);

  useEffect(() => {
    if (step == 4) {
      setActiveTab(1);
      setPageDisable(false);
    } else {
      setActiveTab(2);
      setPageDisable(true);
    }
  }, [step]);

  useEffect(() => {
    if (!credentials.length) {
      setActiveTab(2);
      setStep(3);
    }
  }, [credentials]);

  console.log("debounceWrapper search", search);

  const debouncedSearch = useCallback(
    debounce((e) => {
      const val = e.target?.value?.trim();
      setSearch(val);
    }, 500),
    []
  );

  const getDomainInfo = async (site) => {
    setLoading(true);

    if (!site) {
      navigate(screens.dashboard);
      setLoading(false);
      setFetchingPages(false);
      return;
    }
    const res = await getData({ url: endPoints.getDomainInfo + site });
    if (res.status == 200) {
      // Set basic domainInfo
      setDomainInfo(res.data.result);
      setStep(
        res.data?.result?.hasOwnProperty("steps") ? res.data?.result?.steps : 1
      );
      if (res.data?.result?.steps == 4) {
        setActiveTab(1);
      }

      // fetch remaining data
      fetchPages(site);
      fetchSitemaps(site);
      fetchCredentials(site);
    } else {
      navigate(screens.dashboard);
    }
    setLoading(false);
  };

  const fetchPages = async (site) => {
    setFetchingPages(true);
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
    setFetchingPages(false);
  };

  const indexPages = async (ids = []) => {
    let payload = {
      domain_name: domain,
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
      setCredentials(res?.data?.credentials || []);
    } else {
      setCredentials([]);
    }
  };

  return loading ? (
    <Progress />
  ) : (
    <div className={styles.indexerContainer}>
      <div className={styles.indexerHeader}>
        {!!domain.length && (
          <div className={styles.siteUrl}>
            <div className={styles.domainLogo}>
              {logoSuccess ? (
                <img
                  src={`https://s2.googleusercontent.com/s2/favicons?domain=${trimDomainName(
                    domain
                  )}&sz=32`}
                  width={"22px"}
                  onError={() => {
                    setLogoSuccess(false);
                  }}
                />
              ) : (
                <SVGIcon src={"/assets/svg/globe.svg"} size={18} />
              )}
            </div>

            {trimDomainName(domain)}
          </div>
        )}
        <div className={styles.pageToggler}>
          <div
            className={`${styles.opt} ${activeTab == 1 && styles.active} ${
              pageDisable && styles.disable
            }`}
            onClick={() => {
              if (!pageDisable) setActiveTab(1);
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
        <>
          <div className={styles.pagesHeader}>
            <div>Title</div>
            <div className={styles.filterWrapper}>
              <CustomTextField
                props={{
                  onChange: (e) => debouncedSearch(e),
                }}
                placeholder="Search Page"
                label=""
                disableUnderline
              />
            </div>
          </div>
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
        </>
      )}
      {activeTab == 2 && (
        <div className={styles.settingWrapper}>
          <div className={styles.settingHeader}>Settings</div>
          <IndexerSettings
            sectionName={"Sitemaps"}
            arr={sitemaps}
            input={domainSitemap}
            setInput={setDomainSitemap}
            errDomainName={errDomainName}
            domain={domain}
            fetchLatest={fetchSitemaps}
            fetchPages={fetchPages}
          />
          <IndexerSettings
            sectionName={"Credential"}
            arr={credentials}
            input={file}
            setInput={setFile}
            errDomainName={errDomainName}
            isJson={true}
            domain={domain}
            fetchLatest={fetchCredentials}
            fetchPages={fetchPages}
          />
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
