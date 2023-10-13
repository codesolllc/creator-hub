import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const GigSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    gigID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gigs",
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

export default model("gigNotif", GigSchema);
