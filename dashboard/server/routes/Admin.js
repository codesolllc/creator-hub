import express from "express";
import AdminSchema from "../models/AdminSchema.js";
import jwt from "jsonwebtoken";


const router = express.Router();


router.post("/login_admin", async (req, res) => {
    try {
      const findUser = await AdminSchema.findOne({ email: req.body.email });
  
      if (!findUser) {
        res.status(404).json({ message: "User not found" });
      } else {
        if (findUser.password === req.body.password) {
          const token = await jwt.sign(
            { email: req.body.email },
            process.env.JWT_SECRET_KEY
          );
          res
            .status(200)
            .json({ token: token, findUser, message: "Logged In Successfully" });
        } else {
          res.status(400).json({ message: "Invalid Credentials" });
        }
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  router.post("/signup_admin", async (req, res) => {
    try {
      const findUser = await AdminSchema.findOne({ email: req.body.email });
      if (findUser) {
        res.status(403).json({ message: "Email Already Exists" });
      } else {
        const {
          name,
          email,
          password,
          usertype,
        } = req.body;
  
        const createUser = new AdminSchema({
          name,
          email,
          password,
          usertype,
        });
        const findUser = await createUser.save();
        res.status(200).json({ message: "User Has been created", findUser });
      }
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  });
  

  export default router