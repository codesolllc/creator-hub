import mongoose from "mongoose";

const RequestProposal = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: false,
    },
    CreatorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: false,
      },
    desired_amount: {
      type: Number,
      required: true,
    },
    work_detail:{
      type: String,
      required: true,
    },
    document_or_picture:{
        type: String,
        required: false,
      }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("requestproposal", RequestProposal);
