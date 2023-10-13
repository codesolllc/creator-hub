import express from "express";
import AuthSchema from "../models/AuthSchema.js";
import jwt from "jsonwebtoken";
import transporter from "../utils/NodeMailerConfig.js";
import { v2 as cloudinary } from "cloudinary";
import Bookmark from "../models/BookmarkSchema.js";
import Post from "../models/PostSchema.js";
import CommunityModel from "../models/CommunitySchema.js";
import Chat from "../models/ChatSchema.js";
import GigApplicant from "../models/Gig_Applicants.js";
import gig from "../models/GigsSchema.js";
import product from "../models/ProductsSchema.js";
import rating from "../models/RatingsSchema.js";
import reviews from "../models/ReviewSchema.js";

const router = express.Router();

cloudinary.config({
  cloud_name: "duakbruu3",
  api_key: "264968416977713",
  api_secret: "WERjm3iSewPEo7DTpMKw9fAYZ98",
  secure: true,
});

router.post("/signup", async (req, res) => {
  try {
    const findUser = await AuthSchema.findOne({ email: req.body.email });
    if (findUser) {
      res.status(403).json({ message: "Email Already Exists" });
    } else {
      const { name, email, city, zipcode, password, state, usertype } =
        req.body;

      const createUser = new AuthSchema({
        name,
        email,
        city,
        state,
        zipcode,
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

router.post("/login", async (req, res) => {
  try {
    const findUser = await AuthSchema.findOne({ email: req.body.email });

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

router.get("/get_user", async (req, res) => {
  try {
    const getAllusers = await AuthSchema.find();
    res.status(200).json(getAllusers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// update User by id
router.patch("/update-users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await AuthSchema.findById(id);
    const image = req.files && req.files.image;
    const banner_Img = req.files && req.files.banner_Img;

    if (image) {
      const result = await cloudinary.uploader.upload(image.tempFilePath);

      updateUser.name = req.body.name || updateUser.name;
      updateUser.email = req.body.email || updateUser.email;
      updateUser.profile_Image = result.secure_url || updateUser.profile_Image;
      updateUser.banner_Img = updateUser.banner_Img;
      updateUser.city = req.body.city || updateUser.city;
      updateUser.state = req.body.state || updateUser.state;
      updateUser.zipcode = req.body.zipcode || updateUser.zipcode;
      updateUser.category = req.body.category || updateUser.category;
      updateUser.password = req.body.password || updateUser.password;
      updateUser.usertype = req.body.usertype || updateUser.usertype;
      updateUser.about = req.body.about || updateUser.about;
      updateUser.desc = req.body.desc || updateUser.desc;
    } else if (banner_Img) {
      const bannerResult = await cloudinary.uploader.upload(
        banner_Img.tempFilePath
      );
      updateUser.name = req.body.name || updateUser.name;
      updateUser.email = req.body.email || updateUser.email;
      updateUser.banner_Img = bannerResult.secure_url || updateUser.banner_Img;
      updateUser.city = req.body.city || updateUser.city;
      updateUser.state = req.body.state || updateUser.state;
      updateUser.zipcode = req.body.zipcode || updateUser.zipcode;
      updateUser.category = req.body.category || updateUser.category;
      updateUser.password = req.body.password || updateUser.password;
      updateUser.usertype = req.body.usertype || updateUser.usertype;
      updateUser.about = req.body.about || updateUser.about;
      updateUser.desc = req.body.desc || updateUser.desc;
    } else if (image && bannerResult) {
      const bannerResult = await cloudinary.uploader.upload(
        banner_Img.tempFilePath
      );
      const result = await cloudinary.uploader.upload(image.tempFilePath);

      updateUser.name = req.body.name || updateUser.name;
      updateUser.email = req.body.email || updateUser.email;
      updateUser.profile_Image = result.secure_url || updateUser.profile_Image;
      updateUser.banner_Img = bannerResult.secure_url || updateUser.banner_Img;
      updateUser.city = req.body.city || updateUser.city;
      updateUser.state = req.body.state || updateUser.state;
      updateUser.zipcode = req.body.zipcode || updateUser.zipcode;
      updateUser.category = req.body.category || updateUser.category;
      updateUser.password = req.body.password || updateUser.password;
      updateUser.usertype = req.body.usertype || updateUser.usertype;
      updateUser.about = req.body.about || updateUser.about;
      updateUser.desc = req.body.desc || updateUser.desc;
    } else if (!image && !banner_Img) {
      updateUser.name = req.body.name || updateUser.name;
      updateUser.email = req.body.email || updateUser.email;
      updateUser.city = req.body.city || updateUser.city;
      updateUser.state = req.body.state || updateUser.state;
      updateUser.zipcode = req.body.zipcode || updateUser.zipcode;
      updateUser.category = req.body.category || updateUser.category;
      updateUser.password = req.body.password || updateUser.password;
      updateUser.usertype = req.body.usertype || updateUser.usertype;
      updateUser.about = req.body.about || updateUser.about;
      updateUser.desc = req.body.desc || updateUser.desc;
    } else {
      res.status(400).json({ message: "Some Error Occured" });
    }

    const user = await updateUser.save();
    res.status(200).json({ findUser: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// update User by email
router.patch("/update-category", async (req, res) => {
  try {
    const { email } = req.body;
    const updateUser = await AuthSchema.findOne({ email });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    updateUser.name = req.body.name || updateUser.name;
    updateUser.email = req.body.email || updateUser.email;
    updateUser.city = req.body.city || updateUser.city;
    updateUser.state = req.body.state || updateUser.state;
    updateUser.zipcode = req.body.zipcode || updateUser.zipcode;
    updateUser.category = req.body.category || updateUser.category;
    updateUser.password = req.body.password || updateUser.password;
    updateUser.usertype = req.body.usertype || updateUser.usertype;

    const user = await updateUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get User by Email
// router.get('/userbyemail/:email', async (req, res) => {
//   const { email } = req.params;

//   try {
//     const user = await AuthSchema.findOne({ email });
//     if (user) {
//       res.json(user);
//     }
//     else{
//       return res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {

//     console.log(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

router.patch("/resend-otp", async (req, res) => {
  try {
    const userExist = await AuthSchema.findOne({ email: req.body.email });

    if (!userExist) {
      return res
        .status(404)
        .json({ message: "Account With This Email Doesn't Exist" });
    } else {
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();

      // Save the OTP code to the user's record in the database
      userExist.otpCode = otpCode;
      userExist.otpExpire = Date.now() + 600000; // OTP expires in 10 minutes

      // Set up the email message options
      const mailOptions = {
        from: "abdulrehmaneugbs@gmail.com", // sender address
        to: userExist.email, // receiver address
        subject: "Welcome to My Website", // Subject line
        html: `<p>Confirm Your OTP ${otpCode}</p>`, // plain text body
      };

      // Send the email with the OTP code
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Email sending failed" });
        } else {
          console.log("Email sent: " + info.response);
          return res
            .status(200)
            .json({ message: "OTP created and sent successfully" });
        }
      });

      const saveUpdatedOtp = await userExist.save();

      res.status(200).json({ data: saveUpdatedOtp, status: 200 });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.patch("/forgot-password", async (req, res) => {
  try {
    const userExist = await AuthSchema.findOne({ email: req.body.email });
    if (!userExist) {
      res
        .status(404)
        .json({ message: "Account With This Email Doesn't Exist" });
    } else {
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      // Save the OTP code to the user's record in the database
      userExist.otpCode = otpCode;
      userExist.otpExpire = Date.now() + 600000; // OTP expires in 10 minutes

      // Set up the email message options
      const mailOptions = {
        from: "abdulrehmaneugbs@gmail.com", // sender address
        to: userExist.email, // receiver address
        subject: "Welcome to My Website", // Subject line
        html: `<p>Confirm Your OTP ${otpCode}</p>`, // plain text body
      };

      // Send the email with the OTP code
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Email sending failed" });
        } else {
          console.log("Email sent: " + info.response);
          return res
            .status(200)
            .json({ message: "OTP created and sent successfully" });
        }
      });

      const saveUpdatedOtp = await userExist.save();
      res.status(200).json({ data: saveUpdatedOtp, status: 200 });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.patch("/reset-password", async (req, res) => {
  try {
    const userExist = await AuthSchema.findOne({ email: req.body.email });
    if (!userExist) {
      res
        .status(404)
        .json({ message: "Account With This Email Doesn't Exist" });
    } else {
      if (userExist.otpCode === req.body.otpCode) {
        userExist.password = req.body.password || userExist.password;
      } else {
        res.status(400).json({ message: "Invalid Opt Code" });
      }

      // Set up the email message options
      const mailOptions = {
        from: "abdulrehmaneugbs@gmail.com", // sender address
        to: userExist.email, // receiver address
        subject: "Welcome to My Website", // Subject line
        html: `<p>Your Password Has Changed Successfully</p>`, // plain text body
      };

      // Send the email with the OTP code
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Email sending failed" });
        } else {
          console.log("Email sent: " + info.response);
          return res
            .status(200)
            .json({ message: "OTP created and sent successfully" });
        }
      });

      const saveUpdatedPass = await userExist.save();
      res.status(200).json({ data: saveUpdatedPass, status: 200 });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.patch("/recomendation/:UserId", async (req, res) => {
  const userId = req.params.UserId;
  const recomended = req.body.recomended;
  try {
    const findUser = await AuthSchema.findById(userId);
    if (!findUser) {
      res.status(404).json({ message: "User Not Found!" });
    } else {
      findUser.recomended = recomended || findUser.recomended;
      const user = await findUser.save();
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server Error!" });
  }
});

router.get("/recommender-users", async (req, res) => {
  try {
    const recomendedUsers = await AuthSchema.find({ recomended: true });
    if (recomendedUsers.length === 0) {
      const defaultRecommended = await AuthSchema.find({
        usertype: "creator",
      }).limit(1);
      res.status(200).json(defaultRecommended);
    } else {
      res.status(200).json(recomendedUsers);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server Error!" });
  }
});

// router.delete("/delete-user/:userID", async (req, res) => {
//   try {
//     const { userID } = req.params;

//     const findUser = await AuthSchema.findById(userID);

//     if (!findUser) {
//       return res.status(404).json({ message: "User Not Found" });
//     }

//     // Delete BookMarks If Exists
//     const findBookMarks = await Bookmark.find({ userID: findUser._id.toString() });
//     const bookMarkIDs = findBookMarks.map((data) => data._id.toString());

//     // Delete Posts If Exists
//     const findPosts = await Post.find({ userID: findUser._id.toString() });
//     const postIds = findPosts.map((data) => data._id.toString());

//     const comment = findPosts.map((data) =>
//       data.comments.filter((data) => data.userID.toString() === findUser._id.toString())
//     );

//     const replies = findPosts.map((data) =>
//       data.comments.filter((data) =>
//         data.replies.filter(
//           (reply) => reply.userID.toString() === findUser._id.toString()
//         )
//       )
//     );

//     res.status(200).json({ bookMarkIDs, postIds, comment, replies });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

router.delete("/delete-user/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const findUser = await AuthSchema.findById(userID);
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    // Delete BookMarks If Exists
    await Bookmark.deleteMany({ userID: findUser._id });
    // Delete Posts If Exists
    await Post.deleteMany({ userID: findUser._id });
    // Delete Comments and Replies
    await Post.updateMany(
      { "comments.userID": findUser._id },
      { $pull: { comments: { userID: findUser._id } } }
    );
    // Delete Likes If Exists
    await Post.updateMany(
      { "likes.userID": findUser._id },
      { $pull: { likes: { userID: findUser._id } } }
    );
    // Delete Replies If Exists
    await Post.updateMany(
      { "comments.replies.userID": findUser._id },
      { $pull: { "comments.$.replies": { userID: findUser._id } } }
    );

    // Delete Community If Exists
    await CommunityModel.deleteMany({
      $or: [{ user_ID: findUser._id }, { requests: findUser._id }],
    });
    // Delete Chat If Exists
    await Chat.deleteMany({
      $or: [{ SentBy: findUser._id }, { SentTo: findUser._id }],
    });
    // Delete Applicant If Exists
    await GigApplicant.deleteMany({
      $or: [{ applicant_id: findUser._id }, { userId: findUser._id }],
    });
    // Delete Gig If Exists
    await gig.deleteMany({ authorID: findUser._id });
    // Delete Product If Exists
    await product.deleteMany({ author_id: findUser._id });
    // Delete Rating If Exists
    await rating.deleteMany({ user_id: findUser._id });
    // Delete Reviews If Exists
    await reviews.deleteMany({ user_id: findUser._id });

    await AuthSchema.findByIdAndDelete(userID);

    res
      .status(200)
      .json({ message: "User and associated data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.patch("/user-verification/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const findUser = await AuthSchema.findById(userID);
    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    findUser.verified = req.body.verified || findUser.verified;
    const saveUser = await findUser.save();
    res.status(200).json(saveUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get("/verified-users", async (req, res) => {
  try {
    const verfiedUsers = await AuthSchema.find({ verified: true });
    if (verfiedUsers.length === 0) {
      const defaultVerified = await AuthSchema.find({
        usertype: "creator",
      }).limit(3);
      res.status(200).json(defaultVerified);
    } else {
      res.status(200).json(verfiedUsers);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server Error!" });
  }
});

export default router;
