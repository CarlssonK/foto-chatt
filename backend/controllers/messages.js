const Room = require("../models/room");
const Message = require("../models/message");
const Comment = require("../models/comment");
const sseHandler = require("../SSE-handler");

module.exports.getAllPhotos = async (req, res) => {
  const message = await Message.find({})
    .populate({
      path: "comments",
      populate: {
        path: "author",
      },
    })
    .populate("author");

  const filterByPhoto = message.filter((msg) => msg.images.length > 0);

  res.json({ filterByPhoto });
};

module.exports.showMessage = async (req, res) => {
  const message = await Message.findById(req.params.id)
    .populate({
      path: "comments",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!message) {
    console.log("CANNOF FIND THAT MESSAGE");
    return res.redirect("/");
  }

  // sseHandler.userJoinRoom(req.user, req.params.id)
  res.json({ message });
};

module.exports.createMessage = async (req, res) => {
  const room = await Room.findById(req.params.id);
  const message = new Message(req.body);
  message.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  if (message.images.length > 0) {
    const hashtags = findHashtags(message.text);
    console.log(hashtags);
    message.tags = hashtags;
  }
  message.author = req.user._id;

  console.log(message);

  room.messages.push(message);
  await message.save();
  await room.save();

  // Format objext in a nice way that we can send vie SSE and read it properly on the client side
  const messageObject = {
    id: message._id,
    message: message.text,
    images: message.images,
    sent: message.sent,
    author: { id: message.author, username: req.user.username },
  };

  sseHandler.sendMessage(messageObject, req.params.id);
  res.send("ok");
};

module.exports.createComment = async (req, res) => {
  const image = await Message.findById(req.params.id);
  const comment = new Comment(req.body);
  comment.author = req.user._id;
  image.comments.push(comment);
  // // message.images = req.files.map(f => ({url: f.path, filename: f.filename}))
  // // message.author = req.user._id
  // // room.messages.push(message);
  await comment.save();
  await image.save();
};

// module.exports.deleteMessage = async (req, res) => {
//   const { id, reviewId } = req.params;
//   await Campground.findByIdAndUpdate(id,{ $pull: {reviews: reviewId} })
//   await Review.findByIdAndDelete(reviewId);
//   req.flash("success", "Successfully deleted review!")
//   res.redirect(`/campgrounds/${id}`)
// }

// // Show messages
// module.exports.showRoomMessages = async (req, res,) => {
//   const campground = await Campground.findById(req.params.id).populate({
//     path: "reviews",
//     populate: {
//       path: "author"
//     }
//   }).populate("author");
//   if(!campground) {
//     req.flash("error", "Cannot find that campground!")
//     return res.redirect("/campgrounds")
//   }
//   res.render('campgrounds/show', { campground });
// }

function findHashtags(searchText) {
  var regexp = /\B#\w\w+\b/g;
  let result = searchText.match(regexp);
  if (result) {
    return result;
  } else {
    return false;
  }
}
