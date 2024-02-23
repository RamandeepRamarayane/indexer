import React from "react";
import styles from "./styles.module.css";
import PriceCard from "./PriceCard";
import { PLANS } from "./constants";
import usePlans from "./usePlans";

const Subscriptions = () => {
  const { plans } = usePlans({});
  return (
    <div className={styles.subsContainer}>
      <div className={styles.header}>Plans</div>
      <div className={styles.priceCardsContainer}>
        {!!plans?.length &&
          plans.map((plan) => {
            return <PriceCard key={plan.plan_id} plan={plan} />;
          })}
      </div>
    </div>
  );
};

export default Subscriptions;
