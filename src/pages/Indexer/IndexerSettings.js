import React, { useState } from "react";
import styles from "./Indexer.module.css";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { postData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import useCombinedStore from "../../zustore/combinedStore";
import Button from "../../components/Button/Button";
export const IndexerSettings = ({
  sectionName = "",
  arr = [],
  input,
  setInput,
  errDomainName = "",
  isJson = false,
  domain,
}) => {
  const [syncStatu, setSyncStatus] = useState({ msg: "" });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { userInfo } = useCombinedStore((state) => state);
  const [errJson, setErrJson] = useState("");

  const addSiteMap = async () => {
    setLoading(true);
    setSyncStatus({ msg: "Updating Site Map" });
    const res = await postData({
      url: endPoints.addSiteMap,
      payload: {
        domain_name: domain,
        sitemap_urls: [input],
      },
    });
    if (res.status == 201) {
      if (input.length > 0) {
        setSyncStatus({ msg: "Syncing Site Map" });

        let payload = {
          domain_name: domain,
          sitemap_url: input,
        };
        const syncing = await postData({
          url: endPoints.syncSiteMap,
          payload: {
            ...payload,
          },
        });
        if (syncing.status == 200 || syncing.status == 201) {
          setSyncStatus({ msg: "Adding Pages" });
          const addingPages = await postData({
            url: endPoints.addPages,
            payload: {
              ...payload,
              user_id: userInfo.id,
              pages: syncing?.data?.urls?.newSiteMaps || [],
            },
          });
        }
      }
      setSyncStatus({ msg: "Completed Successfully" });
      setTimeout(() => {
        setLoading(false);
        setSyncStatus({ msg: "" });
      }, 2000);
    } else {
      setLoading(false);
    }
  };

  const handleReadFile = (_file) => {
    if (_file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          console.log("s jsonData", jsonData);
          setInput(jsonData);
        } catch (error) {
          setErrJson("Error reading JSON file. Please make sure it is valid.");
          setInput({});
          setFile(null);
        }
      };

      reader.readAsText(_file);
    } else {
      alert("Please upload a JSON file first.");
      setInput({});
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
            {arr.map((sitemap) => {
              return (
                <div className={styles.sitemapRow}>
                  {sitemap?.sitemap_url}
                  <div></div>
                </div>
              );
            })}
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
                  onChange={() => {}}
                  className={styles.jsonInput}
                />{" "}
              </div>
            ) : (
              <div
                className={`${styles.inputWrapper} ${
                  !!input.length && styles.hasData
                }`}
              >
                <CustomTextField
                  label=""
                  placeholder={"Add Sitemap"}
                  errorMsg={errDomainName}
                  props={{
                    value: input,
                    onChange: (e) => {
                      setInput(e.target.value);
                    },
                  }}
                  disableUnderline
                />
                <Button
                  text={"Add"}
                  handler={handleFileChange}
                  disabled={!input.length}
                  height={28}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
