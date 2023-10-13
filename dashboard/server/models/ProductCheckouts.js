import mongoose from "mongoose";

const ProductCheckouts = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: false,
    },
    prodID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: false,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    card_number: {
      type: String,
      required: true,
    },
    card_exp_month: {
      type: Number,
      required: true,
    },
    card_exp_year: {
      type: Number,
      required: true,
    },
    card_cvc: {
      type: Number,
      required: true,
    },
    payment_Id: {
      type: String,
      // required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("productCheckout", ProductCheckouts);
