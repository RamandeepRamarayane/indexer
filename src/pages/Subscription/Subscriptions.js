import React from "react";
import styles from "./styles.module.css";
import PriceCard from "./PriceCard";
import { PLANS } from "./constants";
import usePlans from "./usePlans";
import Progress from "../../components/Progress/Progress";

const Subscriptions = () => {
  const { plans, fetchingActivePlan } = usePlans({});
  return fetchingActivePlan ? (
    <Progress />
  ) : (
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
