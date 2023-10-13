import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },

  image: {
    type: String,
    required: false,
  },
  video: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],
  comments: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
      comments: String,
      replies: [
        {
          userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
          },
          comments: String,
        },
      ],
    },
  ],
});

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
