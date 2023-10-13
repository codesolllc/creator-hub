import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const productNotif = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    prodID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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

export default model("productNotif", productNotif);
