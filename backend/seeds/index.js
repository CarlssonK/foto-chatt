const mongoose = require("mongoose");
const names = require("./names");
const Room = require("../models/room");

const dbUrl = "mongodb+srv://dev-team:h713643RgwBQtORv@cluster0.nk4u9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});


// Create 10 random rooms
const seedDB = async () => {
  await Room.deleteMany({});
  for(let i = 0; i < 10; i++) {
    const random50 = Math.floor(Math.random() * 50);
    const room = new Room({
      title: `${names[random50]}`,
    })
    await room.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})