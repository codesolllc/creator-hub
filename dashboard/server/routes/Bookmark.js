import express, { response } from "express";
import AuthSchema from "../models/AuthSchema.js";
import PostModel from "../models/PostSchema.js";
import Bookmark from "../models/BookmarkSchema.js";

const router = express.Router();

router.post("/:userID/bookmark-post/:postID", async (req, res) => {
  try {
    const { userID, postID } = req.params;

    const findUser = await AuthSchema.findById(userID);

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (findUser.usertype !== "user") {
      return res.status(400).json({ message: "Forbidden" });
    }

    const findPosts = await PostModel.findById(postID);

    if (!findPosts) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const findBookMarks = await Bookmark.findOne({
      $and: [{ userID: findUser._id }, { postID: findPosts._id }],
    });

    if (findBookMarks) {
      const deleteExisting = await Bookmark.findOneAndDelete({
        $and: [{ userID: findUser._id }, { postID: findPosts._id }],
      });
      res
        .status(200)
        .json({ deleteExisting, message: "Removed From Bookmarked" });
    } else {
      const bookmark = new Bookmark({
        userID: findUser._id,
        postID: findPosts._id,
      });
      const saveBookmark = await bookmark.save();
      res.status(200).json({ saveBookmark, message: "Added To Bookmark" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/saved-posts/:userID", async (req, res) => {
  try {
    const { userID } = req.params;

    const findUser = await AuthSchema.findById(userID);

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const findBookmarks = await Bookmark.find({
      userID: findUser._id,
    })
      .populate({
        model: "users",
        path: "userID",
        select: "-password",
      })
      .populate({
        model: "posts",
        path: "postID",
        select: "",
      })
      .populate({
        path: "postID",
        populate: {
          path: "authorID",
          model: "users",
          select: "-password",
        },
      });

    res.status(200).json({ savePosts: findBookmarks });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
