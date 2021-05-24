import React from "react";
import styles from "../styles/Topbar.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { useNamedContext, If } from "react-easier";

function Topbar({ chatName }) {
    const loc = useLocation();
    const history = useHistory();

    let g = useNamedContext("global");

    const handleArrowBack = () => {
        fetch("http://localhost:3000/api/leaveroom")
        g.messages = []
        history.push("/")
    }

    return (
        <div>
            <div className={styles.topbar}>

                <button className={styles.btn}>
                    {loc.pathname != "/" ? (
                        <i onClick={handleArrowBack} className="material-icons">
                            arrow_back
                        </i>
                    ) : (
                        ""
                    )}
                </button>

                <h4>{chatName}</h4>
                {
                    history.location.pathname !== "/profile" ? (
                        <button className={styles.btn}>
                            <i>
                                <a onClick={() => history.push("/profile")} className="material-icons">
                                    manage_accounts
                                </a>
                            </i>
                        </button>
                    ) : <div></div>
                }

            </div>
        </div>
    );
}

export default Topbar;
