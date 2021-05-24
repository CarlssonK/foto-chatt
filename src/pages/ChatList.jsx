import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Topbar from "../components/Topbar";
// Styles
import "../styles/chatlist.css";

function ChatList() {
    const history = useHistory()
    const [query, setQuery] = useState("");
    const [rooms, setRooms] = useState([])

    const handleInput = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        fetchRooms();
    }, [])

    const fetchRooms = async () => {
        const res = await fetch("http://localhost:3000/api/rooms");
        const data = await res.json();
        if(data.redirect === "login") return history.push("/login")

        setRooms(data.rooms)
    }

    return (
        <div className="chatlist-container">
            <Topbar />

            <div>
                <input
                    className="chatlist-input"
                    onChange={handleInput}
                    type="text"
                    placeholder="Search..."
                />
            </div>
            <div className="chatlist-box">
                <ul className="chatlist">
                    {rooms.map((room) => {
                        if (
                            room.title
                                .toLowerCase()
                                .includes(`${query.toLowerCase()}`)
                        ) {
                            return (

                                <Link
                                    key={room._id}
                                    to={{pathname: `/c/${room.title.toLowerCase()}`, state: {roomid: room._id, name: room.title}}}
                                    className="chatlist__item"
                                >
                                    <li>{room.title}</li>
                                </Link>


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
