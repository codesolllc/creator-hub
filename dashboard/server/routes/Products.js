import express from "express";
import { v2 as cloudinary } from "cloudinary";
import ProductsSchema from "../models/ProductsSchema.js";
import AuthSchema from "../models/AuthSchema.js";
import ProductCategoriesSchema from "../models/ProductCategoriesSchema.js";
import ProductNotif from "../models/Notifications/ProductNotif.js";

const router = express.Router();

cloudinary.config({
  cloud_name: "duakbruu3",
  api_key: "264968416977713",
  api_secret: "WERjm3iSewPEo7DTpMKw9fAYZ98",
  secure: true,
});

router.post("/:userID/create-product", async (req, res) => {
  try {
    const { userID } = req.params;

    //handle Single image from cloudnary
    const featuredImages = req.files && req.files.featured_image;
    const featuredUpload = await cloudinary.uploader.upload(
      featuredImages.tempFilePath
    );

    //handle Multiple images from cloudnary
    ///////////////////////
    const productImages = req.files && req.files.product_images;
    const imageUrls = [];
    if (Array.isArray(productImages)) {
      // Handle multiple file uploads
      for (const image of productImages) {
        const uploadResult = await cloudinary.uploader.upload(
          image.tempFilePath
        );
        imageUrls.push(uploadResult.secure_url);
      }
    } else if (productImages) {
      // Handle single file upload
      const uploadResult = await cloudinary.uploader.upload(
        productImages.tempFilePath
      );
      imageUrls.push(uploadResult.secure_url);
    }
    //////////////////////////

    const findUser = await AuthSchema.findById(userID);

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const findCategory = await ProductCategoriesSchema.findOne({
      _id: req.body.product_category,
    });

    if (!findCategory) {
      return res.status(404).json({ message: "Category Not Found" });
    }

    const createProduct = new ProductsSchema({
      author_id: findUser._id,
      product_name: req.body.product_name,
      product_category: findCategory._id,
      product_images: imageUrls,
      featured_image: featuredUpload.secure_url,
      product_description: req.body.product_description,
      price: req.body.price,
      type: req.body.type,
      status: req.body.status,
    });

    const saveProduct = await createProduct.save();

    // Notifications
    const createNotif = new ProductNotif({
      userID: findUser._id,
      prodID: saveProduct._id,
      title: `${findUser.name} created a new post`,
      message: saveProduct.product_description,
    });
    await createNotif.save();
    res
      .status(200)
      .json({ message: "Product Created Successfully", saveProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/all_products", async (req, res) => {
  try {
    const getAllProducts = await ProductsSchema.find({status: "unsold"});
    res.status(200).json(getAllProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/all_sold_products", async (req, res) => {
  try {
    const getAllProducts = await ProductsSchema.find({status: "sold"});
    res.status(200).json(getAllProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/user_products/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const getUserProducts = await ProductsSchema.find({ author_id: userID });
    res.status(200).json(getUserProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
});

router.get("/cat-products/:catID", async (req, res) => {
  try {
    const catID = req.params.catID;
    const findCat = await ProductsSchema.find({ product_category: catID } && { status: "unsold" });
    res.status(200).json(findCat);
  } catch (error) {
    res.status(500).json({ message: "internal Server Error" });
  }
});

router.get("/single_product/:productID", async (req, res) => {
  try {
    const productID = req.params.productID;
    const single_product = await ProductsSchema.findById(productID).populate({
      path: "author_id",
      model: "users",
      select: "-password",
    });

    res.status(200).json({ message: "Single Product here", single_product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete_product/:userId/:productID", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productID = req.params.productID;

    const product = await ProductsSchema.findById(productID);
    const findUser = await AuthSchema.findById(userId);

    if (!findUser) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      if (!product) {
        res.status(404).json({ message: "Product not Found" });
      } else {
        if (product.author_id.toString() === userId.toString()) {
          const deleteProduct = await ProductsSchema.findByIdAndDelete(
            productID
          );
          res
            .status(200)
            .json({ message: "deleted Sucessfully", deleteProduct });
        } else {
          res.status(403).json({ message: "Unauthorized User" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/edit_product/:userID/:productID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const productID = req.params.productID;
    const findUser = await AuthSchema.findById(userID);

    const featuredImages = req.files && req.files.featured_image;
    const productImages = req.files && req.files.product_images;

    if (!findUser) {
      res.status(404).json({ message: "User not Found" });
    } else {
      const Product = await ProductsSchema.findById(productID);
      if (!Product) {
        res.status(404).json({ message: "Product not Found" });
      } else if (findUser._id.toString() === Product.author_id.toString()) {
        if (featuredImages && productImages) {
          //handle Single image from cloudnary

          const featuredUpload = await cloudinary.uploader.upload(
            featuredImages.tempFilePath
          );
          //handle Multiple images from cloudnary
          ///////////////////////

          const imageUrls = [];
          if (Array.isArray(productImages)) {
            // Handle multiple file uploads
            for (const image of productImages) {
              const uploadResult = await cloudinary.uploader.upload(
                image.tempFilePath
              );
              imageUrls.push(uploadResult.secure_url);
            }
          } else if (productImages) {
            // Handle single file upload
            const uploadResult = await cloudinary.uploader.upload(
              productImages.tempFilePath
            );
            imageUrls.push(uploadResult.secure_url);
          }

          //////////////////////////
          Product.product_name = req.body.product_name || Product.product_name;
          Product.product_images = imageUrls || Product.product_images;
          Product.featured_image =
            featuredUpload.secure_url || Product.featured_image;
          Product.product_description =
            req.body.product_description || Product.product_description;

          Product.price = req.body.price || Product.price;
          Product.type = req.body.type || Product.type;
          Product.status = req.body.status || Product.status;

          const saveProductUpdates = await Product.save();
          res.status(200).json(saveProductUpdates);
        } else if (featuredImages && !productImages) {
          //handle Single image from cloudnary
          const featuredUpload = await cloudinary.uploader.upload(
            featuredImages.tempFilePath
          );

          Product.product_name = req.body.product_name || Product.product_name;
          Product.featured_image =
            featuredUpload.secure_url || Product.featured_image;
          Product.product_description =
            req.body.product_description || Product.product_description;
          Product.price = req.body.price || Product.price;
          Product.type = req.body.type || Product.type;
          Product.status = req.body.status || Product.status;
          const saveProductUpdates = await Product.save();
          res.status(200).json(saveProductUpdates);
        } else if (productImages && !featuredImages) {
          //handle Multiple images from cloudnary
          ///////////////////////
          const imageUrls = [];
          if (Array.isArray(productImages)) {
            // Handle multiple file uploads
            for (const image of productImages) {
              const uploadResult = await cloudinary.uploader.upload(
                image.tempFilePath
              );
              imageUrls.push(uploadResult.secure_url);
            }
          } else if (productImages) {
            // Handle single file upload
            const uploadResult = await cloudinary.uploader.upload(
              productImages.tempFilePath
            );
            imageUrls.push(uploadResult.secure_url);
          }
          //////////////////////////
          Product.product_name = req.body.product_name || Product.product_name;
          // Product.product_images = Product.product_images;
          Product.product_images = imageUrls || Product.product_images;
          Product.product_description =
            req.body.product_description || Product.product_description;

          Product.price = req.body.price || Product.price;
          Product.type = req.body.type || Product.type;
          Product.status = req.body.status || Product.status;
          const saveProductUpdates = await Product.save();
          res.status(200).json(saveProductUpdates);
        } else if (!featuredImages && !productImages) {
          Product.product_name = req.body.product_name || Product.product_name;
          Product.product_description =
            req.body.product_description || Product.product_description;
          Product.price = req.body.price || Product.price;
          Product.type = req.body.type || Product.type;
          Product.status = req.body.status || Product.status;
          const saveProductUpdates = await Product.save();
          res.status(200).json(saveProductUpdates);
        } else {
          res.status(404).json({ message: "data is incorrect!" });
        }
      } else {
        res.status(404).json({ message: "Unauthorized User" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete_product/:prodID", async (req, res) => {
  try {
    const { prodID } = req.params;
    const deleteProd = await ProductsSchema.findByIdAndDelete(prodID);
    if (!deleteProd) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
