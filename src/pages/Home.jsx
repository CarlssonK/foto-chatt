import React, { useEffect, useRef, useState } from "react";
import { useStates } from "react-easier";
// ###########################################################
// Temporär page. Funktionaliteten här kommer vara i Chat.jsx
// ###########################################################

function Home() {
    const inputRef = useRef(null);

    const [messageList, setMessageList] = useState([]);

    const s = useStates({
        input: "",
        messageList: [
            { user: "John Smith", msg: "Hello World!", time: "13:33" },
            { user: "Lester Crest", msg: "Hahaha LOL!", time: "13:36" },
        ],
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
            console.log(messageList);
            setMessageList((messageList) => [
                ...messageList,
                { user: "Guest_123", msg: data.msg, time: data.timestamp },
            ]);
            // s.messageList = [
            //     ...s.messageList,
            //     { user: "Guest_123", msg: data.msg, time: data.timestamp },
            // ];
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (s.input === "") return;
        const message = s.input;
        s.input = "";
        inputRef.current.value = "";

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
        s.input = e.target.value;
    };

    return (
        <div className="home">
            <div>Home Page</div>
            <div className="main">
                <ul>
                    {messageList.map((msg, idx) => {
                        return (
                            <li key={idx}>
                                <div>{msg.time}</div>
                                <div>{msg.user}</div>
                                <div>{msg.msg}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="bottom">
                <form onSubmit={handleSubmit}>
                    <input type="text" ref={inputRef} onChange={handleInput} />
                </form>
            </div>
        </div>
    );
}

export default Home;
