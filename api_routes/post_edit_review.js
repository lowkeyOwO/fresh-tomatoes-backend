import editRatinginDB from "../database/actions/reviews/editRatinginDB.js";
import addRatingToTMDB from "../generators/review/addRating.js";
export default async function post_edit_review(req, res) {
  try {
    const session_id = res.locals.decodedSessionId;
    const username = res.locals.decodedUsername;
    const { movie_id, rating, review, title, date } = req.body;

    // editRating -> Add rating functions the same
    const editRatingStatus = await addRatingToTMDB(
      session_id,
      rating,
      movie_id
    );
    console.log(editRatingStatus);
    // editRatinginDB
    const editRatingDBStatus = await editRatinginDB(
      username,
      rating,
      movie_id,
      review,
      title,
      date
    );
    console.log("edit status:\t",editRatingDBStatus);
    res.status(200).json({ success: "Updated data in DB & TMDB" });
  } catch (err) {
    console.log("Error in updating rating:\t", err);
    res.status(500).json({ error: err });
  }
}
