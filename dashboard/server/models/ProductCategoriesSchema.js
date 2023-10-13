import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ProductCategoriesSchema = new Schema(
    {
      category_name: {
        type: String,
        required: true,
      },
      category_image: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default model("ProductCategories", ProductCategoriesSchema);