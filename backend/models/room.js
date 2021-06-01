const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const ImageSchema = new Schema({
//   url: String,
//   filename: String
// })

// ImageSchema.virtual("thumbnail").get(function() {
//   return this.url.replace("/upload", "/upload/w_200")
// })

const opts = { toJSON: { virtuals: true } };

const RoomSchema = new Schema(
  {
    title: String,
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
    users: [String],
  },
  opts
);

module.exports = mongoose.model("Room", RoomSchema);
