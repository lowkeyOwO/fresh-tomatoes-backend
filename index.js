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
import followUser from "./database/actions/user/followUser.js";
import unfollowUser from "./database/actions/user/unfollowUser.js";
import getUserDetails from "./database/actions/user/getUserDetails.js";
import editWatchList from "./generators/lists/editWatchList.js";
import post_movie_details from "./api_routes/post_movie_details.js";
import get_movie_review from "./api_routes/get_movie_review.js";
import post_del_review from "./api_routes/post_del_review.js";
import post_edit_review from "./api_routes/post_edit_review.js";
import get_person_details from "./api_routes/get_person_details.js";
import post_search_data from "./api_routes/post_search_data.js";
import get_homepage from "./api_routes/get_homepage.js";

// dotenv-config
config();

const PORT = process.env.PORT || 4000;

// Initiating express app
const app = express();
app.use(express.json());

// Setting up CORS
const allowedOrigin = process.env.FRONTENDURL;

const corsOptions = {
  origin: allowedOrigin
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

// Creating mongoose-MongoDB client URI
const uri = `mongodb+srv://${process.env.MONGO_UNAME}:${process.env.MONGO_PW}@${process.env.MONGO_CLUSTER}.olyl1sd.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

//Home
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<div style='overflow: hidden;'><h1 style='text-align: center;'>YOU SHALL NOT PASS!</h1><h6 style='text-align: center;'>(super secret backend of fresh tomatoes)</h6><img src='https://i.giphy.com/GeimqsH0TLDt4tScGw.webp' style='height: 80vh; width:100vw;'/></div>"
    )
    .end();
});

// Login to TMDB and return session_token to user
app.post("/api/login", post_login);

// View Profile of the user
app.post("/api/profile", verifyToken, post_profile);

// Add Movies to favorites in TMDB & DB
app.post("/api/addFavorites", verifyToken, addFavorites);

// Add a review to a movie
app.post("/api/addReview", verifyToken, post_add_review);

// Edit the review of already posted movie
app.post("/api/editReview", verifyToken, post_edit_review);

// Delete Existing Review
app.post("/api/deleteReview", verifyToken, post_del_review);

// Follow another User
app.post("/api/followUser", verifyToken, followUser);

// Unfollow User
app.post("/api/unfollowUser", verifyToken, unfollowUser);

// Add a movie to watchlist
app.post("/api/addMovieToWatchlist", verifyToken, editWatchList);

// Get user Profile details
app.get("/api/findUser", verifyToken, getUserDetails);

// get movie details from TMDB
app.post("/api/getMovieDetails", verifyToken, post_movie_details);

// get_movie_review from DB
app.post("/api/getMovieReviews", verifyToken, get_movie_review);

// get crew/cast member details from TMDB
app.post("/api/getPersonDetails", verifyToken, get_person_details);

// search for data
app.post("/api/search", verifyToken, post_search_data);

// Homepage Details
app.post("/api/homepage",verifyToken, get_homepage);

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
