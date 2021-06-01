import Topbar from "../components/Topbar";
import styles from "../styles/PhotoFeed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { Fade, Slide } from "react-slideshow-image";
import ImageComments from "../components/ImageComments";

function PhotoFeed({
  images,
  postId,
  message,
  username,
  sent,
  openImageComments,
}) {
  const [photoFeed, setPhotoFeed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [toggleImageComments, setToggleImageComments] = useState(false);
  const [imageCommentsId, setImageCommentsId] = useState("");

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

  const handleToggleImageComments = (bool, imageId) => {
    setToggleImageComments(bool); // Show imageComments Component
    if (!imageId) return; // return here because we are closing the comop
    setImageCommentsId(imageId); // Set id so we know what data we should populate the component with
  };

  const fetchAllImages = async () => {
    const res = await fetch("http://localhost:3000/api/getallphotos");
    const data = await res.json();
    //setUser(data.author.username)
    setPhotoFeed(data.filterByPhoto);
    console.log(data.filterByPhoto);
  };

  const filteredImg = photoFeed.filter((feed) => {
    return feed.text.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <Topbar />

      <input
        className="chatlist-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <ImageComments
        handleToggleImageComments={handleToggleImageComments}
        showComponentBool={toggleImageComments}
        imageId={imageCommentsId}
      />
      <div className={styles.PhotoContainer}>
        <ul>
          {photoFeed.reverse().map((msg) => {
            return (
              <li key={msg._id}>
                <div className="ig-user-box">
                  <p className={styles.name}>{msg.author.username}</p>
                </div>
                <div
                  className="ig-img-box"
                  style={{
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {msg.images.map((img) => {
                    return <img key={img._id} src={img.url}></img>;
                  })}
                  <div key={msg._id}>
                    <p className={styles.tags}>{msg.text}</p>
                    <p className={styles.tags}>{msg.sent}</p>
                  </div>

                  <div className="ig-controllers-box">
                    <a></a>
                    <FontAwesomeIcon
                      className="ig-controller-icon"
                      icon={faHeart}
                    />
                    <a>
                      <FontAwesomeIcon
                        openImageComments={handleToggleImageComments}
                        className="ig-controller-icon"
                        icon={faComment}
                      />
                    </a>
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
