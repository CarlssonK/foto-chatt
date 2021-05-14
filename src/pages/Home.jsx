import React, { useEffect, useRef } from "react";
import { useStates } from "react-easier";
// ###########################################################
// Temporär page. Funktionaliteten här kommer vara i Chat.jsx
// ###########################################################

function Home() {
    const input = useRef(null);

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
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (s.input === "") return;
        const message = s.input;
        s.input = "";
        input.current.value = "";

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
                    <li>msg: hasdhashd</li>
                    <li>msg: hasdhashd2</li>
                    <li>msg: hasdhashd123123</li>
                </ul>
            </div>
            <div className="bottom">
                <form onSubmit={handleSubmit}>
                    <input type="text" ref={input} onChange={handleInput} />
                </form>
            </div>
        </div>
    );
}

export default Home;
