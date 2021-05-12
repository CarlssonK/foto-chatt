const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// app.use("/", (req, res) => {
//     res.send("HELLO SERVER");
// });

app.post("/api/global", (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
