import express, { Router } from "express";
import AuthSchema from "../models/AuthSchema.js";
import RatingsModel from "../models/RatingsSchema.js";

const router = express.Router();

router.post("/give_ratings_to/:creatorProfileID/by/:user_id",
  async (req, res) => {
    try {
      const creatorProfileID = req.params.creatorProfileID;
      const user_id = req.params.user_id;

      const findCreator = await AuthSchema.findById(creatorProfileID);
      const finduser = await AuthSchema.findById(user_id);

      if (!findCreator || !finduser) {
        res.status(404).json({ message: "User Not Found!" });
      } else {
        const findAvalaibleRatingsUser = await RatingsModel.findOne({
          $and: [{ creatorProfileID: creatorProfileID }, { user_id: user_id }],
        });

        if(findAvalaibleRatingsUser){
            res.status(400).json({message:"User Already given the Ratings"})
        }else{
        const Saveratings = new RatingsModel({
          user_id: finduser._id,
          creatorProfileID: findCreator._id,
          ratings: req.body.ratings,
        });
        const Ratingsres = await Saveratings.save();
        res.status(200).json({ message: "Ratings has been given to creator", Ratingsres });
      }}
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/get_creator_ratings/:creatorID", async (req, res) => {
    try {
      const creatorID = req.params.creatorID;
      const all_creator_Ratings = await RatingsModel.find({
        creatorProfileID: creatorID,
      }).populate({
        path:"user_id",
        model:"users",
        select:"name profile_Image",
      });
      res
        .status(200)
        .json({ message: "All Creator ratings Here", all_creator_Ratings });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });



export default router;