import express from "express";
import { v2 as cloudinary } from "cloudinary";
import AuthSchema from "../models/AuthSchema.js";
import GigsModel from "../models/GigsSchema.js";
import Gig_ApplicantsModel from "../models/Gig_Applicants.js";
import GigNotif from "../models/Notifications/GigNotif.js";

const router = express.Router();
// CLoudnary Setings
cloudinary.config({
  cloud_name: "duakbruu3",
  api_key: "264968416977713",
  api_secret: "WERjm3iSewPEo7DTpMKw9fAYZ98",
  secure: true,
});

router.post("/create_gig/:authorID", async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const { authorID } = req.params;
    const findUser = await AuthSchema.findById(authorID);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    } else {
      if (findUser.usertype !== "creator") {
        const images = req.files && req.files.image;
        if (images) {
          const imageUrls = await cloudinary.uploader.upload(
            images.tempFilePath
          );
          const creating_Gig = new GigsModel({
            authorID: findUser._id,
            image: imageUrls.secure_url,
            title,
            description,
            price,
          });
          const saveGig = await creating_Gig.save();

          // Notifications
          const createGigNotif = new GigNotif({
            userID: findUser._id,
            gigID: saveGig._id,
            title: `Gig Has Created By ${findUser.name}`,
            message: saveGig.description,
          });
          await createGigNotif.save();

          res.status(200).json({ message: "Gig has been created", saveGig });
        } else {
          const creating_Gig = new GigsModel({
            authorID: findUser._id,
            image: "",
            title,
            description,
            price,
          });
          const saveGig = await creating_Gig.save();

          // Notifications
          const createGigNotif = new GigNotif({
            userID: findUser._id,
            gigID: saveGig._id,
            title: `Gig Has Created By ${findUser.name}`,
            message: saveGig.description,
          });
          await createGigNotif.save();

          res.status(200).json({ message: "Gig has been created", saveGig });
        }
      } else {
        res.status(401).json({ message: "Unauthorized User" });
      }
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/getgigs/:authorID", async (req, res) => {
  try {
    const { authorID } = req.params;
    const findUser = await AuthSchema.findById(authorID);

    if (!findUser) {
      res.status(404).json({ message: "User not Found" });
    } else {
      const UserGigs = await GigsModel.find({
        authorID: findUser._id,
      }).populate({
        path: "authorID",
        model: "users",
        select: "name profile_Image",
      });
      res.status(200).json(UserGigs);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/single-gigs/:gigID", async (req, res) => {
  try {
    const { gigID } = req.params;
    const findGigs = await GigsModel.findById(gigID);

    if (!findGigs) {
      res.status(404).json({ message: "Gig not Found" });
    } else {
      const gig = await GigsModel.findById(gigID).populate({
        path: "authorID",
        model: "users",
        select: "name profile_Image",
      });
      res.status(200).json(gig);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/allgigs", async (req, res) => {
  try {
    const AllGigs = await GigsModel.find().populate({
      path: "authorID",
      model: "users",
      select: "name profile_Image",
    });
    res.status(200).json(AllGigs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/update_gigs/:gigID/:authorID", async (req, res) => {
  try {
    const { gigID, authorID } = req.params;
    const findUser = await AuthSchema.findById(authorID);
    const { title, description, price } = req.body;
    const images = req.files && req.files.imageUrls;
    const findGigs = await GigsModel.findOne({
      $and: [{ authorID: authorID, _id: gigID }],
    });

    if (!findUser) {
      res.status(404).json({ message: "User not Found" });
    } else {
      if (!findGigs) {
        res.status(404).json({ message: "gig not Found" });
      } else {
        if (images) {
          const imageUrls = await cloudinary.uploader.upload(
            images.tempFilePath
          );
          findGigs.image = imageUrls.secure_url || findGigs.image;
          findGigs.title = title || findGigs.title;
          findGigs.description = description || findGigs.description;
          findGigs.price = price || findGigs.price;
        } else {
          findGigs.title = title || findGigs.title;
          findGigs.description = description || findGigs.description;
          findGigs.price = price || findGigs.price;
        }
        const saveUpdated = await findGigs.save();
        res.status(200).json(saveUpdated);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/delete/:authorId/:gigsId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const gigsId = req.params.gigsId;
    const findUser = await AuthSchema.findById(authorId);
    const findgig = await GigsModel.findById(gigsId);
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    } else if (!findgig) {
      return res.status(404).json({ message: "Gig Not Found" });
    } else {
      if (findgig.authorID.toString() === findUser._id.toString()) {
        const deleteGig = await GigsModel.findByIdAndDelete(findgig._id);
        res
          .status(200)
          .json({ message: "Gig removed Successfully", deleteGig });
      } else {
        return res.status(401).json({ message: "Unauthorized User" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/gig_applicants/:creatorID/:gigID", async (req, res) => {
  try {
    const creatorID = req.params.creatorID;
    const gigID = req.params.gigID;
    const findApplicant = await AuthSchema.findById(creatorID);

    if (!findApplicant && findApplicant.usertype === "creator") {
      res.status(404).json({ message: "User Not Found!" });
    } else {
      const find_Gig = await GigsModel.findById(gigID);

      const validateApplicant = await Gig_ApplicantsModel.findOne({
        $and: [{ gigID: find_Gig._id.toString() }, { applicant_id: creatorID }],
      });

      if (validateApplicant) {
        return res
          .status(400)
          .json({ message: "You Have Already Applied On This Job" });
      }

      if (!find_Gig) {
        res.status(404).json({ message: "Gig Not Found!" });
      } else {
        const save_applicant = new Gig_ApplicantsModel({
          applicant_id: findApplicant._id,
          gigID: gigID,
          userId: find_Gig.authorID,
        });
        const save = await save_applicant.save();
        res
          .status(200)
          .json({ message: "You have applied Succesfully!", save });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/applicants_of_gigs/:userID/:gigID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const gigID = req.params.gigID;
    const find_user = await AuthSchema.findById(userID);
    if (!find_user) {
      res.status(404).json({ message: "User Not Found!" });
    } else {
      const find_Gig = await GigsModel.findById(gigID);
      if (!find_Gig) {
        res.status(404).json({ message: "Gig Not Found" });
      } else {
        const find_gig_applicants = await Gig_ApplicantsModel.find({
          gigID: gigID,
        })
          .populate({
            path: "applicant_id",
            model: "users",
            select: "name profile_Image",
          })
          .populate({
            path: "gigID",
            model: "gigs",
            select: "title description price",
          })
          .populate({
            path: "userId",
            model: "users",
            select: "name profile_Image",
          });
        res.status(200).json({
          message: "Here are the applicants of that gig",
          find_gig_applicants,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
