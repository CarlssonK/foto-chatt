import React, {useEffect} from "react";
import Topbar from "../components/Topbar"
import styles from "../styles/Profile.module.css"
import { useNamedContext } from "react-easier";
import { useHistory } from "react-router-dom"



function Profile() {
    let g = useNamedContext("global");
    const history = useHistory();


    useEffect(() => {
        loginCheck();
    }, [])

    const loginCheck = async () => {
        const res = await fetch("http://localhost:3000/api/rooms");
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

    return (
        <div className={styles.profileContainer}>
            <Topbar chatName={"Profile"} />
            
            <div className={styles.loginDetails}>
                {g.username}
            </div>

            <div className={styles.loginDetails}>
                {g.email}
            </div>


            <div className={styles.bottomContainer}>
                <div className={styles.settings}>Notifikationer</div>
                <div className={styles.settings}>GPS</div>
                <div className={styles.settings}>Annat</div>
                <button onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
}

export default Profile;
