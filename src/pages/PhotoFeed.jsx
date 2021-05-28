import Topbar from "../components/Topbar";
import styles from "../styles/PhotoFeed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { Fade, Slide } from "react-slideshow-image";

function PhotoFeed({
  images,
  postId,
  message,
  username,
  sent,
  openImageComments,
}) {
  const [photoFeed, setPhotoFeed] = useState([]);
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const formatDate = (sent) => {
    const date = new Date(sent);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  const fetchAllImages = async () => {
    const res = await fetch("http://localhost:3000/api/getallphotos");
    const data = await res.json();
    //setUser(data.author.username)
    setPhotoFeed(data.filterByPhoto);
    console.log(data.filterByPhoto);
  };

  return (
    <div>
      <Topbar />

      <input
        className="chatlist-input"
        type="text"
        placeholder="Search..."
        onChange={handleInput}
      />
      <div className={styles.PhotoContainer}>
        <ul>
          {photoFeed.reverse().map((msg) => {
            return (
              <li key={msg._id}>
                <div className="ig-user-box">
                  <p>{msg.author.username}</p>
                </div>
                <div
                  className="ig-img-box"
                  style={{
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {msg.images.map((img) => {
                    return <img src={img.url}></img>;
                  })}
                  <div className="ig-controllers-box">
                    <FontAwesomeIcon
                      className="ig-controller-icon"
                      icon={faHeart}
                    />
                    <FontAwesomeIcon
                      className="ig-controller-icon"
                      icon={faComment}
                    />
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
