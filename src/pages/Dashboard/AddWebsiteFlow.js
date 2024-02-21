import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./Dashboard.module.css";
import SVGIcon from "../../components/SVGIcon/SVGIcon";
import { postData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import CustomTextField from "../../components/CustomTextField/CustomTextField";
import { isValidDomain, TEMP_CREDS } from "../../Utils/constants";
import useCombinedStore from "../../zustore/combinedStore";

export const AddWebsiteFlow = ({
  modal,
  setModal = () => {},
  fetchDomains = () => {},
}) => {
  const { userInfo } = useCombinedStore((state) => state);
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [domainName, setDomainName] = useState("https://bulkindexer.net");
  const [domainSitemaps, setDomainSitemaps] = useState([
    "https://bulkindexer.net/post-sitemap.xml",
  ]);
  const [syncStatu, setSyncStatus] = useState({ msg: "" });
  const [loading, setLoading] = useState(false);
  const [errDomainName, setErrDomainName] = useState("");
  const [errJson, setErrJson] = useState("");
  const [credentials, setCredentials] = useState("");
  useEffect(() => {
    return () => {
      fetchDomains();
    };
  }, []);

  const initiateDomainSync = async ({ siteMap }) => {
    let payload = {
      domain_name: domainName,
      sitemap_url: siteMap,
    };
    const syncing = await postData({
      url: endPoints.syncSiteMap,
      payload: {
        ...payload,
      },
    });
    if (syncing.status == 200 || syncing.status == 201) {
      return true;
    } else {
      return false;
    }
  };

  const addDomain = async (domainName) => {
    setLoading(true);
    let err = isValidDomain(domainName);
    if (err?.length) {
      setErrDomainName(err);
      setLoading(false);

      return;
    } else {
      setErrDomainName("");
      const res = await postData({
        url: endPoints.addDomains,
        payload: { domain_name: domainName },
      });
      if (res.status == 201) {
        setStep(2);
        setLoading(false);
      }
      setLoading(false);
    }
  };

  const addSiteMap = async () => {
    setLoading(true);
    const res = await postData({
      url: endPoints.addSiteMap,
      payload: {
        domain_name: domainName,
        sitemap_urls: [...domainSitemaps],
      },
    });
    if (res.status == 201) {
      if (domainSitemaps.length > 0) {
        for (let siteMap = 0; siteMap < domainSitemaps.length; siteMap++) {
          const syncStatus = await initiateDomainSync({
            siteMap: domainSitemaps[siteMap],
          });
        }
      }
      setLoading(false);
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
          setCredentials(jsonData);
        } catch (error) {
          setErrJson("Error reading JSON file. Please make sure it is valid.");
          setCredentials({});
          setFile(null);
        }
      };

      reader.readAsText(_file);
    } else {
      alert("Please upload a JSON file first.");
      setCredentials({});
      setFile(null);
    }
  };

  const addCredential = async () => {
    setLoading(true);
    const credentials = { ...TEMP_CREDS };
    const res = await postData({
      url: endPoints.addCredentials,
      payload: { domain_name: domainName, credentials },
    });
    if (res.status == 201 || res.status == 200) {
      setLoading(false);
      setModal(false);
    } else {
      setLoading(false);
      setModal(false);
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
    <div className={styles.addWSModalWrapper}>
      <div
        className={styles.closeCta}
        onClick={(e) => {
          e.stopPropagation();
          setModal(false);
        }}
      >
        <SVGIcon src={"/assets/svg/cross-outline.svg"} />
      </div>
      <div className={styles.progressBars}>
        <div
          className={`${styles.pBar1} ${step == 1 && styles.active} ${
            step > 1 && styles.done
          }`}
        ></div>
        <div
          className={`${styles.pBar2} ${step == 2 && styles.active} ${
            step > 2 && styles.done
          }`}
        ></div>
        <div
          className={`${styles.pBar3} ${step == 3 && styles.active} ${
            step > 3 && styles.done
          }`}
        ></div>
      </div>
      <div className={styles.wsModal_title}>Add a Website</div>
      <div className={styles.instruction_line1}>
        {step == 1
          ? "Add Domain Name"
          : step == 2
          ? "Add Sitemap"
          : "Please add  Credentials (.json) file"}
      </div>
      <div className={styles.inputs}>
        {step == 1 ? (
          <CustomTextField
            label=""
            placeholder={"Domain Name"}
            errorMsg={errDomainName}
            props={{
              value: domainName,
              onChange: (e) => {
                setDomainName(e.target.value);
              },
              onBlur: (e) => {
                setErrDomainName(isValidDomain(e.target.value) || "");
              },
            }}
            disableUnderline
          />
        ) : step == 2 ? (
          <CustomTextField
            label=""
            placeholder={"Add Sitemap"}
            errorMsg={errDomainName}
            props={{
              value: domainSitemaps[0],
              onChange: (e) => {
                setDomainSitemaps([e.target.value]);
              },
            }}
            disableUnderline
          />
        ) : (
          // read JSON
          <div className={styles.jsonInputWrapper}>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className={styles.jsonInput}
            />
          </div>
        )}
        {step == 2 && !!syncStatu?.msg?.length && (
          <div className={styles.syncStatusText}>
            Syncing Status : {syncStatu.msg}
          </div>
        )}
      </div>

      <div className={styles.bottomCta}>
        <Button
          text={step == 1 ? "Cancel" : "Back"}
          handler={() => {
            step == 1
              ? setModal(false)
              : setStep((ps) => (ps == 1 ? 1 : ps - 1));
          }}
          style={{
            background: "white",
            color: "var(--secondary-color1)",
          }}
        />
        {step != 3 ? (
          <Button
            text={"Add"}
            handler={() => {
              step == 1 ? addDomain(domainName) : addSiteMap();
            }}
            style={{
              background: "var(--primary-color1)",
              color: "white",
              padding: "5px 20px",
            }}
            loading={loading}
            disabled={!!errDomainName}
          />
        ) : (
          <Button
            text={"Validate"}
            handler={() => {
              addCredential();
            }}
            style={{
              background: "var(--primary-color1)",
              color: "white",
              padding: "5px 20px",
            }}
            loading={loading}
            disabled={!credentials?.hasOwnProperty("project_id")}
          />
        )}
      </div>
    </div>
  );
};
