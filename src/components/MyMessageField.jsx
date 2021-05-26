import React, {useEffect} from "react";
import styles from "../styles/Chat.module.css";

function MyMessageField({images, postId, message, username, sent, openImageComments}) {

    const formatDate = (sent) => {
        const date = new Date(sent)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours}:${minutes}`
    }



    return (
        <li onClick={images.length > 0 ? () => openImageComments(true, postId) : null} className={styles.myMessageField}>
            <div className={styles.myMessage}>
                <p className={styles.content}>{message && message}</p>
                
                    <div className={styles.myImageBox}>
                        {
                            images && images.map(e => {
                                return <img key={e._id} src={e.url.replace("/upload", "/upload/w_200")} width="200" />
                            })
                        }

                        {images.length > 0 ? <a className={styles.myImageLink}>Visa kommentarer</a> : null}
                    </div>
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
