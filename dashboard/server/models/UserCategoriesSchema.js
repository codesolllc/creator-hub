import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const UserCategoriesSchema = new Schema({
    user_category_name: {
        type: String,
        required: true,
      },
      category_image:{
        type: String,
        required: true,
    }},
    {
      timestamps: true,
    }
  );
  
  export default model("usercategories", UserCategoriesSchema);