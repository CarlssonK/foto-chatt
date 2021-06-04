import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import styles from "../styles/Profile.module.css";
import { useNamedContext } from "react-easier";
import { useHistory } from "react-router-dom";
import GeoLocation from "../components/GeoLocation";
import { subToNotifications } from "../utils/notification";
import ToggleButton from "../components/ToggleButton";
import "../styles/ToggleButton.css";

import loginCheck from "../utils/LoginCheck";

const Checked = () => <>🟢</>;
const UnChecked = () => <>🔴</>;

function Profile() {
  let g = useNamedContext("global");
  const history = useHistory();
  const geo = GeoLocation();

  useEffect(() => {
    handleLoginCheck();
  }, []);

  const handleLoginCheck = async () => {
    const res = await loginCheck();
    // const res = await fetch("http://localhost:3000/api/rooms");
    const data = await res;
    console.log(data);
    if (data.redirect === "login") return history.push("/login");
  };

  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout");
    g.username = null;
    g.email = null;
    g.userId = null;
    g.messages = [];
    history.push("/login");
  };

  // const uploadedImage = React.useRef(null);
  // const imageUploader = React.useRef(null);

  // const handleImageUpload = e => {
  //   const [file] = e.target.files;
  //   if (file) {
  //     const reader = new FileReader();
  //     const { current } = uploadedImage;
  //     current.file = file;
  //     reader.onload = e => {
  //       current.src = e.target.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const onNotisClick = () => {
  //     subToNotifications()
  // };

  return (
    <div>
      <Topbar chatName={"Profile"} />

      <div className={styles.avatarContainer}>
        <img className={styles.img} src="../assets/icons/icon.png" alt="" />
        <h1 className={styles.h1}>Beepd</h1>

        {/* <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                display: "none"
                }}
            />

            <div className={styles.avatar}
                onClick={() => imageUploader.current.click()}>
            <img className={styles.avatarImg}
                ref={uploadedImage}
            />

      </div> */}
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.wrapper}>
          <div className={styles.userNameLeft}>Username:</div>
          <div className={styles.userName}>{g.username}</div>
        </div>
        {/* <hr /> */}
        <div className={styles.wrapper}>
          <div className={styles.emailLeft}>Email:</div>
          <div className={styles.email}>{g.email}</div>
        </div>

        {/* <div className={styles.wrapper}>
                <div className={styles.notifications}>Notifikationer</div>
        <ToggleButton className={styles.notificationsButton} onClick={onNotisClick} onChange={state => console.log(state)} icons={{checked: <Checked />, unchecked: <UnChecked />}} />
        </div>
        <div className={styles.wrapper}>
            <div className={styles.geoLocation}>Show Geolocation</div>
            <div className={styles.geoButton}>                {
                    <GeoLocation/>
                }
                </div> */}
      </div>

      {/* <div className={styles.loginDetails}>
                {g.email}
            </div> */}
      {/* 
            <div className={styles.loginDetails}>
                {
                    <GeoLocation/>
                }
            </div> */}

      <div className={styles.bottomContainer}>
        {/* <span onClick={onNotisClick}>
                    <div className={styles.settings}>Notifikationer</div>
                </span> */}

        {/* <div className={styles.settings}>GPS</div> */}
        {/* <div className={styles.settings}>Annat</div> */}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          <b>LOG OUT</b>
        </button>
        {/* <button onClick={handleLogout}>Logout</button> */}
      </div>
    </div>
  );
}

export default Profile;
