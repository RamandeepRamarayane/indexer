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
        {idx + 1}

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
  const [totalPages, setTotalPages] = useState(0);
  const { siteUrl } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchPages(toFetchDomain);
  }, []);

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
        setPages([
          ...res.data.pages,
          ...res.data.pages,
          ...res.data.pages,
          ...res.data.pages,
          ,
          ...res.data.pages,
          ,
          ...res.data.pages,
          ,
          ...res.data.pages,
        ]);
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
    let paylaod = {
      domain_name: toFetchDomain,
      page_id: [...ids],
    };
    const res = await postData({ url: endPoints.indexPages, paylaod });
    if (res.status == 200 || res.status == 201) {
    } else {
    }
  };

  return (
    <div className={styles.indexerContainer}>
      <div className={styles.indexerHeader}>{siteUrl}</div>
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
