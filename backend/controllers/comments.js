// const Comment = require('../models/comment');


// module.exports.showComment = async (req, res) => {
//   const room = await Comment.findById(req.params.id).populate({
//     path: "messages",
//     populate: {
//       path: "author"
//     }
//   }).populate("author");
//   if(!room) {
//     console.log("CANNOF FIND THAT ROOM")
//     return res.redirect("/")
//   }

//     sseHandler.userJoinRoom(req.user, req.params.id)
//     res.json({room})
// }