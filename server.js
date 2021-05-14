const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Post new message in global chat
app.post("/api/global", (req, res) => {
    let message = req.body;

    // set timestamp
    message.timestamp = Date.now();

    // message all open client with new message
    broadcast("new-message", message);

    res.send("ok");
});

// List of connections
let connections = [];

// Route for SSE
app.get("/api/sse", (req, res) => {
    // // Add the response to open connections
    connections.push(res);

    console.log("NEW USER");

    // Remove connection on close
    req.on("close", () => {
        connections = connections.filter((openRes) => openRes != res);

        // message all open connections that a client disconnected
        broadcast("disconnect", {
            message: "client disconnected",
        });
    });

    // Set headers to mark that this is SSE
    // and that we don't close the connection
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });

    // message all connected clients that this
    // client connected
    broadcast("connect", {
        message: "clients connected: " + connections.length,
    });
});

// function to send message to all connected clients
function broadcast(event, data) {
    // loop through all open connections and send
    // some data without closing the connection (res.write)
    for (let res of connections) {
        // syntax for a SSE message: 'event: message \ndata: "the-message" \n\n'
        res.write("event:" + event + "\ndata:" + JSON.stringify(data) + "\n\n");
    }
}

// Generate Random User ID
function userId() {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
