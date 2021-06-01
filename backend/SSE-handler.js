// List of all connections, their userId and what roomId they current are in
let connections = [];

module.exports = (app) => {
  // Route for SSE
  app.get("/api/sse", (req, res) => {
    // don't connect users that are not logged in
    if (!req.user) {
      res.json({ error: "Not logged in!" });
      return;
    }

    let connection = { res, user: req.user };

    connections.push(connection);

    // Remove connection on close
    req.on("close", () => {
      const user = connections.find(
        (e) =>
          e.user.email === req.user.email &&
          e.user.username === req.user.username
      );

      connections = connections.filter((x) => x !== connection);

      notifyJoinLeave(user.roomId);
    });

    // send headers telling the browser this is SSE and no cache
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    });

    // Send connect message to user
    res.write(
      "event: connect\n" +
        "data: " +
        JSON.stringify({ message: "connected" }) +
        "\n\n"
    );
  });

  app.get("/api/leaveroom", (req, res) => {
    let roomId;
    connections = connections.map((e) => {
      if (
        e.user.email === req.user.email &&
        e.user.username === req.user.username
      ) {
        roomId = e.roomId;
        e.roomId = null;
      }
      return e;
    });
    notifyJoinLeave(roomId);
    res.send("ok");
  });

  // Set roomId to the user object in connections array
  module.exports.userJoinRoom = (user, roomId) => {
    connections = connections.map((e) => {
      if (e.user.email === user.email && e.user.username === user.username) {
        e.roomId = roomId;
      }
      return e;
    });
    notifyJoinLeave(roomId);
  };

  module.exports.sendMessage = (message, roomId) => {
    const clients = connections.filter((e) => e.roomId === roomId); // filter out clients for relevant room
    for (let obj of clients) {
      // syntax for a SSE message: 'event: message \ndata: "the-message" \n\n'
      obj.res.write(
        "event:" + "new-message" + "\ndata:" + JSON.stringify(message) + "\n\n"
      );
    }
  };

  const notifyJoinLeave = (roomId) => {
    const clients = connections.filter((e) => e.roomId === roomId); // filter out clients for relevant room

    const clientsData = clients.map((e) => {
      return { username: e.user.username, image: "userimagehere.jpg" };
    });

    for (let obj of clients) {
      // syntax for a SSE message: 'event: message \ndata: "the-message" \n\n'
      obj.res.write(
        "event:" +
          "join-leave" +
          "\ndata:" +
          JSON.stringify(clientsData) +
          "\n\n"
      );
    }
  };

  // Send a message via SSE
  function sendSSE(res, eventType, data) {
    // send
    res.write(
      `event: ${eventType}\n` + "data: " + JSON.stringify(data) + "\n\n"
    );
  }

  // Heartbeat (send empty messages with 20 second delays)
  // helps keep the connection alive - some proxies close it otherwise
  setInterval(
    () =>
      connections.forEach(({ res }) => sendSSE(res, "heartbeat", new Date())),
    20000
  );
};
