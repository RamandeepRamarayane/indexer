import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import ConnectedSites from "./ConnectedSites";
import { AddWebsiteFlow } from "./AddWebsiteFlow";
import { getData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import useCombinedStore from "../../zustore/combinedStore";

const Dashboard = () => {
  const [addWSModal, setAddWSModal] = useState(false);
  const [fetchedDomains, setFetchedDomains] = useState([
    {
      id: 2,
      user_id: 3,
      domain_name: "https://bulkindexer.net",
      is_deleted: 0,
      created_at: "2024-02-14T10:35:13.000Z",
      updated_at: "2024-02-14T10:35:13.000Z",
    },
  ]);

  const [loading, setLoading] = useState(true);

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
    } else {
      setFetchedDomains([]);
    }
    setLoading(false);
  };
  return (
    <div style={{ width: "100%" }}>
      <div className={styles.dashboardHeader}>
        <Button
          text={"Add a Website"}
          handler={() => {
            setAddWSModal(true);
          }}
          style={{ background: "var(--secondary-color1)" }}
        />
      </div>
      <ConnectedSites
        fetchedDomains={fetchedDomains}
        setFetchedDomains={setFetchedDomains}
        loading={loading}
        setLoading={setLoading}
      />
      {addWSModal && (
        <Modal
          setModal={() => {
            setAddWSModal(false);
          }}
        >
          <AddWebsiteFlow
            modal={addWSModal}
            setModal={setAddWSModal}
            setFetchedDomains={setFetchedDomains}
          />
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
