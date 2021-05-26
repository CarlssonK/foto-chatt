import { StylesProvider } from "@material-ui/styles";
import React, { useEffect, useRef } from "react";
import styles from "../styles/Camera.module.css";

const Camera = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let context = photo.getContext("2d");

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      context.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;

    const data = photo.toDataURL("image/jpeg");

    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", "myWebcam");
    link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    strip.insertBefore(link, strip.firstChild);
  };

  return (

    
    <div className={styles.container}>

    <div className="container">
        <button onClick={() => takePhoto()}>Take a photo</button>

        <video
          onCanPlay={() => paintToCanvas()}
          ref={videoRef}
          className="player"
        />

        <canvas
        ref={photoRef}
        className={styles.photo}
         />

        <canvas ref={photoRef} className="photo" />

        <div className="photo-booth">
          <div ref={stripRef} className="strip" />
        </div>

        <div className={styles.center}>
        <button className="material-icons">
          <a onClick={() => takePhoto()}>radio_button_unchecked</a>
          </button>
          </div>

      </div>
      </div>

  );
};

export default Camera;