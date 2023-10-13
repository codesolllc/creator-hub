import express from "express";
import GigNotif from "../models/Notifications/GigNotif.js";
import AuthSchema from "../models/AuthSchema.js";
import ProductNotif from "../models/Notifications/ProductNotif.js";
import PostNotif from "../models/Notifications/PostNotif.js";

const router = express.Router();

router.get("/:userID/gig-notifications", async (req, res) => {
  try {
    const { userID } = req.params;
    const findUser = await AuthSchema.findOne({
      _id: userID,
      usertype: "creator",
    });
    if (!findUser) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    const getGigNotif = await GigNotif.find()
      .populate({
        path: "userID",
        model: "users",
        select: "profile_Image",
      })
      .populate({
        path: "gigID",
        model: "gigs",
      });
    res.status(200).json(getGigNotif);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/product-notifications", async (req, res) => {
  try {
    const getProductNotif = await ProductNotif.find()
      .populate({
        path: "userID",
        model: "users",
        select: "profile_Image",
      })
      .populate({
        path: "prodID",
        model: "products",
      });
    res.status(200).json(getProductNotif);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

router.get("/:userID/post-notifications", async (req, res) => {
  try {
    const { userID } = req.params;
    const findUser = await AuthSchema.findOne({
      _id: userID,
    });
    if (!findUser) {
      return res.status(404).json({ message: "Unauthorized" });
    }
    const getPostNotif = await PostNotif.find()
      .populate({
        path: "userID",
        model: "users",
        select: "profile_Image",
      })
      .populate({
        path: "postID",
        model: "posts",
      });
    res.status(200).json(getPostNotif);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
});

export default router;
