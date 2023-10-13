import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserCardsSchema = new Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      },
    card_number: {
      type: String,
      required: true,
    },
    card_exp_month: {
      type: String,
      required: true,
    },
    card_exp_year: {
      type: String,
      required: true,
    },
    card_cvc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("cards", UserCardsSchema);