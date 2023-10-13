import mongoose from "mongoose";
const { Schema } = mongoose;

const GigsSchema = new Schema({

    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true,
      },
      image: {
        type: String,
        required: false,
        default:""
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },  
});

const GigsModel = mongoose.model("gigs", GigsSchema);
export default GigsModel;