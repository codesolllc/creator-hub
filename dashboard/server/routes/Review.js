import express, { Router } from "express";
import AuthSchema from "../models/AuthSchema.js";
import ReviewModel from "../models/ReviewSchema.js";

const router = express.Router();

router.post("/give_Review_to/:creatorProfileID/by/:user_id",
  async (req, res) => {
    try {
      const creatorProfileID = req.params.creatorProfileID;
      const user_id = req.params.user_id;

      const findCreator = await AuthSchema.findById(creatorProfileID);
      const finduser = await AuthSchema.findById(user_id);

      if (!findCreator || !finduser) {
        res.status(403).json({ message: "User Not Found!" });
      } else {
        const SaveReview = new ReviewModel({
          user_id: finduser._id,
          creatorProfileID: findCreator._id,
          review: req.body.review,
        });

        const Reviewres = await SaveReview.save();
        res.status(200).json({ message: "Review has been created", Reviewres });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/get_creator_reviews/:creatorID", async (req, res) => {
  try {
    const creatorID = req.params.creatorID;
    const all_creator_reviews = await ReviewModel.find({
      creatorProfileID: creatorID,
    }).populate({
      path:"user_id",
      model:"users",
      select:"name profile_Image",
    });
    res
      .status(200)
      .json({ message: "All Creator Reviews Here", all_creator_reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/delete_review/:reviewID/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const reviewID = req.params.reviewID;

    const checkuser = await AuthSchema.findById(userID);
    if (!checkuser) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      if (checkuser.usertype === "user") {
        const deletereview = await ReviewModel.findByIdAndDelete(reviewID);
        res
          .status(200)
          .json({ message: "Review has been deleted", deletereview });
      } else {
        res.status(401).json({ message: "Unauthorized User!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
