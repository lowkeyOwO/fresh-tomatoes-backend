import editRatinginDB from "../database/actions/reviews/editRatinginDB.js";
import addRatingToTMDB from "../generators/review/addRating.js";
export default async function patch_edit_review(req, res) {
  try {
    const session_id = res.locals.decodedSessionId;
    const username = res.locals.decodedUsername;
    const { movie_id, ratingValue, review } = req.body;

    // editRating -> Add rating functions the same
    const editRatingStatus = await addRatingToTMDB(
      session_id,
      ratingValue,
      movie_id
    );
    console.log(editRatingStatus);
    // editRatinginDB
    const editRatingDBStatus = await editRatinginDB(
      username,
      ratingValue,
      movie_id,
      review
    );
    console.log(editRatingDBStatus);
    res.status(200).json({ success: "Updated data in DB & TMDB" });
  } catch (err) {
    console.log("Error in updating rating:\t", err);
    res.status(500).json({ error: err });
  }
}
