import Topbar from "../components/Topbar";
import styles from "../styles/PhotoFeed.module.css"
import MyMessageField from "../components/MyMessageField";
import OtherMessageField from "../components/OtherMessageField";
import React, { useEffect, useState } from "react";


function PhotoFeed({images, postId, message, username, sent, openImageComments}) {

    const [photoFeed, setPhotoFeed] = useState([])


    const formatDate = (sent) => {
        const date = new Date(sent)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours}:${minutes}`
    }


    useEffect(() => {
        fetchAllImages();
    }, [])

    const fetchAllImages = async () => {
        const res = await fetch("http://localhost:3000/api/getallphotos");
        const data = await res.json();
        setPhotoFeed(data.filterByPhoto)
        console.log(data.filterByPhoto)
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
      <div className={styles.PhotoContainer}> 
      
    
     </div>
     <ul>
         {
             photoFeed.map(msg => {
                 return (
                     <li key={msg._id}>
                         ONE MESSAGE
                         {
                             msg.images.map(img => {
                                 return <img src={img.url}></img>
                             })
                         }
                         
                     </li>
                 )
             })
         }


    </ul>
     
  

    
        
        </div>
    );
}
   
   

  
  

export default PhotoFeed;
