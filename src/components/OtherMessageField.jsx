import React from "react";
import styles from "../styles/Chat.module.css";

function otherMessageField({images, message, username, sent}) {

    const formatDate = (sent) => {
        const date = new Date(sent)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours}:${minutes}`
    }


    return (
        <li className={styles.otherMessageField}>
            <div className={styles.otherMessage}>   
                <p className={styles.content}>{message}</p>
                {
                    images && images.map(e => {
                        return <img key={e._id} src={e.url.replace("/upload", "/upload/w_200")} width="200" />
                    })
                }
            </div>
            <p className={styles.otherName}>
                {username}
                <span className={styles.otherName}>
                    {formatDate(sent)}
                </span>
            </p>
        </li>
    );
}

export default otherMessageField;
