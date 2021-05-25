const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CommentSchema = new Schema({
  text: String,
  sent: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Comment", CommentSchema);
