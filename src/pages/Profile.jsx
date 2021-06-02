import React, {useEffect} from "react";
import Topbar from "../components/Topbar"
import styles from "../styles/Profile.module.css"
import { useNamedContext } from "react-easier";
import { useHistory } from "react-router-dom"
import GeoLocation from "../components/GeoLocation";
import { subToNotifications } from '../utils/notification';

import loginCheck from "../utils/LoginCheck"


function Profile() {
    let g = useNamedContext("global");
    const history = useHistory();
    const geo = GeoLocation();

    useEffect(() => {
        handleLoginCheck();
    }, [])

    const handleLoginCheck = async () => {
        const res = await loginCheck();
        // const res = await fetch("http://localhost:3000/api/rooms");
        const data = await res.json();
        if(data.redirect === "login") return history.push("/login")
    }

    const handleLogout = async () => {
        await fetch("http://localhost:3000/api/logout");
        g.username = null;
        g.email = null;
        g.userId = null;
        g.messages = [];
        history.push("/login")
    }
   
    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);
  
    const handleImageUpload = e => {
      const [file] = e.target.files;
      if (file) {
        const reader = new FileReader();
        const { current } = uploadedImage;
        current.file = file;
        reader.onload = e => {
          current.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const onNotisClick = () => {
        subToNotifications()
    };

    return (
        <div className={styles.profileContainer}>
            <Topbar chatName={"Profile"} />
            
         <div className={styles.avatarContainer}>
             
            <input
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

      </div>

    </div>

            <div className={styles.loginDetails}>
                {g.username}
            </div>

            <div className={styles.loginDetails}>
                {g.email}
            </div>

            <div className={styles.loginDetails}>
                {
                    <GeoLocation/>
                }
            </div>

            <div className={styles.bottomContainer}>
                <span onClick={onNotisClick}>
                    <div className={styles.settings}>Notifikationer</div>
                </span>
                <div className={styles.settings}>GPS</div>
                <div className={styles.settings}>Annat</div>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
}

export default Profile;
