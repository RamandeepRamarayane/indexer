import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { screens } from "../../screens";
import { CustomAlertMessageEvent } from "../../components/CustomAlertMessages/CustomAlerts";
import SVGIcon from "../../components/SVGIcon/SVGIcon";

function TransactionInProgress() {
  const session_id = new URLSearchParams(window.location.search).get(
    "session_id"
  );
  const failed = new URLSearchParams(window.location.search).get("failed");

  const navigate = useNavigate();

  const redirectToPlans = useCallback(() => {
    navigate(screens.plans, { replace: true });
  }, [navigate]);

  useEffect(() => {
    const updateUser = () => {
      navigate(screens.dashboard, { replace: true });
      document?.StripeInvoicePayment?.close();
    };
    debugger;

    if (session_id) {
      debugger;
      var timeout = setTimeout(() => {
        document.dispatchEvent(
          CustomAlertMessageEvent({
            duration: 3000,
            type: "success",
            open: true,
            message: "Payment Successful",
          })
        );
        navigate(screens.dashboard, { replace: true });
      }, 3000);
    } else if (document.StripeInvoicePayment) {
      debugger;

      var interval = setInterval(() => {
        if (document.StripeInvoicePayment?.closed) {
          navigate(screens.dashboard, { replace: true });
          document.StripeInvoicePayment = null;
        }
      }, 5000);
    } else if (failed) {
      debugger;

      document.dispatchEvent(
        CustomAlertMessageEvent({
          duration: 3000,
          type: "warning",
          open: true,
          message: "Transaction Failed",
        })
      );
      redirectToPlans();
    } else {
      navigate(screens.dashboard, { replace: true });
    }
  }, [navigate, redirectToPlans, failed, session_id]);

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <br />
      <h2 style={{ color: "var(--secondary-color1)", fontWeight: 600 }}>
        Transaction is in progress...
      </h2>
    </div>
  );
}

export default TransactionInProgress;
