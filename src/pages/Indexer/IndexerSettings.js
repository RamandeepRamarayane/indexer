import React from "react";
import styles from "./Indexer.module.css";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
export const IndexerSettings = ({
  sectionName = "",
  arr = [],
  input,
  setInput,
  errDomainName = "",
  isJson = false,
}) => {
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
        <div className={styles.inputWrapper}>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};
