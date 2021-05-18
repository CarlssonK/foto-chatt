import React from "react";
import styles from "../styles/Topbar.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";

function Topbar({ chatName }) {
  const history = useHistory();

  return (
    <div className={styles.topbar}>
      <button
        className={styles.btn}
        onClick={() => {
          history.goBack();
        }}
      >
        <i className="material-icons">arrow_back</i>
      </button>
      <h4>{chatName}</h4>
      <button className={styles.btn}>
        <Link to="/Profile">
          {" "}
          <i className="material-icons">manage_accounts</i>
        </Link>
      </button>
    </div>
  );
}

export default Topbar;
