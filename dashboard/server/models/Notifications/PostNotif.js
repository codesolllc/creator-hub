import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const postNotif = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("postNotif", postNotif);
