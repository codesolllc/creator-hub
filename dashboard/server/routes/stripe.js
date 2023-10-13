import express from "express";
import Stripe from "stripe";
import checkout from "../models/checkout.js";
import AuthSchema from "../models/AuthSchema.js";
import Product from "../models/ProductsSchema.js";

// Stripe integration

const router = express.Router();

const stripe = new Stripe(
  "sk_test_51MtGgQJ8CQqp3LxfMWIk20QJiFn5457UjuFlgT1eWd4XExsvwmwZOLqGCejgKkOwKGhk9QfVc78NWdLwxryuJXAN00mNQJ5yKw"
);

// Create a new checkout
router.post("/create-payment-intent/:userID", async (req, res) => {
  const { email, card_number, card_exp_month, card_exp_year, card_cvc } =
    req.body;

  try {
    const validateUser = await checkout.findOne({ email: req.body.email });

    if (validateUser) {
      return res
        .status(400)
        .json({ message: "You Have Already Applied For Verification" });
    } else {
      const { userID } = req.params;

      const findUser = await AuthSchema.findById(userID);

      if (!findUser) {
        return res.status(404).json({ message: "User Not Found" });
      }

      if (findUser.verified === true) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Validate card expiry date
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      const cardExpiry = new Date(card_exp_year, card_exp_month - 1);

      if (cardExpiry < new Date(currentYear, currentMonth)) {
        return res.status(400).json({ error: "Invalid card expiry date" });
      } else {
        // this is our card dat comming from body frontend
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
          amount: 100000,
          currency: "USD",
          source: token.id,
          description: `Payment`,
          receipt_email: email,
        });

        const newOrder = new checkout({
          userID: findUser._id,
          email,
          amount: 100000,
          payment_Id: charge.id,
          card_number,
          card_cvc,
          card_exp_month,
          card_exp_year,
          payment_type:"user-verification",
        });

        const savedOrder = await newOrder.save();
        res
          .status(200)
          .json({ message: "Payment successful", order: savedOrder });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed", error });
  }
});

router.get("/payers", async (req, res) => {
  try {
    const allPayers = await checkout.find().populate({
      model: "users",
      path: "userID",
      select: "-password",
    });
    res.status(200).json(allPayers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/:userID/verification-handler/:paymentId", async (req, res) => {
  try {
    const { userID, paymentId } = req.params;
    const findUser = await AuthSchema.findById(userID); 
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const findPayer = await checkout.findById(paymentId);
    if (!findPayer) {
      return res.status(404).json({ message: "User Not Found" });
    }
    findUser.verified = req.body.verified || findUser.verified;
    const savedUser = await findUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/create-product-purchase/:userID/:prodID", async (req, res) => {
  const { email, card_number, card_exp_month, card_exp_year, card_cvc, amount } =
    req.body;
  const { prodID } = req.params;
  try {
    const { userID } = req.params;
    const findUser = await AuthSchema.findById(userID);
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const findProduct = await Product.findById(prodID);
    if (!findProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }

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
        prodID: findProduct._id,
        email,
        amount: req.body.amount *1000,
        payment_Id: charge.id,
        card_number,
        card_cvc,
        card_exp_month,
        card_exp_year,
        payment_type:"products",
      });


      const updatedProduct = await Product.findByIdAndUpdate(prodID, {
        $set: { status: ["sold"] },
      });

      const savedOrder = await newOrder.save();
      res
        .status(200)
        .json({ message: "Product Payment successful", order: savedOrder});
        
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Payment failed", error });
  }
});



export default router;
