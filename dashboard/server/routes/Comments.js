import express, { response } from "express";
import AuthSchema from "../models/AuthSchema.js";
import PostSchema from "../models/PostSchema.js";

const router = express.Router();

router.post("/:userID/posts/:postId/comments", async (req, res) => {
  try {
    const postId = req.params.postId;
    const comment = req.body;
    const userID = req.params.userID;

    const findUser = await AuthSchema.findById(userID);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prepare comment object to be added
    const commentObj = {
      userID: userID,
      comments: comment.comments,
    };

    if (comment && comment !== "") {
      const findPost = await PostSchema.findByIdAndUpdate(
        postId,
        { $push: { comments: commentObj } },
        { new: true }
      );

      res.status(200).json(findPost);
    } else {
      res.status(400).json({ message: "Comment Field Is Required " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/:userID/posts/:postId/comments/:commentId/replies",
  async (req, res) => {
    try {
      const postId = req.params.postId;
      const commentId = req.params.commentId; // Extract the commentId from the URL parameters
      const userID = req.params.userID;

      const findUser = await AuthSchema.findById(userID);

      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }
      // Prepare comment object to be added
      const reply = {
        userID: userID,
        comments: req.body.comments, // Assuming you want to add the reply text to the comments field
      };

      const findPost = await PostSchema.findOneAndUpdate(
        { _id: postId, "comments._id": commentId },
        { $push: { "comments.$.replies": reply } },
        { new: true }
      );

      res.status(200).json(findPost);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
);


router.delete("/:userID/post/:postID/delete-replies/:commentID/:replyID",
  async (req, res) => {
    try {
      const { userID, commentID, replyID, postID } = req.params;

      const findUser = await AuthSchema.findById(userID);

      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const findPost = await PostSchema.findById(postID);

      if (!findPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      const findComment = await PostSchema.findOneAndUpdate(
        { _id: postID, "comments._id": commentID },
        { $pull: { "comments.$.replies": { _id: replyID } } },
        { new: true }
      );

      res.status(200).json(findComment);
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  }
);

router.delete("/:userID/post/:postID/delete-comments/:commentID",
  async (req, res) => {
    try {
      const { userID, commentID, postID } = req.params;

      const findUser = await AuthSchema.findById(userID);

      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const findPost = await PostSchema.findById(postID);

      if (!findPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      const findComment = await PostSchema.findOneAndUpdate(
        { _id: postID, "comments._id": commentID },
        { $pull: { comments: { _id: commentID } } },
        { new: true }
      );

      res.status(200).json(findComment);
    } catch (error) {
      console.log(error);
      res.status(200).json(error);
    }
  }
);

export default router;
