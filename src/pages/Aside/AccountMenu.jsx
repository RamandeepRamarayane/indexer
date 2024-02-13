import React, { useState } from "react";
import { accountMenuItems } from "./data";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import styles from "./aside.module.css";
import { screens } from "../../screens";
import { FaRegUserCircle } from "react-icons/fa";
import useCombinedStore from "../../zustore/combinedStore";
import { BiLogOutCircle } from "react-icons/bi";
import Button from "../../components/Button/Button";

function AccountMenu() {
  const pic = null;
  const userName = null;
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { logoutRequest, userInfo } = useCombinedStore((state) => state);

  return (
    <div
      className={styles.accountMenuWrapper}
      onClick={() => {
        navigate(screens.account);
      }}
    >
      <FaRegUserCircle size={28} style={{ color: "var(--primary-color1)" }} />

      <span className={styles.title}> {userInfo?.name}</span>

      <div className={styles.accountMenu}>
        <div
          className={styles.logoutCta}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            logoutRequest();
          }}
        >
          <BiLogOutCircle size={20} />
          Logout
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
