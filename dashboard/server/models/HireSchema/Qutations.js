import mongoose from "mongoose";

const QutationsSchema = new mongoose.Schema(
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
      proposalID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "requestproposal",
        unique: false,
      },
    amount: {
      type: Number,
      required: true,
    },
    message:{
      type: String,
      required: true,
    },
    accepted:{
        type:[String],
        required:true,
        enum:["true", "false", "pending"],
        default:["pending"]
    },
    status:{
      type:[String],
      required:true,
      enum:["completed", "notcompleted", "inprogress", "pending"],
      default:["pending"]
  }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("qutations", QutationsSchema);
