import React from "react";
import Topbar from "../components/Topbar"
import styles from "../styles/Profile.module.css"
import { useAuth } from "../contexts/AuthContext";


function Profile() {
    const { currentUser} = useAuth();
    return (
        <div className={styles.profileContainer}>
            <Topbar chatName={"Profile"} />
            
            <input className={styles.loginDetails} 
                placeholder="Username"
                disabled
            />
            
            <input className={styles.loginDetails}
                placeholder="Password"
                disabled
            />

            <div className={styles.bottomContainer}>
            

                <div className={styles.settings}>NOTIFIKATIONER</div>
                <div className={styles.settings}>GPS</div>
                <div className={styles.settings}>ANNAT</div>

            </div>

        </div>
    );
}

export default Profile;
