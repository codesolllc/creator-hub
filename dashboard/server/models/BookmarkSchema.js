import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const bookmarkSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
  },
  {
    timestamps: true,
  }
);

export default model("bookmarks", bookmarkSchema);