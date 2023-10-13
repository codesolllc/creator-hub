import express, { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import ProductCategoriesSchema from "../models/ProductCategoriesSchema.js";


const router = express.Router();
// CLoudnary Setings
cloudinary.config({
  cloud_name: "duakbruu3",
  api_key: "264968416977713",
  api_secret: "WERjm3iSewPEo7DTpMKw9fAYZ98",
  secure: true,
});
  
  router.post('/create_category', async (req, res) => {
    try {
      const category_name = req.body.category_name;
      const images = req.files && req.files.category_image;
  
      const categoryNameCheck = await ProductCategoriesSchema.findOne({
        category_name: req.body.category_name
      });
  
      if (categoryNameCheck && categoryNameCheck.category_name === category_name) {
        return res.status(403).json({ message: "Category Already Exists" });
      } else {
        const imageUrls = await cloudinary.uploader.upload(images.tempFilePath);
  
        const PostingCategory = new ProductCategoriesSchema({
          category_name: category_name,
          category_image: imageUrls.secure_url
        });
  
        const saveCategory = await PostingCategory.save();
        res.status(200).json({ message: "Category has been created", saveCategory });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
  
  router.get("/get_all_categories", async (req, res) => {
    try {
        const categories = await ProductCategoriesSchema.find();
        res.status(200).json({message:"all categories are here", categories})
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
  })

  router.patch("/update_categories/:categoryID", async (req, res) => {
    try {
        const productCategoryId = req.params.categoryID;
        const productCategory = await ProductCategoriesSchema.findById(productCategoryId)

        if(!productCategory){
            res.status(404).json({ message: "category not found", categoryID});
        }else{
            const images = req.files && req.files.category_image;
            
            if (!images && req.body.category_name) {
              productCategory.category_name = req.body.category_name || productCategory.category_name;
              const saveUpdatedCategory = await productCategory.save();
              res.status(200).json({ message:"edited category", saveUpdatedCategory});

            } else if(!req.body.category_name && images) {
              const imageUrls = await cloudinary.uploader.upload(images.tempFilePath);
              productCategory.category_image = imageUrls.secure_url || productCategory.category_image;
              const saveUpdatedCategory = await productCategory.save();
              res.status(200).json({ message:"edited category", saveUpdatedCategory});

            } else{
              const imageUrls = await cloudinary.uploader.upload(images.tempFilePath);
              productCategory.category_name = req.body.category_name || productCategory.category_name;
              productCategory.category_image = imageUrls.secure_url || productCategory.category_image;
              const saveUpdatedCategory = await productCategory.save();
              res.status(200).json({ message:"edited category", saveUpdatedCategory});
              
            }
           
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
  })

  router.delete('/delete/:categoryId', async function(req, res) {
    try {
    const productCategoryId = req.params.categoryId;
    const productCategory = await ProductCategoriesSchema.findById(productCategoryId)

    if (!productCategory) {
        res.status(404).json({ message: 'ProductCategory not found'})
    } else {
        const deleteProductCategory = await ProductCategoriesSchema.findByIdAndDelete(productCategoryId);
        res.status(200).json({message:"Sucessfully deleted" ,deleteProductCategory});
    }
        
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: "category not found", category});
    }
  })



  export default router;