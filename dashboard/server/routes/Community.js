import express, { request } from "express";
import AuthSchema from "../models/AuthSchema.js";
import CommunityModel from "../models/CommunitySchema.js";

const router = express.Router();

router.post("/send_request/:user_ID/:sentTo", async (req, res) => {
  try {
    const user_ID = req.params.user_ID;
    const sentTo = req.params.sentTo;

    const send_by = await AuthSchema.findById(user_ID);
    const send_To = await AuthSchema.findById(sentTo);

    if (!send_by || !send_To) {
      res.status(400).json({ message: "user Not Found" });
    } else {
      const validate_request = await CommunityModel.findOne({
        $and: [{ user_ID: send_To }, { requests: user_ID }],
      });

      if (!validate_request) {
        const sent_request = new CommunityModel({
          user_ID: send_by._id,
          requests: send_To._id,
        });
        const save = await sent_request.save();
        res.status(200).json({ message: "Request sent Sucessfully", save });
      } else {
        res.status(404).json({ message: "You have Already Sent the request" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error!" });
  }
});

router.get("/request_validator/:userID/:sentTo", async (req, res) => {
  try {
    const { userID, sentTo } = req.params;

    const findUser = await AuthSchema.find({
      or: [{ _id: userID }, { _id: sentTo }],
    });

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const validate_request = await CommunityModel.findOne({
      $and: [
        { $or: [{ user_ID: userID }, { user_ID: sentTo }] },
        { $or: [{ requests: userID }, { requests: sentTo }] },
      ],
    }).select("status user_ID");

    if (!validate_request) {
      return res.status(200).json({ validator: false });
    }
    res.status(200).json({ validate_request, validator: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/accept_request/:user_ID/:sentTo", async (req, res) => {
  try {
    const user_ID = req.params.user_ID;
    const sentTo = req.params.sentTo;

    const send_by = await AuthSchema.findById(user_ID);
    const send_To = await AuthSchema.findById(sentTo);

    if (!send_by || !send_To) {
      res.status(400).json({ message: "user Not Found" });
    } else {
      const validate_request = await CommunityModel.findOne({
        $and: [
          { $or: [{ user_ID: send_by }, { user_ID: send_To }] },
          { $or: [{ requests: send_To }, { requests: send_by }] },
        ],
      });

      if (validate_request) {
        validate_request.status = "accepted" || validate_request.status;
        const update_satatus = await validate_request.save();

        const createUserSide = new CommunityModel({
          user_ID: send_To._id,
          requests: send_by._id,
          status: "accepted",
        });

        await createUserSide.save();

        res
          .status(200)
          .json({ message: "Request Accepted Sucessfully", update_satatus });
      } else {
        res.status(400).json({ message: "User Not Found!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cancel_request/:userID/:sentTo", async (req, res) => {
  try {
    const { userID, sentTo } = req.params;

    const findUser = await AuthSchema.find({
      $or: [{ _id: userID }, { _id: sentTo }],
    });

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const cancelReq = await CommunityModel.findOneAndDelete({
      $and: [{ user_ID: userID }, { requests: sentTo }],
      status: "pending",
    });

    if (!cancelReq) {
      return res.status(404).json({ message: "Request Doesn't Exists" });
    }

    res.status(200).json(cancelReq);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/reject_user/:requestID", async (req, res) => {
  try {
    const requestID = req.params.requestID;

    const findReq = await CommunityModel.findByIdAndDelete(requestID);
    if (!findReq) {
      return res.status(404).json({ message: "Something Went Wrong" });
    }
    res.status(200).json(findReq);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/get_requests/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const findReqs = await CommunityModel.find({
      $or: [{ user_ID: user_id }, { requests: user_id }],
      status: "pending",
    })
      .populate({
        model: "users",
        path: "user_ID",
        select: "name profile_Image usertype",
      })
      .populate({
        model: "users",
        path: "requests",
        select: "name profile_Image usertype",
      });

    res.status(200).json({ requests: findReqs });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/get_connections/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const findReqs = await CommunityModel.find({
      user_ID: user_id,
      status: "accepted",
    })
      .populate({
        model: "users",
        path: "user_ID",
        select: "name profile_Image usertype banner_Img about usertype desc",
      })
      .populate({
        model: "users",
        path: "requests",
        select: "name profile_Image usertype banner_Img about usertype desc",
      });

    res.status(200).json({ connections: findReqs });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.delete("/remove-friend/:requestID/:userID", async (req, res) => {
  try {
    const { requestID, userID } = req.params;
    const findUser = await AuthSchema.findById(userID);
    const findReq = await AuthSchema.findById(requestID);
    if (!findUser || !findReq) {
      return res.status(404).json({ message: "User not found" });
    }
    await CommunityModel.findOneAndDelete({
      user_ID: findUser._id,
      requests: findReq._id,
    });
    await CommunityModel.findOneAndDelete({
      requests: findUser._id,
      user_ID: findReq._id,
    });
    res.status(200).json({ message: "Friend Removed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
