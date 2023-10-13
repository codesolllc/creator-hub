import express from "express";
import ChatModel from "../models/ChatSchema.js";
import CommunityModel from "../models/CommunitySchema.js";
import AuthSchema from "../models/AuthSchema.js";

const router = express.Router();

router.post("/send_text/:reqID", async (req, res) => {
  try {
    const { reqID } = req.params;

    const findChat = await CommunityModel.findById(reqID);

    const findUser = await AuthSchema.findOne({
      $or: [
        { _id: findChat.user_ID.toString() },
        { _id: findChat.requests.toString() },
      ],
    });

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      if (findChat.status.includes("accepted")) {
        const ChatMeassage = await ChatModel({
          SentBy: findChat.user_ID,
          SentTo: findChat.requests,
          message: req.body.message,
        });
        const savechat = await ChatMeassage.save();
        res.status(200).json({ message: "message sent", savechat });
      } else {
        res.status(401).json({
          message: "User's Status Needs To Be Accepted Before Chatting",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get_meassages/:sentTo/:sentBy", async (req, res) => {
  try {
    const { sentTo, sentBy } = req.params;

    const findChats = await ChatModel.find({
      $or: [
        { $and: [{ SentBy: sentBy }, { SentTo: sentTo }] },
        { $and: [{ SentBy: sentTo }, { SentTo: sentBy }] },
      ],
    })

      .populate({
        path: "SentBy",
        model: "users",
        select: "name profile_Image",
      })
      .populate({
        path: "SentTo",
        model: "users",
        select: "name profile_Image",
      });

    if (findChats.length === 0) {
      return res.status(200).json({ message: "No Chats For Now" });
    }

    const reverseRes = findChats.reverse();

    res.status(200).json(reverseRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
});

export default router;
