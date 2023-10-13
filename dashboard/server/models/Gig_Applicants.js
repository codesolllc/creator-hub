import mongoose from "mongoose";
const { Schema } = mongoose;

const Gig_ApplicantsSchema = new Schema(
  {
    applicant_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    gigID :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "gigs",
        required:true,
    },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },

  },
  { timestamps: true }
);

const Gig_ApplicantsModel = mongoose.model("gig_applicants", Gig_ApplicantsSchema);
export default Gig_ApplicantsModel;
