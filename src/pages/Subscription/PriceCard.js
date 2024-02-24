import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getCurrencySign } from "./constants";
import Button from "../../components/Button/Button";
import SVGIcon from "../../components/SVGIcon/SVGIcon";

const PriceCard = ({ plan = {} }) => {
  const initiatePayment = () => {};

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!plan?.ctaLoading) {
      setLoading(false);
    }
  }, [plan?.ctaLoading]);

  return (
    <div
      className={styles.priceCard}
      style={{ border: plan?.border, background: plan?.bg }}
    >
      <div className={styles.planTitle} style={{ color: plan?.primaryColor }}>
        {plan?.name}
      </div>
      <div className={styles.priceWrapper}>
        <div className={styles.price}>{plan?.priceView}</div>
      </div>
      <div className={styles.description}>{plan?.description}</div>
      <div className={styles.ctaWrapper}>
        <Button
          text={plan?.ctaText}
          style={{
            border: plan?.ctaBorder,
            backgroundColor: plan?.ctaBg,
            color: plan?.ctaColor,
          }}
          handler={() => {
            typeof plan?.ctaLoading === "boolean" && setLoading(true);
            plan?.ctaHandler();
          }}
          loading={loading}
          disabled={plan?.isDisabled}
          width={"100%"}
        />
      </div>
      <div className={styles.features}>
        {plan?.features?.map((feat) => {
          return (
            <div className={styles.featureWrap}>
              <SVGIcon
                src={"/assets/svg/check-outline-single.svg"}
                style={{ color: "var(--primary-color1)" }}
              />
              {feat}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceCard;
