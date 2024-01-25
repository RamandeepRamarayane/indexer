import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import App from "./App";
import ErrorPage from "./ErrorPage";
import Login from "./pages/Auth/Login";
import SingUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/" element={<App />}>
//         <Route path="" element={<Navigate to={"dashboard"} replace />} />
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="auth" element={<Auth />}>
//           <Route path="login" element={<Login />} />
//           <Route path="signup" element={<SingUp />} />
//         </Route>
//       </Route>

//       <Route
//         path="*"
//         element={
//           <Navigate to="/" state={{ from: window.location.pathname }} replace />
//         }
//       />
//     </>
//   )
// );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
