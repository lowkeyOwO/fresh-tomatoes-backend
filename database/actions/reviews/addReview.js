import addMovieToWatchedList from "../../../generators/review/addMovieToWatchedList.js";
import addRatingToTMDB from "../../../generators/review/addRating.js";
import addRatingToUserDB from "./addRatingToUserDB.js";

export default async function addReview(
  account_id,
  session_id,
  username,
  review,
  rating,
  createdAt,
  movieId
) {
  try {
    // Adds rating to TMDB profile
    const addRatingStatus = await addRatingToTMDB(session_id, rating, movieId);
    // Adds movie to WatchList
    const addToListStatus = await addMovieToWatchedList(
      account_id,
      session_id,
      movieId
    );
    // Adds to MongoDB array, both movieList and userList
    const addMovieToDBStatus = await addRatingToUserDB(
      username,
      review,
      rating,
      createdAt,
      movieId
    );
    if (
      addRatingStatus.success === true &&
      (addToListStatus.success === true ||
        (addToListStatus.success === false &&
          addToListStatus.status_code === 8)) &&
      addMovieToDBStatus.success === true
    ) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.log("Error:\t", err);
    throw new Error("Error:\t" + err);
  }
}
