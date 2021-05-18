import React, { useEffect, useRef, useState } from "react";
import { useStates } from "react-easier";
import Messageinput from "../components/Messageinput";
import Topbar from "../components/Topbar";
import styles from "../styles/Chat.module.css";

function Chat() {
    const [messageList, setMessageList] = useState([]);

    const s = useStates({
        input: "",
    });

    useEffect(() => {
        startSSE();
    }, []);

    const startSSE = () => {
        let sse = new EventSource("/api/sse");

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
                { user: "Guest_123", msg: data.msg, time: data.timestamp },
                ...messageList,
            ]);
        });
    };

    const handleSubmit = async (e) => {
        if (s.input === "") return;
        const message = s.input;
        s.input = "";

        await fetch("http://localhost:3000/api/global", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ msg: message }),
        });
    };

    const handleInput = (e) => {
        s.input = e.target.value; // Update state when input field changes
    };

    return (
        <div className={styles.chatContainer}>
            <Topbar />
            <div className={styles.messageContainer}>
                {/* <div className={styles.otherMessageField}>
                    <div className={styles.otherMessage}>
                        <p className={styles.content}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Assumenda commodi, reprehenderit.
                        </p>
                    </div>
                    <p className={styles.otherName}>John Doe</p>
                </div>
                <div className={styles.otherMessageField}>
                    <div className={styles.otherMessage}>
                        <p className={styles.content}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatem, dolorum. Voluptates dignissimos
                            laborum animi, quaerat recusandae illo deleniti
                            nobis commodi!
                        </p>
                    </div>
                    <p className={styles.otherName}>John Doe</p>
                </div> */}
                <ul>
                    <li className={styles.myMessageField}>
                        <div className={styles.myMessage}>
                            <p className={styles.content}>
                                Lorem ipsum dolor sit
                            </p>
                        </div>
                        <p className={styles.myName}>Jane Doe</p>
                    </li>
                    {messageList.map((msg, idx) => {
                        return (
                            <li className={styles.otherMessageField} key={idx}>
                                <div className={styles.otherMessage}>
                                    <p className={styles.content}>{msg.msg}</p>
                                </div>
                                <p className={styles.otherName}>
                                    {msg.user}
                                    <span className={styles.otherName}>
                                        {new Date(msg.time)
                                            .toLocaleString()
                                            .slice(11, 100)}
                                    </span>
                                </p>
                            </li>
                            // <li key={idx}>
                            //     <div>{msg.time}</div>
                            //     <div>{msg.user}</div>
                            //     <div>{msg.msg}</div>
                            // </li>
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
