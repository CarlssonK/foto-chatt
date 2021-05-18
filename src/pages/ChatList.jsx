import React, { useState } from "react";
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
                                <li key={idx} className="chatlist__item">
                                    {chat.name}
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
        </div>
    );
}

export default ChatList;
