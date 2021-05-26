import Topbar from "../components/Topbar";
import styles from "../styles/Topbar.module.css";
import MyMessageField from "../components/MyMessageField";
import OtherMessageField from "../components/OtherMessageField";
import React, { useEffect } from "react";


function PhotoFeed({images, postId, message, username, sent, openImageComments}) {

    const formatDate = (sent) => {
        const date = new Date(sent)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours}:${minutes}`
    }
/* 
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
*/


    return (
         <div>
             <Topbar/>
    <input
        className="chatlist-input"
        type="text"
        placeholder="Search..."
      />
     
        
        </div>
    );
}
   
   

  
  

export default PhotoFeed;
