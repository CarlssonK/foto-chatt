import React, { useEffect, useState, useRef } from "react";
import "../styles/imagecomments.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComment } from "@fortawesome/free-regular-svg-icons";

import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useNamedContext } from "react-easier";

// import Switch from '@material-ui/core/Switch';
import Paper from "@material-ui/core/Paper";
import SlideTransition from "@material-ui/core/Slide";

import Zoom from "@material-ui/core/Zoom";

function ImageComments({
  handleToggleImageComments,
  showComponentBool,
  imageId,
}) {
  let g = useNamedContext("global");

  const inputRef = useRef();
  const slideRef = useRef();

  const [input, setInput] = useState("");

  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [toggleTextZoom, setToggleTextZoom] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    fetchComments();
  }, [showComponentBool]);

  const fetchComments = async () => {
    if (!showComponentBool || !imageId) return;
    console.log(imageId);
    const res = await fetch(`http://localhost:3000/api/rooms/${imageId}/show`);
    const data = await res.json();
    console.log(data.message);
    loadData(data.message);
  };

  const loadData = (data) => {
    setImages([...data.images]);
    setComments(data.comments.reverse());
    setUser(data.author.username);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input === "") return;
    handleSubmitUI();
    const comment = input;
    setInput(""), (inputRef.current.value = "");

    const res = await fetch(
      `http://localhost:3000/api/rooms/${imageId}/comments`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: comment,
          sent: new Date(),
        }),
      }
    );

    const data = await res.json();
    console.log(data);

    // fetch(`http://localhost:3000/api/rooms/${s.roomId}/messages`, {
    //     method: "POST",
    //     body: formData,
    // });
  };

  const handleSubmitUI = () => {
    setToggleTextZoom(true);
    setComments((comments) => [
      {
        _id: Math.random(1 * 1000),
        text: input,
        sent: new Date(),
        author: { username: g.username },
      },
      ...comments,
    ]);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const formatDate = (sent) => {
    const date = new Date(sent);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  // style={{display: showComponentBool ? "block" : "none"}

  return (
    <>
      <Zoom in={showComponentBool}>
        <div className="image-comments-outer-container">
          <div className="image-comments-container">
            <div className="image-comments-inner-container">
              <div
                onClick={() => handleToggleImageComments(false)}
                className="ig-exit"
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
              <div className="ig-top">
                <div className="ig-user-box">
                  <p>{user}</p>
                </div>

                {images.length > 1 ? (
                  <div className="ig-img-box">
                    <Slide transitionDuration={200}>
                      {images.map((e) => {
                        return (
                          <img
                            key={e._id}
                            src={e.url.replace("/upload", "/upload/w_400")}
                            style={{ margin: "0 auto" }}
                          ></img>
                        );
                      })}
                    </Slide>
                  </div>
                ) : (
                  <div
                    className="ig-img-box"
                    style={{
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "black",
                    }}
                  >
                    {images.map((e) => {
                      return (
                        <img
                          key={e._id}
                          src={e.url.replace("/upload", "/upload/w_400")}
                        ></img>
                      );
                    })}
                  </div>
                )}
                <div className="ig-controllers-box">
                  <FontAwesomeIcon
                    className="ig-controller-icon"
                    icon={faHeart}
                  />
                  <FontAwesomeIcon
                    className="ig-controller-icon"
                    icon={faComment}
                    onClick={() => inputRef.current.focus()}
                  />
                </div>
              </div>
              <div className="ig-ul-box">
                <ul className="ig-ul">
                  {comments.length === 0 ? (
                    <p style={{ color: "gray" }}>Det var tomt här.</p>
                  ) : (
                    comments.map((e) => {
                      return (
                        <Zoom key={e._id} in={toggleTextZoom}>
                          <li style={{ padding: "8px 12px" }}>
                            <strong>{e.author.username} </strong>
                            {e.text}
                            <div style={{ color: "gray" }}>
                              {formatDate(e.sent)}
                            </div>
                          </li>
                        </Zoom>
                      );
                    })
                  )}
                </ul>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="ig-input-box">
                  <input
                    onChange={handleInput}
                    ref={inputRef}
                    type="text"
                    style={{ color: "white" }}
                    placeholder="Kommentera..."
                  />
                  <button>
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Zoom>

      <div
        onClick={() => handleToggleImageComments(false)}
        className="ig-click-catcher"
        style={{ display: showComponentBool ? "block" : "none" }}
      ></div>
    </>
  );
}

export default ImageComments;
