import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "40vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h2 style={{ fontSize: "40px", fontWeight: 500 }}>
          404 : Page Not Found
        </h2>
        {/* <p>
          <i>{error.statusText || error.message}</i>
        </p> */}
      </div>
    </div>
  );
};

export default ErrorPage;
