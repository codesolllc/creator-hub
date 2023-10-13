import mongoose from "mongoose";
const { Schema } = mongoose;

const CommunitySchema = new Schema(
  {
    user_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    //   require: true,
    },
    status: {
      type: [String],
      required: true,
      enum:
      ["pending" ,"accepted"],
      default:["pending"]
    },
    requests:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
        },
  },
  { timestamps: true }
);

const CommunityModel = mongoose.model("community", CommunitySchema);
export default CommunityModel;
