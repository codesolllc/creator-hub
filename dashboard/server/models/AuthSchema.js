import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const AuthSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile_Image: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/duakbruu3/image/upload/v1694021142/profileImg_cgymwc_vyakpd.png",
    },
    banner_Img: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/duakbruu3/image/upload/v1694023307/purplebg_ar1qp9.jpg",
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    category: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "usercategories",
    },
    password: {
      type: String,
      required: true,
    },
    usertype: {
      type: String,
      required: true,
    },
    recomended: {
      type: Boolean,
      required: true,
      default: false,
    },
    otpCode: {
      type: Number,
    },
    otpExpire: {
      type: Date,
    },
    about: {
      type: String,
    },
    desc: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model("users", AuthSchema);
