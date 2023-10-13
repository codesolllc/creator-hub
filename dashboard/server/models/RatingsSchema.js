import mongoose from "mongoose";

const { Schema } = mongoose;

const RatingsSchema = new Schema(
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
    ratings: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const RatingsModel = mongoose.model("ratings", RatingsSchema);

export default RatingsModel;