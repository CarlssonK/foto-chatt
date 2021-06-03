import Topbar from "../components/Topbar";
import styles from "../styles/PhotoFeed.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";
import { Fade, Slide } from "react-slideshow-image";
import ImageComments from "../components/ImageComments";
import MyMessageField from "../components/MyMessageField";

function PhotoFeed({}) {
  const [photoFeed, setPhotoFeed] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [toggleImageComments, setToggleImageComments] = useState(false);
  const [imageCommentsId, setImageCommentsId] = useState("");
  const [likeImage, setLikeImage] = useState(false);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const formatDate = (sent) => {
    const date = new Date(sent);
    const year = date.getYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    return `${day}: ${month}: ${year}`;
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  const handleToggleImageComments = (bool, imageId) => {
    console.log(imageId);
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

      <ImageComments
        handleToggleImageComments={handleToggleImageComments}
        showComponentBool={toggleImageComments}
        imageId={imageCommentsId}
      />
      <form className={styles.form}>
        <div className={styles.inputSearch}>
          <i className={styles.test}>
            <span className="material-icons">search</span>
          </i>
          <input
            className={styles.input}
            type="text"
            placeholder="Search Photo.."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      <div className={styles.PhotoContainer}>
        <ul className={styles.photoList}>
          {filteredImg.reverse().map((msg) => {
            return (
              <li className={styles.instaBox} key={msg._id}>
                <div className="ig-user-box"></div>

                <div></div>
                <div
                  className="ig-img-box"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    overflow: "hidden",
                    flexDirection: "column",
                  }}
                >
                  <div>
                    {msg.images.map((img) => {
                      return (
                        <img
                          className={styles.img}
                          key={img._id}
                          src={img.url}
                        />
                      );
                    })}

                    <div className={styles.insta}>
                      <p className={styles.name}>
                        <b>{msg.author.username} </b>
                        {msg.text}
                      </p>
                      {/* <p className={styles.caption}></p> */}
                    </div>
                  </div>

                  <div className="ig-controllers-box">
                    <a>
                      {likeImage ? (
                        <FontAwesomeIcon
                          className="ig-controller-icon"
                          style={{ color: "red" }}
                          icon={solidHeart}
                          onClick={() =>
                            setLikeImage((likeImage) => !likeImage)
                          }
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="ig-controller-icon"
                          icon={faHeart}
                          onClick={() =>
                            setLikeImage((likeImage) => !likeImage)
                          }
                        />
                      )}
                    </a>
                    <a
                      onClick={() => handleToggleImageComments(true, msg._id)}
                      className={styles.myMessage}
                    >
                      <FontAwesomeIcon
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
