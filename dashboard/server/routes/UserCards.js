import express from "express";
import AuthSchema from "../models/AuthSchema.js";
import UserCards from "../models/UserCards.js";

const router = express.Router();

router.post("/add_card/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const { card_number, card_exp_month, card_exp_year, card_cvc } = req.body;

    const findUser = await AuthSchema.findById(userID);
    if (!findUser) {
      return res.status(404).json({ message: "User Not found!" });
    }
    const find_if_already = await UserCards.find({ userID: userID });

    if (find_if_already.length === 0) {
      const addNewCard = new UserCards({
        userID: userID,
        card_number: card_number,
        card_exp_month: card_exp_month,
        card_exp_year: card_exp_year,
        card_cvc: card_cvc,
      });
      const savingcard = await addNewCard.save();
      return res
        .status(200)
        .json({ message: "Card Added successfully", savingcard });
    } else {
      return res
        .status(400)
        .json({ message: "You have already added a card!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.get("/get_user_card/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const findUser = await AuthSchema.findById(userID);
    if (!findUser) {
      res.status(404).json({ message: "User not Found!" });
    } else {
      const findcard = await UserCards.findOne({ userID: userID });

      if (!findcard) {
        res.status(404).json({ message: "User Card Not avalable" });
      } else {
        res.status(200).json({ message: "User Card Avalaible", findcard });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error!" });
  }
});

router.get("/get_all_user_cards", async (req, res) => {
    try {
        const findcard = await UserCards.find()
        .populate({
            path: "userID",
            model: "users",
            select: "-password",
          })
        res.status(200).json({message:"All cards", findcard})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
})

router.patch("/update_card/:cardID/:userID", async (req, res) => {
  try {
    const userID = req.params.userID;
    const cardID = req.params.cardID;

    const findUser = await AuthSchema.findById(userID);

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found!" });
    }

    const findcard = await UserCards.findOne({ _id: cardID });

    if (!findcard) {
      return res.status(404).json({ message: "Card Not Found!" });
    }
    findcard.card_number = req.body.card_number || findcard.card_number;
    findcard.card_exp_month =
      req.body.card_exp_month || findcard.card_exp_month;
    findcard.card_exp_year = req.body.card_exp_year || findcard.card_exp_year;
    findcard.card_cvc = req.body.card_cvc || findcard.card_cvc;

    const updatedCard = await findcard.save();

    res.status(200).json(updatedCard);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
});

export default router;
