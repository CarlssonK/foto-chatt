import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FollowFunction from "../components/followFunction";
import Topbar from "../components/Topbar";
import { useNamedContext } from "react-easier";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NewRoom from "../components/NewRoom";
// Styles

import styles from "../styles/ChatList.module.css";

function ChatList() {
  let g = useNamedContext("global");
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [rooms, setRooms] = useState([]);
  const [followedRooms, setFollowedRooms] = useState([]);
  const [unfollowedRooms, setUnfollowedRooms] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [toggleNewRoom, setToggleNewRoom] = useState(false);

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch("http://localhost:3000/api/rooms");
    const data = await res.json();
    if (data.redirect === "login") return history.push("/login");

    const fixedRooms = data.rooms.map((e) => {
      e.isFollowing = false;
      return e;
    });

    if (g.followedRooms && g.followedRooms.length > 0) {
      // Set followed rooms from database that is saved in global context g.followedRooms
      for (let i = 0; i < fixedRooms.length; i++) {
        if (fixedRooms[i].id === g.followedRooms[i].id)
          fixedRooms[i].isFollowing = true;
      }
    }
    setShowSkeleton(false);
    setRooms(fixedRooms);
    updateRooms(fixedRooms);
  };

  const updateRooms = async (allRooms) => {
    const followedRooms = allRooms.filter((e) => e.isFollowing);
    const unfollowedRooms = allRooms.filter((e) => !e.isFollowing);

    setFollowedRooms(followedRooms);
    setUnfollowedRooms(unfollowedRooms);

    // UPDATE FOLLOWED ROOMS IN DATABASE
    await fetch("http://localhost:3000/api/rooms/handlefollow", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followedRooms,
      }),
    });
  };

  const handleFollow = (id, action) => {
    const roomsCopy = [...rooms];

    if (action === "follow") {
      const updatedRooms = rooms.map((e) => {
        if (e._id === id) e.isFollowing = true;
        return e;
      });

      updateRooms(updatedRooms);
      return;
    }

    if (action === "unfollow") {
      const updatedRooms = rooms.map((e) => {
        if (e._id === id) e.isFollowing = false;
        return e;
      });

      updateRooms(updatedRooms);
      return;
    }
  };

  const handleToggleNewRoom = (bool) => {
    setToggleNewRoom(bool); // Show imageComments Component
  };

  const addRoom = (room) => {
    setRooms((rooms) => [room, ...rooms]);
  };

  return (
    <div className={styles.chatlistContainer}>
      <Topbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            width: "40px",
            display: "grid",
            placeItems: "center",
          }}
          onClick={() => setToggleNewRoom(true)}
        >
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: "24px" }} />
        </div>
        <form className={styles.form} style={{ width: "100%" }}>
          <div className={styles.inputSearch}>
            <i className={styles.searchIcon}>
              <span className="material-icons">search</span>
            </i>
            <input
              className={styles.chatlistInput}
              onChange={handleInput}
              type="text"
              placeholder="Search"
            />
          </div>
        </form>
      </div>

      <NewRoom
        handleToggleNewRoom={handleToggleNewRoom}
        toggleComponentBool={toggleNewRoom}
        addRoom={addRoom}
      />

      <div style={{ display: showSkeleton ? "block" : "none" }}>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
        <div className="card-skeleton">
          <div className="animated-background"></div>
        </div>
      </div>

      <div className={styles.chatlistBox}>
        <ul className={styles.chatlist}>
          {followedRooms.map((room) => {
            if (room.title.toLowerCase().includes(`${query.toLowerCase()}`)) {
              return (
                <div className={styles.chatlistItem} key={room._id}>
                  <Link
                    className={styles.chatlistLink}
                    to={{
                      pathname: `/c/${room.title.toLowerCase()}`,
                      state: { roomid: room._id, name: room.title },
                    }}
                  >
                    <li>{room.title}</li>
                  </Link>

                  <FollowFunction
                    handleFollow={handleFollow}
                    isFollowing={true}
                    id={room._id}
                  />
                </div>
              );
            }
          })}

          {unfollowedRooms.map((room) => {
            if (room.title.toLowerCase().includes(`${query.toLowerCase()}`)) {
              return (
                <div key={room._id} className={styles.chatlistItem}>
                  <Link
                    className={styles.chatlistLink}
                    to={{
                      pathname: `/c/${room.title.toLowerCase()}`,
                      state: { roomid: room._id, name: room.title },
                    }}
                  >
                    <li>{room.title}</li>
                  </Link>
                  <FollowFunction
                    handleFollow={handleFollow}
                    isFollowing={false}
                    id={room._id}
                  />
                </div>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default ChatList;

// <Link to={`/item-page/${post['_id']}`} ><button className="btn btn-outline-dark m-2">Se mer</button></Link>
