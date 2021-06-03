import React, { useEffect, useState, useRef } from "react";
import { useStates } from "react-easier";
import Messageinput from "../components/Messageinput";
import MyMessageField from "../components/MyMessageField";
import OtherMessageField from "../components/OtherMessageField";
import Topbar from "../components/Topbar";
import styles from "../styles/Chat.module.css";
import { useNamedContext } from "react-easier";
import { useLocation } from "react-router-dom";
import ImageComments from "../components/ImageComments";
import UploadPhoto from "../components/UploadPhoto";

function Chat({ match, handleSetMessages }) {
  let g = useNamedContext("global");
  const location = useLocation();

  const previewImage = useRef();
  const [previewImages, setPreviewImages] = useState([]);

  const [imageList, setImageList] = useState();
  // IG stands for ImageComments
  const [toggleImageComments, setToggleImageComments] = useState(false);
  const [togglePhotoUpload, setTogglePhotoUpload] = useState(false);
  const [imageCommentsId, setImageCommentsId] = useState("");
  const [toggleTextZoom, setToggleTextZoom] = useState(true);
  const [messageList, setMessageList] = useState([]);

  const s = useStates({
    input: "",
    roomId: null,
  });

  // Fetch roomId
  useEffect(() => {
    !location.state ? fetchRoomId() : (s.roomId = location.state.roomid);

    if (location.state && location.state.camera) {
      // Convert base64 to file object
      setPreviewImages([location.state.imageSrc]);
      setImageList([location.state.imageSrc]);
    }
  }, []);

  useEffect(() => {
    if (
      location.state &&
      location.state.camera &&
      previewImages.length > 0 &&
      imageList.length > 0
    ) {
      setTogglePhotoUpload(true);
    }
  }, [previewImages, imageList]);

  useEffect(() => {
    if (g.userId !== null && s.roomId !== null) {
      joinUserToRoom();
    }
  }, [g.userId, s.roomId]);

  // Set roomId in user object and get data from room
  const joinUserToRoom = async () => {
    const res = await fetch(`http://localhost:3000/api/rooms/${s.roomId}`);
    const data = await res.json();

    // Prepopulate old messages that we got from the database
    const messages = data.room.messages
      .map((e) => {
        // const imageArray = e.images.forEach(e => delete e._id)
        return {
          id: e._id.toString(),
          message: e.text,
          images: e.images,
          sent: e.sent,
          author: { id: e.author._id.toString(), username: e.author.username },
        };
      })
      .reverse();

    handleSetMessages(messages);
  };

  // Fetch room id when user joins by url
  const fetchRoomId = async () => {
    const res = await fetch("http://localhost:3000/api/rooms");
    const data = await res.json();
    const room = data.rooms.filter((e) => e.title === match.params.id);
    s.roomId = room[0]._id;
  };

  const handleSubmit = async (e) => {
    if (s.input === "" && imageList.length === 0) return;
    const message = s.input;
    s.input = "";

    handleSubmitUI();
    // const hashtags = findHashtags(message);

    let formData = new FormData();

    if (imageList && typeof imageList[0] === "string") {
      const img = dataURLtoFile(
        location.state.imageSrc,
        "image-from-camera-component"
      );
      formData.append("images", img);
    } else {
      // Append images
      if (imageList) {
        for (let img of imageList) {
          formData.append("images", img);
        }
      }
    }

    // Append Text
    formData.append("text", message);

    // Append Date
    formData.append("sent", new Date());

    const res = await fetch(
      `http://localhost:3000/api/rooms/${s.roomId}/messages`,
      {
        method: "POST",
        body: formData,
      }
    );

    setImageList([]);
  };

  const handleSubmitUI = () => {
    setToggleTextZoom(true);
    setMessageList((messageList) => [
      {
        _id: Math.random(1 * 1000),
        text: s.input,
        sent: new Date(),
        author: { username: g.username },
      },
      ...messageList,
    ]);
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleInput = (e) => {
    // s.input = e.target.value; // Update state when input field changes
    if (typeof e === "string") {
      s.input = e; // Update state when input field changes
    } else {
      s.input = e.target.value; // Update state when input field changes
    }
  };

  const addFile = (e) => {
    if (e.target.files[0].type.indexOf("image/") > -1) {
      const filesArr = [...e.target.files];

      const filesUrl = filesArr.map((file) => {
        return window.URL.createObjectURL(file);
      });
      setPreviewImages(filesUrl);
    }

    setImageList([...e.target.files]);
    setTogglePhotoUpload(true);
  };

  const handleToggleImageComments = (bool, imageId) => {
    setToggleImageComments(bool); // Show imageComments Component
    if (!imageId) return; // return here because we are closing the comop
    setImageCommentsId(imageId); // Set id so we know what data we should populate the component with
  };

  // const handleTogglePhotoUpload = (imageId) => {
  //     setTogglePhotoUpload(); // Show imageComments Component
  //     if(!imageId) return; // return here because we are closing the comop
  //     setPhotoUploadID(imageId) // Set id so we know what data we should populate the component with
  // }

  const closePhotoUpload = () => {
    setTogglePhotoUpload(false);
  };

  // const fileClick = (e) => {
  //     fileRef.current.click()
  // }

  return (
    <div className={styles.chatContainer}>
      <Topbar chatName={location.pathname.substring(3)} />
      {/* <div>
        <p>users online </p>
        {g.usersOnline.map((e, idx) => {
          return (
            <span key={idx} style={{ color: "white" }}>
              {e.username}
            </span>
          );
        })}
      </div> */}
      <ImageComments
        handleToggleImageComments={handleToggleImageComments}
        showComponentBool={toggleImageComments}
        imageId={imageCommentsId}
      />
      <UploadPhoto
        inputValue={s.input}
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        showComponentBool={togglePhotoUpload}
        closePhotoUpload={closePhotoUpload}
        images={previewImages}
      />
      <div className={styles.messageContainer}>
        <ul>
          {g.messages.map((e) => {
            return e.author.id === g.userId ? (
              <MyMessageField
                key={e.id}
                postId={e.id}
                images={e.images}
                message={e.message}
                username={e.author.username}
                userid={e.author.id}
                sent={e.sent}
                openImageComments={handleToggleImageComments}
                toggleTextZoom={toggleTextZoom}
              />
            ) : (
              <OtherMessageField
                key={e.id}
                postId={e.id}
                images={e.images}
                message={e.message}
                username={e.author.username}
                userid={e.author.id}
                sent={e.sent}
                openImageComments={handleToggleImageComments}
              />
            );
          })}
        </ul>
      </div>

      <Messageinput
        addFile={addFile}
        handleSubmit={handleSubmit}
        handleInput={handleInput}
        showComponentBool={togglePhotoUpload}
        roomId={location.state ? location.state.roomid : ""}
        roomTitle={location.state ? location.state.name : ""}
        message={s.input}
      />
    </div>
  );
}

export default Chat;
