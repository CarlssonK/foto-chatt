import React from "react";
import styles from "../styles/Topbar.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { useNamedContext, If } from "react-easier";

function Topbar({ chatName }) {
  const loc = useLocation();
  const history = useHistory();

  let g = useNamedContext("global");

  const handleArrowBack = () => {
    fetch("http://localhost:3000/api/leaveroom");
    g.messages = [];
    history.push("/");
  };

  return (
    <div>
      <div className={styles.topbar}>
        <button className={styles.btn}>
          {loc.pathname != "/" ? (
            <i onClick={handleArrowBack} className="material-icons">
              arrow_back
            </i>
          ) : (
              <div className={styles.head}><img className={styles.img} src="../assets/icons/icon.png" alt="" /><h5 className={styles.beepd}>Beepd</h5></div>
          )}
        </button>

        <h5>{chatName}</h5>
        {history.location.pathname !== "/profile" ? (
          <button className={styles.btn}>
            <i>
              <a
                onClick={() => history.push("/profile")}
                className="material-icons">
                manage_accounts
              </a>
            </i>
            <i>
              <a
                onClick={() => history.push("/photo")}
                className="material-icons">
                photo_library</a></i>
          </button>
          
        ) : (
         <div className={styles.empty}></div>
        )}
      </div>
      </div>
  );
}

export default Topbar;
