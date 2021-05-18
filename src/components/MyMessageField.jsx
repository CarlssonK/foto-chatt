import React from "react";
import styles from "../styles/Chat.module.css";

function MyMessageField({ message, user, time }) {
    return (
        <li className={styles.myMessageField}>
            <div className={styles.myMessage}>
                <p className={styles.content}>{message}</p>
            </div>
            <p className={styles.myName}>
                {user.slice(0, 5)}
                <span className={styles.otherName}>
                    {new Date(time).toLocaleString().slice(11, 100)}
                </span>
            </p>
        </li>
    );
}

export default MyMessageField;
