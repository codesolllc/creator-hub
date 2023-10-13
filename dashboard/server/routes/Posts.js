import express from "express";
import { v2 as cloudinary } from "cloudinary";
import AuthSchema from "../models/AuthSchema.js";
import PostSchema from "../models/PostSchema.js";
import BookmarkSchema from "../models/BookmarkSchema.js";
import PostNotif from "../models/Notifications/PostNotif.js";

const router = express.Router();
// CLoudnary Setings

cloudinary.config({
  cloud_name: "duakbruu3",
  api_key: "264968416977713",
  api_secret: "WERjm3iSewPEo7DTpMKw9fAYZ98",
  secure: true,
});

router.post("/:authorID/create-post", async (req, res) => {
  try {
    const { title, description } = req.body;
    const { authorID } = req.params;
    const findUser = await AuthSchema.findById(authorID);

    const images = req.files && req.files.image;
    const video = req.files && req.files.video;

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      if (!images && video) {
        const videoUrls = video
          ? await cloudinary.uploader.upload(video.tempFilePath, {
              resource_type: "video",
            })
          : "";
        const postingOfPosts = new PostSchema({
          authorID: findUser._id,
          video: videoUrls.secure_url,
          image: "",
          title,
          description,
        });

        const savePost = await postingOfPosts.save();
        // Notifications
        const createNotif = new PostNotif({
          userID: findUser._id,
          postID: savePost._id,
          title: `${findUser.name} created a new post`,
          message: savePost.description,
        });
        await createNotif.save();
        res.status(200).json({ message: "Post has been created", savePost });
        console.log("video Post");
      } else if (images && !video) {
        const imageUrls = images
          ? await cloudinary.uploader.upload(images.tempFilePath)
          : "";

        const postingOfPosts = new PostSchema({
          authorID: findUser._id,
          video: "",
          image: imageUrls.secure_url,
          title,
          description,
        });

        const savePost = await postingOfPosts.save();
        // Notifications
        const createNotif = new PostNotif({
          userID: findUser._id,
          postID: savePost._id,
          title: `${findUser.name} created a new post`,
          message: savePost.description,
        });
        await createNotif.save();
        res.status(200).json({ message: "Post has been created", savePost });
      } else if (!images && !video && title && description) {
        const postingOfPosts = new PostSchema({
          authorID: findUser._id,
          title,
          description,
          video: "",
          image: "",
        });
        const savePost = await postingOfPosts.save();

        // Notifications
        const createNotif = new PostNotif({
          userID: findUser._id,
          postID: savePost._id,
          title: `${findUser.name} created a new post`,
          message: savePost.description,
        });
        await createNotif.save();
        console.log(createNotif);

        res.status(200).json({ message: "Post has been created", savePost });
        console.log("Content Post");
      } else {
        res
          .status(400)
          .json({ message: "You Cant Upload Images And Videos Together" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/get-posts/:authorID", async (req, res) => {
  try {
    const { authorID } = req.params;

    const findUser = await AuthSchema.findById(authorID);

    const findPosts = await PostSchema.find({ authorID: findUser });

    res.status(200).json(findPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/get_single_post/:postID", async (req, res) => {
  try {
    const postID = req.params.postID;
    const findPost = await PostSchema.findById(postID)
      .populate({
        path: "authorID",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "comments.userID",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "comments.replies.userID",
        model: "users",
        select: "name profile_Image",
      });

    if (!findPost) {
      res.status(403).json({ message: "User Not Found" });
    } else {
      findPost.comments.reverse();
      findPost.comments.forEach((comment) => {
        comment.replies.reverse();
      });
      res.status(200).json(findPost);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/all-posts", async (req, res) => {
  try {
    const findPosts = await PostSchema.find()
      .populate({
        path: "authorID",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "comments.userID",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "comments.replies.userID",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "likes.userID",
        model: "users",
        select: "-password",
      });
    const reversed = findPosts.reverse();
    res.status(200).json(reversed);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/:userID/all-posts", async (req, res) => {
  try {
    const { userID } = req.params;
    const findUser = await AuthSchema.findById(userID);
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const findPosts = await PostSchema.find()
      .populate({
        path: "authorID",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "comments.userID",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "comments.replies.userID",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "likes.userID",
        model: "users",
        select: "-password",
      });

    const postIDs = findPosts.map((post) => post._id);

    const findBookMarks = await BookmarkSchema.find({
      userID: userID,
      postID: { $in: postIDs },
    });

    const bookmarks = {};
    findBookMarks.forEach((bookmark) => {
      bookmarks[bookmark.postID] = true;
    });

    const merged = findPosts.map((post) => ({
      ...post.toObject(),
      bookmark: bookmarks[post._id] || false, // Check if the post has a bookmark
    }));

    const reversed = merged.reverse();

    res.status(200).json(reversed);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/:authorID/edit-posts/:PostID", async (req, res) => {
  try {
    const Post_Id = req.params.PostID;
    const Author_Id = req.params.authorID;
    const { title, description } = req.body;

    const findUser = await AuthSchema.findById(Author_Id);
    const findpost = await PostSchema.findById(Post_Id);

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    } else if (!findpost) {
      return res.status(404).json({ message: "Post Not Found" });
    } else {
      if (findpost.authorID.toString() === Author_Id.toString()) {
        const images = req.files && req.files.imageUrls;
        const video = req.files && req.files.videoUrls;

        if (!images && video) {
          const videoUrls = await cloudinary.uploader.upload(
            video.tempFilePath,
            {
              resource_type: "video",
            }
          );

          findpost.video = videoUrls.secure_url || findpost.video;
          findpost.image = "";
          findpost.title = title || findpost.title;
          findpost.description = description || findpost.description;
          const saveUpdated = await findpost.save();

          res.status(200).json(saveUpdated);
        } else if (images && !video) {
          const imageUrls = await cloudinary.uploader.upload(
            images.tempFilePath
          );

          findpost.image = imageUrls.secure_url || findpost.image;
          findpost.title = title || findpost.title;
          findpost.description = description || findpost.description;
          findpost.video = "";
          const saveUpdated = await findpost.save();

          res.status(200).json(saveUpdated);
        } else if (!images && !video && title && description) {
          findpost.title = title || findpost.title;
          findpost.description = description || findpost.description;
          findpost.video = "";
          findpost.image = "";
          const saveUpdated = await findpost.save();
          res.status(200).json(saveUpdated);
        } else {
          res
            .status(400)
            .json({ message: "You Cant Upload Images And Videos Together" });
        }
      } else {
        return res.status(401).json({ message: "Unauthorized User" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/:authorID/delete-posts/:PostID", async (req, res) => {
  try {
    const Post_Id = req.params.PostID;
    const Author_Id = req.params.authorID;
    const findUser = await AuthSchema.findById(Author_Id);
    const findpost = await PostSchema.findById(Post_Id);
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    } else if (!findpost) {
      return res.status(404).json({ message: "Post Not Found" });
    } else {
      if (findpost.authorID.toString() === Author_Id.toString()) {
        const deletePost = await PostSchema.findByIdAndDelete(Post_Id);
        res.status(200).json(deletePost);
      } else {
        return res.status(401).json({ message: "Unauthorized User" });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/:userID/like/:postID", async (req, res) => {
  try {
    const { postID, userID } = req.params;

    // Fetch the user and post objects
    const findPost = await PostSchema.findById(postID);
    const findUser = await AuthSchema.findById(userID);

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    if (!findPost) {
      return res.status(404).json({ message: "Post Not Found" });
    } else {
      const userExists = findUser._id;
      // Check if the user ID is already in the likes array for the current post
      const userIndex = findPost.likes.findIndex((like) =>
        like.userID.equals(userExists)
      );
      if (userIndex !== -1) {
        // If the user ID is in the likes array for the current post, remove it.
        findPost.likes.splice(userIndex, 1);
      } else {
        // If the user ID is not in the likes array for the current post, add it with user details.
        findPost.likes.push({
          userID: userExists._id,
        });
      }

      const saveRes = await findPost.save();

      res.status(200).json({ message: "Liked", likes: saveRes.likes });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/delete-posts/:PostID", async (req, res) => {
  try {
    const Post_Id = req.params.PostID;
    const findpost = await PostSchema.findByIdAndDelete(Post_Id);
    if (!findpost) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    res.status(200).json({ messaeg: "Post Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
