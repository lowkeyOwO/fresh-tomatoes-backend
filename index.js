// External Libraries
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Custom modules, functions & middlewares
import client from "./cache/cacheClient.js";
import verifyToken from "./middleware/jwtmiddleware.js";

// Path Functions
import post_login from "./api_routes/post_login.js";
import post_profile from "./api_routes/post_profile.js";
import addFavorites from "./api_routes/post_addFavorites.js";
import post_add_review from "./api_routes/post_addReview.js";
import delete_del_review from "./api_routes/delete_del_review.js";
import patch_edit_review from "./api_routes/patch_edit_review.js";
import followUser from "./database/actions/user/followUser.js";
import unfollowUser from "./database/actions/user/unfollowUser.js";
import getUserDetails from "./database/actions/user/getUserDetails.js";
import editWatchList from "./generators/lists/editWatchList.js";

// dotenv-config
config();

const PORT = process.env.PORT || 4000;

// Initiating express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Creating mongoose-MongoDB client URI
const uri = `mongodb+srv://${process.env.MONGO_UNAME}:${process.env.MONGO_PW}@${process.env.MONGO_CLUSTER}.olyl1sd.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;


//Home
app.get("/",(req,res) => {
  res.status(200).send("WELCOME TO FRESH TOMATOES BACKEND!").end();
})

// Login to TMDB and return session_token to user
app.post("/api/login", post_login);

// View Profile of the user
app.post("/api/profile", verifyToken, post_profile);

// Add Movies to favorites in TMDB & DB
app.post("/api/addFavorites", verifyToken, addFavorites);

// Add a review to a movie
app.post("/api/addReview", verifyToken, post_add_review);

// Edit the review of already posted movie
app.patch("/api/editReview", verifyToken, patch_edit_review);

// Delete Existing Review
app.delete("/api/deleteReview", verifyToken, delete_del_review);

// Follow another User
app.post("/api/followUser", verifyToken, followUser);

// Unfollow User
app.post("/api/unfollowUser", verifyToken, unfollowUser);

// Add a movie to watchlist
app.post("/api/addMovieToWatchlist", verifyToken, editWatchList);

// Get user Profile details
app.get("/api/findUser", verifyToken, getUserDetails);

app.listen(PORT, () => {
  console.log(`Successfully listening on ${PORT}!`);
  
  client.on("connect", () => {
    console.log("Connected to Redis!");
  });
  
  client.on("error", (error) => {
    console.error("Redis error:", error);
  });

  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB Atlas\n");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB Atlas", error);
    });
});
