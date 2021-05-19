import React from "react";
import styles from "../styles/Chat.module.css";

function otherMessageField({ message, user, time }) {
    return (
        <li className={styles.otherMessageField}>
            <div className={styles.otherMessage}>
                <p className={styles.content}>{message}</p>
            </div>
            <p className={styles.otherName}>
                {user.slice(0, 5)}
                <span className={styles.otherName}>
                    {new Date(time).toLocaleString().slice(11, 100)}
                </span>
            </p>
        </li>
    );
}

export default otherMessageField;
