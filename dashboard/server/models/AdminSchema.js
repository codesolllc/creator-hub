import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: true,
      },
    profile_Image: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/duakbruu3/image/upload/v1694021142/profileImg_cgymwc_vyakpd.png",
    },
    usertype: {
        type:String,
        required:true,
        default:"Admin",
    }
  },
  {
    timestamps: true,
  }
);

export default model("admin", AdminSchema);
