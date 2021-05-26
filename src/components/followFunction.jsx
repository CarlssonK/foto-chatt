import React from "react"
import styles from "../styles/FollowFunction.module.css";

const FollowFunction = ({handleFollow, isFollowing, id}) => {



    return (
        <div onClick={() => handleFollow(id, isFollowing ? "unfollow" : "follow")} className="chatlist__star">
            
            {isFollowing ?
                <button className={styles.starFollow}>
                <i className="material-icons">star</i>
                </button>
                :
                <button className={styles.starNotFollow}>
                <i className="material-icons">star_border</i>
                </button>
            }


        </div>
    )
}

export default FollowFunction