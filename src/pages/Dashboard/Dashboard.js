import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Button from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import ConnectedSites from "./ConnectedSites";
import { AddWebsiteFlow } from "./AddWebsiteFlow";
import { getData, postData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import useCombinedStore from "../../zustore/combinedStore";
import usePlans from "../Subscription/usePlans";
import { CustomTooltip } from "../../components/Tooltip/CustomTooltip";

const Dashboard = () => {
  const { userPlan } = usePlans({});
  const [addWSModal, setAddWSModal] = useState(false);
  const [overview, setOverview] = useState({});
  const [deleteDomain, setDeleteDomain] = useState({ isShow: false, obj: {} });
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
    fetchOverview();
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

  const fetchOverview = async () => {
    const res = await getData({ url: endPoints.overview });
    if (res.status == 200) {
      setOverview(res.data);
    } else {
      setOverview({});
    }
  };
  const deleteModal = async (domainName) => {
    setLoading(true);
    const res = await postData({
      url: endPoints.deleteDomains,
      payload: { domain_name: domainName },
    });
    if (res.status == 200 || res.status == 201) {
      fetchDomains();
    } else {
    }
    setLoading(false);
    setDeleteDomain({ isShow: false, obj: {} });
  };
  return (
    <div style={{ width: "100%" }}>
      <div className={styles.dashboardHeader}>
        <div className={styles.overviewWrapper}>
          <div className={styles.overviewCard}>
            <div className={styles.cardTitle}>Connected Domains</div>
            <div className={styles.cardValue}>
              {overview?.totalDomains || 0}
            </div>
          </div>
          <div className={styles.overviewCard}>
            <div className={styles.cardTitle}>Total Pages</div>
            <div className={styles.cardValue}>{overview?.totalPages || 0}</div>
          </div>
        </div>
        <CustomTooltip
          title={
            userPlan?.available_domains == fetchedDomains?.length
              ? "Max Limit Reached"
              : null
          }
          arrow
        >
          <div>
            <Button
              text={`Add a Website : (${fetchedDomains?.length || 0}/${
                userPlan?.available_domains || 0
              })`}
              handler={() => {
                setAddWSModal(true);
              }}
              width={180}
              loading={loading}
              disabled={userPlan?.available_domains == fetchedDomains?.length}
            />
          </div>
        </CustomTooltip>
      </div>
      <ConnectedSites
        fetchedDomains={fetchedDomains}
        setFetchedDomains={setFetchedDomains}
        loading={loading}
        setLoading={setLoading}
        setDeleteDomain={setDeleteDomain}
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
            fetchDomains={fetchDomains}
          />
        </Modal>
      )}
      {deleteDomain.isShow && (
        <Modal
          setModal={() => {
            setAddWSModal(false);
          }}
        >
          <div className={styles.deleteModalWrap}>
            <div className={styles.title}>Are you sure ?</div>
            <div className={styles.info}>
              Deleting will remove {deleteDomain.obj.domain_name}{" "}
            </div>
            <div className={styles.deleteModalCtas}>
              <Button
                text={"Cancel"}
                handler={() => {
                  setDeleteDomain({ isShow: false, obj: {} });
                }}
                style={{
                  background: "white",
                  color: "var(--secondary-color1)",
                }}
                loading={loading}
              />
              <Button
                text={"Confirm"}
                handler={() => {
                  deleteModal(deleteDomain.obj.domain_name);
                }}
                style={{
                  background: "var(--secondary-color2)",
                }}
                loading={loading}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;
