import React, { useState } from "react";
import { getCurrencySign } from "./constants";
import { postData } from "../../networkCalls";
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

const usePlans = ({}) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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

  const plans = (() => {
    return [
      {
        name: "Trial Plan",
        features: [
          "Use on 2 Websites",
          "100 URLs per website",
          "50 URLs Index per Day per website",
          "Automated URLs fetch from sitemap",
        ],
        plan_id: "841b6ea9-c8b0-11ee-be08-0e6287f46173",
        description: <>Explore Fearlessly</>,
        additionalPages: "100",
        priceView: "Free",
        ctaBorder: "var(--tertiary-color1)",
        ctaBg: "var(--tertiary-color1)",
        ctaColor: "white",
        ctaText: "Current Plan",
        ctaHandler: () => {},
        ctaDisabled: true,
        ctaLoading: loading,
        border: "1px solid var(--secondary-color1)",
        bg: "var(--secondary-color1-op01)",
        primaryColor: "var(--secondary-color1)",
        secondaryColor: "var(--tertiary-color1)",
      },
      {
        name: "Life Time Deal",
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

        priceView: getCurrencySign("inr") + 200,
        ctaBorder: "var(--primary-color1)",
        ctaBg: "var(--primary-color1)",
        ctaColor: "#fff",
        ctaText: "Upgrade",
        ctaHandler: () =>
          initiatePayment("841b6ea9-c8b0-11ee-be08-0e6287f46173"),
        currentPlan: false,
        plan_id: "841b6ea9-c8b0-11ee-be08-0e6287f46173",
        plan_category: 2,
        border: "1px solid var(--primary-color1)",
        bg: "var(--primary-color1-op01)",
        primaryColor: "var(--primary-color1)",
        secondaryColor: "var(--tertiary-color1)",
      },
    ];
  })();
  return { plans };
};

export default usePlans;
