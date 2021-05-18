import React, { useEffect, useRef, useState } from "react";
import { useStates } from "react-easier";
import Messageinput from "../components/Messageinput";
import MyMessageField from "../components/MyMessageField";
import OtherMessageField from "../components/OtherMessageField";
import Topbar from "../components/Topbar";
import styles from "../styles/Chat.module.css";

function Chat({ match }) {
    const [messageList, setMessageList] = useState([]);
    const [userJoin, setUserJoin] = useState([]);
    const [userLeave, setUserLeave] = useState([]);

    const s = useStates({
        input: "",
        userId: "",
        roomId: "",
    });

    useEffect(() => {
        s.roomId = match.params.id;

        if (s.roomId.length > 0 && s.userId.length > 0) {
            fetch(
                `http://localhost:3000/api/joinchat?roomId=${s.roomId}&userId=${s.userId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            );
        }
    }, [match.params.id, s.userId]);

    useEffect(() => {
        startSSE();
    }, []);

    const startSSE = () => {
        let sse = new EventSource("/api/sse");

        // Retrieve your unique userId from the server
        sse.addEventListener("user-id", (message) => {
            let data = JSON.parse(message.data);
            s.userId = data.userId;
        });

        sse.addEventListener("connect", (message) => {
            let data = JSON.parse(message.data);
            console.log("[connect]", data);
            setUserJoin((userJoin) => [data.user, ...userJoin]);
        });

        sse.addEventListener("disconnect", (message) => {
            let data = JSON.parse(message.data);
            console.log("[disconnect]", data);
            // setUserLeave((userLeave) => data.user);
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

        await fetch(`http://localhost:3000/api/${s.roomId}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: s.userId,
                roomId: s.roomId,
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
                        return msg.user === s.userId ? (
                            <MyMessageField
                                key={idx}
                                message={msg.msg}
                                user={msg.user}
                                time={msg.time}
                            />
                        ) : (
                            <OtherMessageField
                                key={idx}
                                message={msg.msg}
                                user={msg.user}
                                time={msg.time}
                                userList={userList}
                            />
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
