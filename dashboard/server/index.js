import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import Auth from "./routes/Auth.js";
import Posts from "./routes/Posts.js";
import Comment from "./routes/Comments.js";
import Gigs from "./routes/Gigs.js";
import ProductCategories from "./routes/ProductCategories.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import products from "./routes/Products.js";
import UserCategories from "./routes/UserCategories.js";
import Review from "./routes/Review.js";
import Ratings from "./routes/Ratings.js";
import Community from "./routes/Community.js";
import chat from "./routes/Chat.js";
import Bookmark from "./routes/Bookmark.js";
import Admin from "./routes/Admin.js";
import TempRemover from "./utils/TempRemover.js";
import Notifications from "./routes/Notificaitons.js";
import Hire from "./routes/Hire.js";
import stripe from "./routes/stripe.js"
import UserCards from "./routes/UserCards.js";

dotenv.config();
const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const interval = 24 * 60 * 60 * 1000;
setInterval(() => {
  TempRemover();
}, interval);

app.use("/admin", Admin);
app.use("/auth", Auth);
app.use("/usercategories", UserCategories);
app.use("/post", Posts);
app.use("/review", Review);
app.use("/ratings", Ratings);
app.use("/community", Community);
app.use("/gig", Gigs);
app.use("/product_categories", ProductCategories);
app.use("/comment", Comment);
app.use("/product", products);
app.use("/chat", chat);
app.use("/bookmarks", Bookmark);
app.use("/notifications", Notifications);
app.use("/hire", Hire);
app.use("/usercards", UserCards);
app.use("/api", stripe);

app.get("/", (req, res) => {
  res.send("Ready");
});

app.listen(PORT, () => {
  console.log(`App Running... ${process.env.PORT}`);
});
