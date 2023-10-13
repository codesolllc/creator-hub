import express from "express";
import { v2 as cloudinary } from "cloudinary";
import Stripe from "stripe";
import RequestProposal from "../models/HireSchema/RequestProposal.js";
import QutationsSchema from "../models/HireSchema/Qutations.js";
import AuthSchema from "../models/AuthSchema.js";
import checkout from "../models/checkout.js";

const router = express.Router();

cloudinary.config({
  cloud_name: "duakbruu3",
  api_key: "264968416977713",
  api_secret: "WERjm3iSewPEo7DTpMKw9fAYZ98",
  secure: true,
});

const stripe = new Stripe("sk_test_51MtGgQJ8CQqp3LxfMWIk20QJiFn5457UjuFlgT1eWd4XExsvwmwZOLqGCejgKkOwKGhk9QfVc78NWdLwxryuJXAN00mNQJ5yKw");

router.post("/request_for_proposal/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const CreatorID = req.body.CreatorID;

    const desired_amount = req.body.desired_amount;
    const work_detail = req.body.work_detail;

    const document_or_picture = req.files && req.files.document_or_picture;

    const findUser = await AuthSchema.findById(userID);
    if (!findUser) {
      res.status(404).json({ message: "User not Found!" });
    } else {
      const findcreator = await AuthSchema.findById(CreatorID);
      if (!findcreator) {
        res.status(404).json({ message: "Creator Not Found!" });
      } else {
        if (findUser.usertype === "user") {
          if (!document_or_picture) {
            const createRequest = new RequestProposal({
              userID: userID,
              CreatorID: CreatorID,
              desired_amount: desired_amount,
              work_detail: work_detail,
            });
            const save = await createRequest.save();
            res
              .status(200)
              .json({
                message:
                  "Your Proposal has been Sent to Creator he ll reply Soon!",
                save,
              });
          } else {
            const Upload = await cloudinary.uploader.upload(
              document_or_picture.tempFilePath
            );
            const createRequest = new RequestProposal({
              userID: userID,
              CreatorID: CreatorID,
              desired_amount: desired_amount,
              work_detail: work_detail,
              document_or_picture: Upload.secure_url,
            });
            const save = await createRequest.save();
            res
              .status(200)
              .json({
                message:
                  "Your Proposal has been Sent to Creator he ll reply Soon!",
                save,
              });
          }
        } else {
          res.status(401).json({ message: "Unauthorized User" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server Error!");
  }
});

router.get("/get_user_proposal/:creatorID", async (req, res) => {
  try {
    const creatorID = req.params.creatorID;

    const findcreator = await AuthSchema.findById(creatorID);
    if (!findcreator) {
      res.status(404).json({ message: "Creator Not Found!" });
    } else {
      const creatorProposals = await RequestProposal.find({
        CreatorID: creatorID,
      })
        .populate({
          path: "userID",
          model: "users",
          select: "-password",
        })
        .populate({
          path: "CreatorID",
          model: "users",
          select: "-password",
        });
      res.status(200).json({ message: "Creator Proposals", creatorProposals });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error!" });
  }
});

// geting proposals from User Id
router.get("/get_proposals/:userID", async (req, res) => {
    try {
        const user_ID = req.params.userID;

        const findUser = await AuthSchema.findById(user_ID)

        if (!findUser) {
            res.status(404).json({message:"User not found"})
        } else {
            const allproposals = await RequestProposal.find({userID:user_ID})
            .populate({
                path: "CreatorID",
                model: "users",
                select: "-password",
              });
            res.status(200).json({message:"all users proposals", allproposals})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server Error"});
    }
});


// for dashboard
router.get("/get_all_proposals", async (req, res) => {
    try {
      const allproposals = await RequestProposal.find()
      .populate({
          path: "CreatorID",
          model: "users",
          select: "-password",
        })
        .populate({
          path: "userID",
          model: "users",
          select: "-password",
        });
      res.status(200).json({message:"all users proposals", allproposals})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server Error"});
    }
});


router.post("/send_qutation/:proposalID/:creatorID", async (req, res) => {
  try {
    const proposalID = req.params.proposalID;
    const creatorID = req.params.creatorID;

    const userID = req.body.userID;
    const amount = req.body.amount;
    const message = req.body.message;

    const findcreator = await AuthSchema.findById(creatorID);
    if (!findcreator) {
      res.status(404).json({ message: "creator Not Found" });
    } else {
      const validateProposal = await RequestProposal.findById(proposalID);
      if (!validateProposal) {
        res.status(404).json({ message: "Proposal Not Found" });
      } else {
        const createqutation = new QutationsSchema({
          userID: userID,
          CreatorID: creatorID,
          proposalID: proposalID,
          amount: amount,
          message: message,
          accepted: "pending",
        });
        const save = await createqutation.save();
        res.status(200).json({ message: "Qutation sent succesfully", save });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});


router.get("/get_qutations/:proposalID/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const proposalID = req.params.proposalID;

    if (!proposalID) {
      res.status(404).json({ message: "proposal not found!" });
    } else {
      const finduser = await AuthSchema.findById(userID);

      if (!finduser) {
        res.status(404).json({ message: "User Not Found" });
      } else {
        const findQutations = await QutationsSchema.find({
          proposalID: proposalID,
        })
          .populate({
            path: "userID",
            model: "users",
            select: "-password",
          })
          .populate({
            path: "CreatorID",
            model: "users",
            select: "-password",
          })
          .populate({
            path: "proposalID",
            model: "requestproposal",
            select: "",
          });
        res.status(200).json({ message: "Proposal Qutations", findQutations });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

// dashboard ke liye
router.get("/get_qutations/:proposalID", async (req, res) => {
  try {
    const proposalID = req.params.proposalID;
    if (!proposalID) {
      res.status(404).json({ message: "proposal not found!" });
    } else {
      const findQutations = await QutationsSchema.find({
        proposalID: proposalID,
      })
        .populate({
          path: "userID",
          model: "users",
          select: "-password",
        })
        .populate({
          path: "CreatorID",
          model: "users",
          select: "-password",
        })
        .populate({
          path: "proposalID",
          model: "requestproposal",
          select: "",
        });
      res.status(200).json({ message: "Proposal Qutations", findQutations });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/get_qutations_for_users/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const finduser = await AuthSchema.findById(userID);

    if (!finduser) {
      res.status(404).json({ message: "user not found!" });
    } else {
      const findqutations = await QutationsSchema.find({
        userID: userID,
      })
        .populate({
          path: "userID",
          model: "users",
          select: "-password",
        })
        .populate({
          path: "CreatorID",
          model: "users",
          select: "-password",
        })
        .populate({
          path: "proposalID",
          model: "requestproposal",
          select: "",
        });
      res.status(200).json({ message: "Proposal Qutations", findqutations });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/get_qutations_for_creators/:creatorID", async (req, res) => {
  try {
    const creatorID = req.params.creatorID;
    const findcreator = await AuthSchema.findById(creatorID);
    if (!findcreator) {
      res.status(404).json({ message: "creator not found!" });
    } else {
      const finduser = await QutationsSchema.find({
        CreatorID: creatorID,
      })
        .populate({
          path: "userID",
          model: "users",
          select: "-password",
        })
        .populate({
          path: "CreatorID",
          model: "users",
          select: "-password",
        })
        .populate({
          path: "proposalID",
          model: "requestproposal",
          select: "",
        });
      res.status(200).json({ message: "Proposal Qutations", finduser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/accept_qutation/:qutationID/:userID", async (req, res) => {
  try {
    const {
      email,
      card_number,
      card_exp_month,
      card_exp_year,
      card_cvc,
      amount,
    } = req.body;
    const { qutationID, userID } = req.params;

    const findQutation = await QutationsSchema.findById(qutationID);
    if (!findQutation) {
      res.status(404).json({ message: "Qutation Not Found" });
    } else {
      const findUser = await AuthSchema.findById(userID);
      if (!findUser) {
        res.status(404).json({ message: "User Not Found" });
      } else {
        // Validate card expiry date
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const cardExpiry = new Date(card_exp_year, card_exp_month - 1);
        if (cardExpiry < new Date(currentYear, currentMonth)) {
          return res.status(400).json({ error: "Invalid card expiry date" });
        } else {
          const token = await stripe.tokens.create({
            card: {
              number: card_number,
              exp_month: card_exp_month,
              exp_year: card_exp_year,
              cvc: card_cvc,
            },
          });
          //Charge the customer's card
          const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: "USD",
            source: token.id,
            description: `Payment`,
            receipt_email: email,
          });

          const newOrder = new checkout({
            userID: findUser._id,
            prodID: findQutation._id,
            email,
            amount: req.body.amount * 1000,
            payment_Id: charge.id,
            card_number,
            card_cvc,
            card_exp_month,
            card_exp_year,
            payment_type:"hire",
          });

          // const updatedQuotation = await QutationsSchema.findByIdAndUpdate(qutationID, {
          //   $set: { accepted: ["true"], status: ["inprogress"]},
          // });     
          
          const updatedQuotation = await QutationsSchema.findById(qutationID);
          if (!updatedQuotation) {
            res.status(404).json({message:"Qutation not Found!"})
          } else {
            updatedQuotation.accepted = ["true"],
            updatedQuotation.status = ["inprogress"]
          }
          const saveQutation = await updatedQuotation.save();
          const savedOrder = await newOrder.save();
          res
          .status(200)
          .json({ message: "Qutation Payment successfully paid!", order: savedOrder});
          
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

router.patch("/decline_qutation/:qutationID/:userID", async (req, res) => {
  try {
    const qutationID = req.params.qutationID;
    const user_ID = req.params.userID;

    const findUser = await AuthSchema.findById(user_ID);

    if (!findUser) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      const updatedQutation = await QutationsSchema.findById(qutationID);
      if (!updatedQutation) {
        res.status(400).json({ message: "Qutation Not Found" });
      } else {
        if (updatedQutation.userID.toString() === user_ID) {
          updatedQutation.accepted = "false" || updatedQutation.accepted;

          const saveingrespose = await updatedQutation.save();
          res
            .status(200)
            .json({ message: "Qutation declined", saveingrespose });
        } else {
          res.status(400).json({ message: "unauthorize User!" });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete_qutation/:quationID/:creatorID", async (req, res) => {
  try {
    const qutationID = req.params.quationID;
    const creatorID = req.params.creatorID;
    const findCreator = await AuthSchema.findById(creatorID);
    if (!findCreator) {
      res.status(404).json({ message: "creator Not Found" });
    } else {
      if (findCreator.usertype !== "creator") {
        res.status(401).json({ message: "Unauthorized User" });
      } else {
        const findQutation = await QutationsSchema.findById(qutationID);
        if (!findQutation) {
          res.status(404).json({ message: "Quatation Not Found!" });
        } else {
          if (
            findQutation.accepted.includes("false") &&
            findCreator._id.toString() === creatorID
          ) {
            const DeleteQuation = await QutationsSchema.findByIdAndDelete(
              qutationID
            );
            res
              .status(200)
              .json({ message: "Quation deleted Succesfully", DeleteQuation });
          } else {
            res.status(401).json({ message: "Invalid Qutation status" });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

router.patch("/task_completed/:userID/:qutationID", async (req, res) => {
try {
  const user_ID = req.params.userID;
  const qutationID = req.params.qutationID;
  const findUser = await AuthSchema.findById(user_ID);

if (!findUser) {
  res.status(404).json({message:"User Not Found!"})
} else {
  const findQutation = await QutationsSchema.findById(qutationID);
  if (!findQutation) {
    res.status(404).json({message:"Qutation not found"})
  } else {
    if (findQutation.userID.toString() !== user_ID) {
      res.status(400).json({message:"unauthorized User"})
    } else {
      findQutation.status = "completed" || findQutation.status
      const saveData = await findQutation.save();
      res.status(200).json({message:"Task has been Succesfully completed!", saveData})
    }    
  }}
} catch (error) {
  console.log(error);
  res.status(500).json({message:"Internal Server Error"})
}
});

router.patch("/task_not_completed/:userID/:qutationID", async (req, res) => {
  try {
    const user_ID = req.params.userID;
    const qutationID = req.params.qutationID;
    const findUser = await AuthSchema.findById(user_ID);
  
  if (!findUser) {
    res.status(404).json({message:"User Not Found!"})
  } else {
    const findQutation = await QutationsSchema.findById(qutationID);
    if (!findQutation) {
      res.status(404).json({message:"Qutation not found"})
    } else {
      if (findQutation.userID.toString() !== user_ID) {
        res.status(400).json({message:"unauthorized User"})
      } else {
        findQutation.status = "notcompleted" || findQutation.status
        const saveData = await findQutation.save();
        res.status(200).json({message:"Task has been Succesfully completed!", saveData})
      }    
    }}
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal Server Error"})
  }
});

// router.get("/get_qutations_by/:creatorID", async (req, res) => {
//   try {
//     const creatorID = req.params.creatorID;
//     const findCreator = await AuthSchema.findById(creatorID);
//     if (!findCreator) {
//       res.status(404).json({message:"creator Not Found"})
//     } else {
//       if (findCreator.usertype !== "creator") {
//         res.status(401).json({message:"Unauthorize User"})
//       } else {
//         const findQutations = await QutationsSchema.find({CreatorID:creatorID})
//         res.status(200).json({message:"all creator qutations", findQutations});
//       }
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({message:"Internal Server Error"})
//   }
// })

export default router;
