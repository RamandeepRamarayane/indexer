import React from "react";
import styles from "./aside.module.css";
import { links } from "./data";
import AccountMenu from "./AccountMenu";
import { NavLink, useNavigate } from "react-router-dom";
import { screens } from "../../screens";
import SVGIcon from "../../components/SVGIcon/SVGIcon";

function Aside() {
  const navigate = useNavigate();
  return (
    <div className={styles.asideContainer}>
      <div className={styles.aside}>
        <div
          className={styles.logo}
          onClick={() => {
            navigate(screens.dashboard);
          }}
        >
          <img src={"/assets/images/Logo.png"} style={{ width: "26px" }} />
          <span className={styles.title}>Bulk Indexer</span>
        </div>

        {/* <div className={styles.navLinks}>
          {links.map((link) => (
            <div>
              <NavLink
                to={link.link}
                onClick={(e) => link.isDisabled && e.preventDefault()}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                {link.icon}{" "}
                <span className={styles.title}>
                  {link.title}
                  {!!link.tag && <span>{link.tag}</span>}
                </span>
              </NavLink>
            </div>
          ))}
        </div> */}
        <AccountMenu />
      </div>
    </div>
  );
}

export default Aside;
