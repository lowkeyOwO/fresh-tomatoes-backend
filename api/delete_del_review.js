import deleteRatingfromDB from "../database/actions/reviews/deleteRating.js";
import removeRating from "../generators/review/removeRating.js";

export default async function delete_del_review(req, res) {
  try {
    const session_id = res.locals.decodedSessionId;
    const username = res.locals.decodedUsername;
    const { movie_id } = req.body;

    const deleteRatingStatus = await deleteRatingfromDB(username, movie_id);
    const removeRatingStatus = await removeRating(movie_id, session_id);
    console.log(deleteRatingStatus,removeRatingStatus);
    if (deleteRatingStatus.success && removeRatingStatus.success) {
      res.status(200).json({ success: "Deleted from DB & TMDB" });
    }
  } catch (err) {
    console.log("Error:\t", err);
    res.status(500).json({ error: err });
  }
}
