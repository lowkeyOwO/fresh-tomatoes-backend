import deleteRatingfromDB from "../database/actions/reviews/deleteRating.js";
import removeMovieFromWatchedList from "../generators/review/removeMovieFromWatchedList.js";
import removeRating from "../generators/review/removeRating.js";

export default async function post_del_review(req, res) {
  console.log("here");
  try {
    const session_id = res.locals.decodedSessionId;
    const username = res.locals.decodedUsername;
    const account_id = res.locals.decodedAccountId;
    const { movie_id } = req.body;
    const deleteRatingStatus = await deleteRatingfromDB(username, movie_id);
    const removeRatingStatus = await removeRating(movie_id, session_id);
    const removeWatchlistStatus = await removeMovieFromWatchedList(account_id, session_id, movie_id)
    console.log("Deleting Review:\n",deleteRatingStatus,removeRatingStatus,removeWatchlistStatus);
    if (deleteRatingStatus.success && removeRatingStatus.success && removeWatchlistStatus.success) {
      res.status(200).json({ success: "Deleted from DB & TMDB" });
    }
  } catch (err) {
    console.log("Error:\t", err);
    res.status(500).json({ error: err });
  }
}
