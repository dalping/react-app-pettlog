const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    likeFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };
