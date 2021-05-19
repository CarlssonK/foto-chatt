import React from "react";
import Topbar from "../components/Topbar"
import styles from "../styles/Profile.module.css"


function Profile() {
    return (
        <div className={styles.profileContainer}>
            <Topbar />
            
            <input className={styles.loginDetails} 
                placeholder="Username"
                disabled
            />
            
            <input className={styles.loginDetails}
                placeholder="Password"
                disabled
            />

            <div className={styles.bottomContainer}>

                
                {/* {<Switch checked={state.gilad} onChange={handleChange} name="notification" />}

                <label className="switch">
                <input type="checkbox">
                <span className="slider round"></span>
                </label> */}
            

                <div className={styles.settings}>NOTIFIKATIONER</div>
                <div className={styles.settings}>GPS</div>
                <div className={styles.settings}>ANNAT</div>

            </div>
        </div>
    );
}

export default Profile;
