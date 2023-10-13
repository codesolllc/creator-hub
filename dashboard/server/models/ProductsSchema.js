import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ProductsSchema = new Schema(
  {
    author_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    product_name: {
      type: String,
      required: true,
    },
    product_images: {
      type: [String],
      required: false,
    },
    featured_image: {
      type: String,
      required: false,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategories",
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: [String],
      required: true,
      enum: ["Buy", "Rent"],
    },
    status: {
      type: [String],
      required: true,
      enum:
       ["sold", "pending", "unsold"],
       default:["pending"]
    },
  },
  {
    timestamps: true,
  }
);

export default model("products", ProductsSchema);
