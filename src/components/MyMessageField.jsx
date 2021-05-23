import React, {useEffect} from "react";
import styles from "../styles/Chat.module.css";

function MyMessageField({images, message, username, sent }) {



    const formatDate = (sent) => {
        const date = new Date(sent)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours}:${minutes}`
    }



    return (
        <li className={styles.myMessageField}>
            <div className={styles.myMessage}>
                <p className={styles.content}>{message && message}</p>
                {
                    images && images.map(e => {
                        return <img key={e._id} src={e.url.replace("/upload", "/upload/w_200")} width="200" />
                    })
                }
            </div>
            <p className={styles.myName}>
                {username}
                <span className={styles.otherName}>
                    {formatDate(sent)}
                </span>
            </p>
        </li>
    );
}

export default MyMessageField;
