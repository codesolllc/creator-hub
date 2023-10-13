import express, { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import UserCategoriesSchema from "../models/UserCategoriesSchema.js";
import AuthSchema from "../models/AuthSchema.js";

const router = express.Router();
// CLoudnary Setings
cloudinary.config({
  cloud_name: "duakbruu3",
  api_key: "264968416977713",
  api_secret: "WERjm3iSewPEo7DTpMKw9fAYZ98",
  secure: true,
});

router.post("/create_user_category", async (req, res) => {
  try {
    const user_category_name = req.body.user_category_name;
    const images = req.files && req.files.category_image;

    const categoryNameCheck = await UserCategoriesSchema.findOne({
      user_category_name: req.body.user_category_name,
    });

    if (
      categoryNameCheck &&
      categoryNameCheck.user_category_name === user_category_name
    ) {
      return res.status(403).json({ message: "Category Already Exists" });
    } else {
      const imageUrls = await cloudinary.uploader.upload(images.tempFilePath);

      const PostingCategory = new UserCategoriesSchema({
        user_category_name: user_category_name,
        category_image: imageUrls.secure_url,
      });
      const saveCategory = await PostingCategory.save();
      res
        .status(200)
        .json({ message: "Category has been created", saveCategory });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get_user_categories", async (req, res) => {
  try {
    const all_user_categories = await UserCategoriesSchema.find();
    res.status(200).json({ message: "All Categories", all_user_categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete_user_categories/:categoryID", async (req, res) => {
  try {
    const categoryID = req.params.categoryID;

    const findCategory = await UserCategoriesSchema.findById(categoryID);

    if (!findCategory) {
      res.status(403).json({ message: "category not found" });
    } else {
      const deletecategory = await UserCategoriesSchema.findByIdAndDelete(
        findCategory._id
      );
      res
        .status(200)
        .json({ message: "category deleted Sucessfully!", deletecategory });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get_user_by_categories/:categoryID", async (req, res) => {
  try {
    const { categoryID } = req.params;

    const findCat = await UserCategoriesSchema.findById(categoryID);

    if (!findCat) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    const FindUsersByCatID = await AuthSchema.find({
      category: { $in: findCat._id },
    });

    if (!FindUsersByCatID) {
      return res
        .status(400)
        .json({ message: "User Does Not Belong To This Category" });
    }
    res.status(200).json({ userData: FindUsersByCatID });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/update-usercategory/:catId", async (req, res) => {
  try {
    const id = req.params.catId;
    const user_category_name = req.body.user_category_name;
    const images = req.files && req.files.category_image;

    const findCat = await UserCategoriesSchema.findById(id);

    if (!findCat) {
      res.status(404).json({ message: "category not found" });
    } else {
      if (images) {
        const imageUrls = await cloudinary.uploader.upload(images.tempFilePath);

        findCat.user_category_name =
          user_category_name || findCat.user_category_name;
        findCat.category_image = imageUrls.secure_url || findCat.category_image;
      } else {
        console.log(user_category_name, "name");
        findCat.user_category_name =
          user_category_name || findCat.user_category_name;
      }
      const updatedUserCategory = await findCat.save();
      res
        .status(200)
        .json({ message: "updated successfully", updatedUserCategory });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
export default router;
