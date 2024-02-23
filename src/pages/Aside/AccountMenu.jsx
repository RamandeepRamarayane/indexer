import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./aside.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import useCombinedStore from "../../zustore/combinedStore";
import { IoMdLogOut } from "react-icons/io";

function AccountMenu() {
  const pic = null;
  const userName = null;
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { logoutRequest, userInfo } = useCombinedStore((state) => state);

  return (
    <div
      className={styles.accountMenuWrapper}
      // onClick={() => {
      //   navigate(screens.account);
      // }}
    >
      <FaRegUserCircle size={28} style={{ color: "var(--primary-color1)" }} />

      <div className={styles.title}>
        {userInfo?.name} :{" "}
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            logoutRequest();
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IoMdLogOut size={20} />
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ item }) => {
  return (
    <Link to={item.link}>
      {item.icon}
      {item.title}
    </Link>
  );
};

export default AccountMenu;
