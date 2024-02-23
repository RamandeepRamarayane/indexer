import React, { useState } from "react";
import styles from "./Indexer.module.css";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { getData, postData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import useCombinedStore from "../../zustore/combinedStore";
import Button from "../../components/Button/Button";
import { TEMP_CREDS } from "../../Utils/constants";

const ItemRow = ({
  item = {},
  isJson = false,
  initiateDomainSync = () => {},
  removeItem = () => {},
}) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  return (
    <tr className={styles.itemRowWrapper}>
      <td>
        <div className={styles.itemName}>
          {isJson ? item?.file_name : item?.sitemap_url}
        </div>
      </td>
      <td className={styles.rowCtas}>
        <div className={styles.ctaWrapper}>
          {!isJson && (
            <Button
              text={""}
              handler={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSyncing(true);
                initiateDomainSync(
                  { siteMap: item?.sitemap_url },
                  setIsSyncing
                );
              }}
              height={28}
              width={28}
              loading={isSyncing}
              Icon={() => <SVGIcon src={"/assets/svg/sync.svg"} size={16} />}
              style={{
                color: "var(--secondary-color1)",
                background: "white",
                border: "1px solid var(--secondary-color1)",
              }}
            />
          )}
          <Button
            text={""}
            handler={(e) => {
              e.preventDefault();
              e.stopPropagation();
              //  delete sitemap
              setIsRemoving(true);
              removeItem(
                isJson ? { fileName: item?.file_name } : { siteMap: item?.id },
                setIsRemoving
              );
            }}
            loading={isRemoving}
            height={28}
            width={28}
            Icon={() => <SVGIcon src={"/assets/svg/deleteBin.svg"} size={24} />}
            style={{
              color: "var(--secondary-color2)",
              background: "white",
              border: "1px solid var(--secondary-color2)",
            }}
          />
        </div>
      </td>
    </tr>
  );
};
export const IndexerSettings = ({
  sectionName = "",
  arr = [],
  errDomainName = "",
  isJson = false,
  domain,
  fetchLatest = () => {},
  fetchPages = () => {},
}) => {
  const [syncStatus, setSyncStatus] = useState({ msg: "" });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [creds, setCreds] = useState({});
  const [siteMap, setSiteMap] = useState("");
  const { userInfo } = useCombinedStore((state) => state);
  const [errJson, setErrJson] = useState("");

  const initiateDomainSync = async ({ siteMap }, setLoad = () => {}) => {
    setSyncStatus({ msg: "Syncing..." });
    setLoad(true);
    let payload = {
      domain_name: domain,
      sitemap_url: siteMap,
    };
    const syncing = await postData({
      url: endPoints.syncSiteMap,
      payload: {
        ...payload,
      },
    });
    if (syncing.status == 200 || syncing.status == 201) {
      setSyncStatus({
        msg: "Success: Pages Added Successfully",
      });
      setLoad(false);

      return true;
    } else {
      setSyncStatus({ msg: "Failed : Sitemap not synced" });
      setLoad(false);

      return false;
    }
  };

  const addSiteMap = async () => {
    setLoading(true);
    const res = await postData({
      url: endPoints.addSiteMap,
      payload: {
        domain_name: domain,
        sitemap_urls: [siteMap],
      },
    });
    if (res.status == 201) {
      //fetch SiteMaps
      fetchLatest(domain);
      setLoading(false);
      setSiteMap("");
    } else {
      setLoading(false);
      setSiteMap("");
    }
  };

  const handleReadFile = (_file) => {
    if (_file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          console.log("s jsonData", jsonData);
          setCreds(jsonData);
        } catch (error) {
          setErrJson("Error reading JSON file. Please make sure it is valid.");
          setCreds(null);
          setFile(null);
        }
      };

      reader.readAsText(_file);
    } else {
      alert("Please upload a JSON file first.");
      setFile(null);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);
      handleReadFile(selectedFile);
    } else {
      alert("Please upload a valid JSON file.");
      setFile(null);
    }
  };

  const addCredential = async () => {
    setLoading(true);
    const credentials = { ...TEMP_CREDS };
    const res = await postData({
      url: endPoints.addCredentials,
      payload: { domain_name: domain, credentials },
    });
    if (res.status == 201 || res.status == 200) {
      setLoading(false);
      //fetch Credentials
      fetchLatest(domain);
      fetchPages(domain);
    } else {
      setLoading(false);
    }
  };

  const removeItem = async (
    { fileName = null, siteMap = null },
    setLoad = () => {}
  ) => {
    if (!fileName && !siteMap) {
      return;
    }

    if (fileName) {
      const res = await getData({
        url: `${endPoints.deleteCredentials}?domain_name=${domain}&file_name=${fileName}`,
      });
      if (res.status == 200) {
        fetchLatest(domain);
        setLoad(false);
      } else {
      }
    } else {
      setTimeout(() => {
        setLoad(false);
      }, 1000);
    }
  };

  return (
    <>
      <div className={`${styles.settingSection} ${styles.sectionSitemap}`}>
        <div className={styles.sectionHeader}>
          <SVGIcon
            src={"/assets/svg/leftIndent.svg"}
            style={{ color: "inherit" }}
            size={24}
          />
          {sectionName}
        </div>
        {!!arr.length ? (
          <div className={styles.siteMaps}>
            <table>
              <thead>
                <tr>
                  <th>{isJson ? "Credential" : "Sitemap"}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {arr.map((itm) => {
                  return (
                    <ItemRow
                      item={itm}
                      isJson={isJson}
                      initiateDomainSync={initiateDomainSync}
                      removeItem={removeItem}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.siteMapsEmpty}>No {sectionName} found</div>
        )}
        <div className={styles.inputs}>
          <div style={{ width: "max-content" }}>
            {isJson ? "Add Credential" : "Add SiteMap"} :{" "}
          </div>
          <div>
            {isJson ? (
              <div className={styles.jsonInputWrapper}>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileChange}
                  className={styles.jsonInput}
                />
                <Button
                  text={"Validate"}
                  handler={addCredential}
                  disabled={!file}
                  height={28}
                  loading={loading}
                />
              </div>
            ) : (
              <div className={styles.siteMapInputWrapper}>
                <div
                  className={`${styles.inputWrapper} ${
                    !!siteMap.length && styles.hasData
                  }`}
                >
                  <CustomTextField
                    label=""
                    placeholder={"Add Sitemap"}
                    errorMsg={errDomainName}
                    props={{
                      value: siteMap,
                      onChange: (e) => {
                        setSiteMap(e.target.value);
                      },
                    }}
                    disableUnderline
                  />
                  <Button
                    text={"Add"}
                    handler={addSiteMap}
                    disabled={!siteMap.length}
                    height={28}
                    loading={loading}
                  />
                </div>
                {!!syncStatus?.msg?.length && (
                  <div className={styles.syncStatusText}>
                    Sync Status :{syncStatus.msg}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
