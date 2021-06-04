import Topbar from "../components/Topbar";
import styles from "../styles/PhotoFeed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { Fade, Slide } from "react-slideshow-image";
import ImageComments from "../components/ImageComments";
import MyMessageField from "../components/MyMessageField";


function PhotoFeed({

}) {
  const [photoFeed, setPhotoFeed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [toggleImageComments, setToggleImageComments] = useState(false);
  const [imageCommentsId, setImageCommentsId] = useState("")


  const handleInput = (e) => {
    setQuery(e.target.value);
  };

    const formatDate = (sent='') => {


let newDate = new Date(sent)
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

return `${year} - ${month<10?`0${month}`:`${month}`} - ${date<10?`0${date}`:`${date}`}`

  };


  useEffect(() => {
    fetchAllImages();
  }, []);

  const handleToggleImageComments = (bool, imageId) => {
    console.log(imageId)
    setToggleImageComments(bool) // Show imageComments Component
    if(!imageId) return; // return here because we are closing the comop
    setImageCommentsId(imageId) // Set id so we know what data we should populate the component with
}

  const fetchAllImages = async () => {
    const res = await fetch("http://localhost:3000/api/getallphotos");
    const data = await res.json();
    //setUser(data.author.username)
    setPhotoFeed(data.filterByPhoto);
    console.log(data.filterByPhoto);
  };




  const filteredImg = photoFeed.filter(feed =>{
    return feed.text.toLowerCase().includes(search.toLowerCase())
  })
  return (
    <div>
      <Topbar chatName={"Photos"} />
      <ImageComments handleToggleImageComments={handleToggleImageComments} showComponentBool={toggleImageComments} imageId={imageCommentsId} />
      <form className={styles.form}>
        <div className={styles.inputSearch}>
          <i className={styles.searchIcon}>
            <span className="material-icons">search</span>
          </i>
            <input
              className={styles.input}
              type="text"
              placeholder="Search Photo"
              onChange={e => setSearch(e.target.value)}
            />
        </div>
      </form>
      <div className={styles.PhotoContainer}>
        <ul className={styles.photoList}>
          {filteredImg.reverse().map((msg) => {
            return (
              <li className={styles.photoBox} key={msg._id}>
                <div className="ig-user-box">
                </div>
                <div>
                 </div>
                <div
                  className="ig-img-box"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                    flexDirection: "column"
                  }}
                >
                <div>
                  {msg.images.map((img) => {
                 return <img className={styles.img} key={img._id} src={img.url}/>
                      })}
                      <div className="ig-controllers-box">
                     <a><FontAwesomeIcon
                      className="ig-controller-icon"
                      icon={faHeart}
                    /> </a>
                    <a onClick={() => handleToggleImageComments(true, msg._id) } className={styles.myMessage}><FontAwesomeIcon
                      className="ig-controller-icon"
                      icon={faComment}
                    /></a>
                </div>
                    <div className={styles.captionBox}>
                        <p className={styles.name}><b>{msg.author.username} </b>{msg.text}</p>
                    {/* { <p className={styles.caption}></p> } */}

                      <i className={styles.date}>{formatDate(msg.sent)}</i>
                    </div>
                </div>
                
              </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PhotoFeed;
