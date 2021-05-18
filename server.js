const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// List of all connections, their userId and what roomId they current are in
// Example: {res, userId: 778ea670-24ac-423a-a76f-587bde30bb9a, roomId: sports}
let connections = [];

// Route for SSE
app.get("/api/sse", (req, res) => {
    // Add the response to open connections
    const userId = guid();
    connections.push({ res, userId });

    // Remove connection on close
    req.on("close", () => {
        connections = connections.filter((openRes) => openRes.res != res);

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
        userId,
    });

    // Send userId to client
    res.write(
        "event:" + "user-id" + "\ndata:" + JSON.stringify({ userId }) + "\n\n"
    );
});

// Join user to room
app.get("/api/joinchat", (req, res) => {
    const { roomId } = req.query;
    const { userId } = req.query;

    connections = connections.map((openRes) => {
        if (openRes.userId === userId) {
            openRes.roomId = roomId;
        }
        return openRes;
    });

    res.send("ok");
});

// Post new message
app.post("/api/:id", (req, res) => {
    const message = req.body;
    const { userId } = req.body;
    const { roomId } = req.body;

    // set timestamp
    message.timestamp = Date.now();

    // message all open client with new message
    broadcast("new-message", message, roomId);

    res.send("ok");
});

// function to send message to all connected clients
function broadcast(event, message, roomId) {
    // loop through all open connections and send
    // some data without closing the connection (res.write)
    const clients = connections.filter((con) => con.roomId === roomId); // filter out clients for relevant room
    for (let obj of clients) {
        // syntax for a SSE message: 'event: message \ndata: "the-message" \n\n'
        obj.res.write(
            "event:" + event + "\ndata:" + JSON.stringify(message) + "\n\n"
        );
    }
}

// Generates unique guid (i.e. unique user ID)
const guid = () => {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
};

// // Generate Random User ID
// function userId() {
//     let result = "";
//     let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     let charactersLength = characters.length;
//     for (let i = 0; i < 6; i++) {
//         result += characters.charAt(
//             Math.floor(Math.random() * charactersLength)
//         );
//     }
//     return result;
// }

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
