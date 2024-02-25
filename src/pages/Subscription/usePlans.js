import React, { Suspense, useEffect, useState } from "react";
import { getCurrencySign } from "./constants";
import { getData, postData } from "../../networkCalls";
import { endPoints } from "../../endPoints";
import { useNavigate } from "react-router-dom";
import { screens } from "../../screens";

const paymentPopUpDimension = `left=${window.outerWidth / 2 - 300},top=${
  window.outerHeight / 2 - 300
},width=${window.screen.width / 3},height=${window.screen.height / 1.5}`;

const styleTransactionInitiatingDocument = (doc) => {
  doc.write(
    `<html><head></head><body>
        <div style="display:flex;justify-content:center;align-items:center;height:70%">
        <br />
      <h2 style={{ color: "var(--secondary-color1)", fontWeight: 600 }}>
        Transaction is in progress...
      </h2></div>
        </body></html>`
  );
  doc.title = "Transaction is initiating...";
};

const PLAN_CATEGORY = {
  TRIAL: "83a7375f-c8b0-11ee-be08-0e6287f46173",
  LTD: "841b6ea9-c8b0-11ee-be08-0e6287f46173",
};

const usePlans = ({}) => {
  const [loading, setLoading] = useState(true);
  const [userPlan, setUserPlan] = useState({});
  const [allPlans, setAllPlans] = useState([]);
  const navigate = useNavigate();
  const [fetchingActivePlan, setFetchingActivePlan] = useState(true);
  useEffect(() => {
    fetchUserPlan();
  }, []);

  const fetchUserPlan = async () => {
    setFetchingActivePlan(true);
    const res = await getData({ url: endPoints.fetchUserPlan });
    if (res.status == 200) {
      setUserPlan({ ...res.data.userPlan });
    } else {
    }
    setFetchingActivePlan(false);
    fetchPlans();
  };

  const fetchPlans = async () => {
    setLoading(true);

    const res = await getData({ url: endPoints.fetchPlans });
    if (res.status == 200) {
      setAllPlans([...res.data?.data.plans]);
    } else {
    }
    setLoading(false);
  };

  const initiatePayment = async (planId) => {
    document.StripeInvoicePayment = window.open(
      "",
      "_self",
      paymentPopUpDimension
    );

    styleTransactionInitiatingDocument(document.StripeInvoicePayment.document);
    let baseURL = window.location.origin;
    let successUrl = `${baseURL}/transaction?session_id={CHECKOUT_SESSION_ID}`;
    let cancelUrl = `${baseURL}/transaction?failed=1`;
    const res = await postData({
      url: endPoints.payment,
      payload: {
        planId: planId,
        successUrl,
        cancelUrl,
      },
    });
    if (res.status == 200) {
      document.StripeInvoicePayment.location = res.data.data.checkoutUrl;
      navigate(screens.transaction);
    } else {
      setLoading(false);
    }
  };

  const getPlan = (cat) => {
    console.log(allPlans);
    let plan = {};
    if (!!allPlans.length) {
      let filtered = allPlans.filter((pln) => pln.plan_id == cat);
      if (!!filtered.length) {
        plan = filtered[0];
      }
    }
    return plan;
  };

  const plans = (() => {
    const freePlan = getPlan(PLAN_CATEGORY.TRIAL);
    const LtdPlan = getPlan(PLAN_CATEGORY.LTD);
    let _temp = [];
    if (freePlan?.plan_id == userPlan?.plan_id) {
      _temp.push({
        name: freePlan?.plan_name,
        features: [
          "Use on 2 Websites",
          "100 URLs per website",
          "50 URLs Index per Day per website",
          "Automated URLs fetch from sitemap",
        ],
        plan_id: freePlan?.plan_id,

        description: <>Explore Fearlessly</>,
        additionalPages: "100",
        priceView: "Free",
        ctaBorder: "var(--tertiary-color1)",
        ctaBg: "var(--tertiary-color1)",
        ctaColor: "white",
        ctaText: "Current Plan",
        ctaHandler: () => {},
        ctaLoading: loading,
        border: "1px solid var(--secondary-color1)",
        bg: "var(--secondary-color1-op01)",
        primaryColor: "var(--secondary-color1)",
        secondaryColor: "var(--tertiary-color1)",
        plan_category: LtdPlan?.type,
        isDisabled: true,
      });
    }
    _temp.push({
      name: LtdPlan?.plan_name,
      features: [
        "Use on 10 Websites",
        "Unlimited URLs per website",
        "200 URLs Index per Day per website",
        "Automated URLs fetch from sitemap",
        "Access to future updates (Check RoadMap)",
        "Customer Support Over Email & Dedicated facebook group",
      ],
      description: <>All your needs</>,
      ctaLoading: loading,

      priceView: getCurrencySign(LtdPlan?.currency) + LtdPlan?.price,
      ctaBorder: "var(--primary-color1)",
      ctaBg: "var(--primary-color1)",
      ctaColor: "#fff",
      ctaText:
        userPlan.plan_id == LtdPlan?.plan_id ? "Current Plan" : "Upgrade",
      ctaHandler: () => initiatePayment(LtdPlan?.plan_id),
      plan_id: LtdPlan?.plan_id,
      plan_category: LtdPlan?.type,
      border: "1px solid var(--primary-color1)",
      bg: "var(--primary-color1-op01)",
      primaryColor: "var(--primary-color1)",
      secondaryColor: "var(--tertiary-color1)",
      isDisabled: userPlan.plan_id == LtdPlan?.plan_id ? true : false,
    });

    return _temp;
  })();
  return { plans, fetchingActivePlan, userPlan };
};

export default usePlans;
