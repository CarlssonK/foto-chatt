import React, { useEffect, useRef, useState } from "react";
import { useStates } from "react-easier";
import Messageinput from "../components/Messageinput";
import Topbar from "../components/Topbar";
import styles from "../styles/Chat.module.css";

function Chat({ match }) {
    const [messageList, setMessageList] = useState([]);
    const [userId, setUserId] = useState("");
    const [roomId, setRoomId] = useState("");

    const s = useStates({
        input: "",
    });

    useEffect(() => {
        setRoomId((roomId) => match.params.id);

        if (roomId.length > 0 && userId.length > 0) {
            fetch(
                `http://localhost:3000/api/joinchat?roomId=${roomId}&userId=${userId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    }, [match.params.id, userId]);

    useEffect(() => {
        startSSE();
    }, []);

    const startSSE = () => {
        let sse = new EventSource("/api/sse");

        // Retrieve your unique userId from the server
        sse.addEventListener("user-id", (message) => {
            let data = JSON.parse(message.data);
            setUserId((userId) => data.userId);
        });

        sse.addEventListener("connect", (message) => {
            let data = JSON.parse(message.data);
            console.log("[connect]", data);
        });

        sse.addEventListener("disconnect", (message) => {
            let data = JSON.parse(message.data);
            console.log("[disconnect]", data);
        });

        sse.addEventListener("new-message", (message) => {
            let data = JSON.parse(message.data);
            console.log("[new-message]", data);

            setMessageList((messageList) => [
                {
                    user: data.userId,
                    msg: data.msg,
                    time: data.timestamp,
                },
                ...messageList,
            ]);
        });
    };

    const handleSubmit = async (e) => {
        if (s.input === "") return;
        const message = s.input;
        s.input = "";

        await fetch(`http://localhost:3000/api/${roomId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                roomId,
                msg: message,
            }),
        });
    };

    const handleInput = (e) => {
        s.input = e.target.value; // Update state when input field changes
    };

    return (
        <div className={styles.chatContainer}>
            <Topbar chatName={match.params.id} />
            <div className={styles.messageContainer}>
                <ul>
                    {messageList.map((msg, idx) => {
                        return msg.user === userId ? (
                            <li className={styles.myMessageField}>
                                <div className={styles.myMessage}>
                                    <p className={styles.content}>{msg.msg}</p>
                                </div>
                                <p className={styles.myName}>
                                    {msg.user.slice(0, 5)}
                                    <span className={styles.otherName}>
                                        {new Date(msg.time)
                                            .toLocaleString()
                                            .slice(11, 100)}
                                    </span>
                                </p>
                            </li>
                        ) : (
                            <li className={styles.otherMessageField} key={idx}>
                                <div className={styles.otherMessage}>
                                    <p className={styles.content}>{msg.msg}</p>
                                </div>
                                <p className={styles.otherName}>
                                    {msg.user.slice(0, 5)}
                                    <span className={styles.otherName}>
                                        {new Date(msg.time)
                                            .toLocaleString()
                                            .slice(11, 100)}
                                    </span>
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <Messageinput
                handleSubmit={handleSubmit}
                handleInput={handleInput}
            />
        </div>
    );
}

export default Chat;
