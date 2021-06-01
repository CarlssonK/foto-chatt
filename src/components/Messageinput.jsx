import React, { useEffect, useRef, useState } from "react";
import { useStates } from "react-easier";
import styles from "../styles/Messageinput.module.css";
import { Link, useHistory } from "react-router-dom";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { faDharmachakra } from "@fortawesome/free-solid-svg-icons";

function Messageinput({
  addFile,
  handleSubmit,
  handleInput,
  showComponentBool,
  roomId,
  roomTitle,
  message,
}) {
  const inputRef = useRef(null);
  const fileRef = useRef(null);
  const formRef = useRef(null);
  const [emojiPickerState, SetEmojiPicker] = useState(false);

  let emojiPicker;
  if (emojiPickerState) {
    emojiPicker = (
      <Picker
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={(emoji) => handleInput(emoji.native)}
        style={{ position: "absolute", bottom: "8vh", left: "0px" }}
        theme="dark"
      />
    );
  }

  function triggerPicker(e) {
    e.preventDefault();
    SetEmojiPicker(!emojiPickerState);
  }

  const submit = (e) => {
    e.preventDefault(); // Prevent reload
    inputRef.current.value = ""; // Clear input field

    handleSubmit(e);

    SetEmojiPicker(false);

    // fileRef.current.files
  };

  const fileClick = (e) => {
    fileRef.current.click();
  };

  useEffect(() => {
    console.log(showComponentBool);
    if (!showComponentBool) {
      formRef.current.reset();
    }
  }, [showComponentBool]);

  return (
    <div
      className={styles.messageBar}
      style={showComponentBool ? { zIndex: "-1" } : null}
    >
      {emojiPicker}
      <Link
        className={styles.btns}
        to={{
          pathname: "/camera",
          state: { path: location.pathname, roomId: roomId, name: roomTitle },
        }}
      >
        <div className="material-icons">camera_alt</div>
      </Link>

      <button className={styles.btns} onClick={fileClick}>
        <i className="material-icons">photo_size_select_actual</i>
      </button>
      <form
        className={styles.emojiForm}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <button className={styles.emojiBtn} onClick={triggerPicker}>
          <i className={"material-icons"}>sentiment_satisfied_alt</i>
        </button>
      </form>
      <form onSubmit={submit} className={styles.form} ref={formRef}>
        <div className={styles.inputMessage}>
          <input
            className={styles.input}
            type="text"
            placeholder="Skicka ett meddelande.."
            ref={inputRef}
            onChange={handleInput}
            value={message}
          />
          <input
            type="file"
            ref={fileRef}
            onChange={addFile}
            accept="image/*,video/*,audio/*"
            // capture
            multiple
            style={{ display: "none" }}
          />
          <button className={styles.sendBtn}>
            <i className="material-icons">send</i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Messageinput;
