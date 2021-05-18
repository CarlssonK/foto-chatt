import React, { useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import { useNamedContext } from "react-easier";
// Styles
import "../styles/chatlist.css";

function ChatList() {
    let g = useNamedContext("global");
    const [query, setQuery] = useState("");

    const handleInput = (e) => {
        setQuery(e.target.value);
    };

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
                    {g.chatList.map((chat, idx) => {
                        if (
                            chat.name
                                .toLowerCase()
                                .includes(`${query.toLowerCase()}`)
                        ) {
                            return (
                                <Link
                                    key={idx}
                                    to={`/c/${chat.name.toLowerCase()}`}
                                    className="chatlist__item"
                                >
                                    <li>{chat.name}</li>
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
