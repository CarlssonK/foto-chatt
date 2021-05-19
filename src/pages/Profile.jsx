import React from "react";
import Topbar from "../components/Topbar"
import styles from "../styles/Profile.module.css"
import { useAuth } from "../contexts/AuthContext";


function Profile() {
    const { currentUser} = useAuth();
    
    return (
        <div className={styles.profileContainer}>
            <Topbar chatName={"Profile"} />
            
            <div className={styles.loginDetails}>
            Username
            </div>

            <div className={styles.loginDetails}>
            E-mail
            </div>


            <div className={styles.bottomContainer}>
            

                <div className={styles.settings}>Notifikationer</div>
                <div className={styles.settings}>GPS</div>
                <div className={styles.settings}>Annat</div>

            </div>

        </div>
    );
}

export default Profile;
