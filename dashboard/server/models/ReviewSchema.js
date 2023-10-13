import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    creatorProfileID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require:true,
    },
    review: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("review", ReviewSchema);

export default ReviewModel;