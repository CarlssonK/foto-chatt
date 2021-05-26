const Room = require('../models/room');
const sseHandler = require("../SSE-handler")

module.exports.index = async (req, res) => {
  console.log("ROOM")
  const rooms = await Room.find({});
  console.log("SEND")
  res.json({rooms})
}


module.exports.showRoom = async (req, res) => {

  const room = await Room.findById(req.params.id).populate({
    path: "messages",
    populate: {
      path: "author"
    }
  }).populate("author");
  if(!room) {
    console.log("CANNOF FIND THAT ROOM")
    return res.redirect("/")
  }


    sseHandler.userJoinRoom(req.user, req.params.id)
    res.json({room})
}