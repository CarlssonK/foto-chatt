import React from "react";

function Home() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:3000/api/global", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ msg: "hello" }),
        });
        const data = await res.json();
        console.log(data);
    };

    return (
        <>
            <h1>Home Page</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" />
            </form>
        </>
    );
}

export default Home;
