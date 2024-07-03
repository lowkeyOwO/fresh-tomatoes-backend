import addReview from "../database/actions/reviews/addReview.js";
import findMovie from "../database/actions/findMovie.js";
import addMovieToDB from "../database/actions/addMovieToDB.js";

export default async function post_add_review(req, res) {
  const { movieExists } = await findMovie(req.body.movieId);
  const { movieId, movieName, movieDate, avgRating } = req.body;
  try {
    if (!movieExists) {
      // create details of the movie in db if not exists
      const addedMovieStatus = await addMovieToDB(
        movieId,
        movieName,
        new Date(movieDate),
        +avgRating
      );
      if (addedMovieStatus.success === false) {
        throw new Error("Unable to add movie to DB!");
      }
    }
    //if movie exists, review is added to DB, and rating is also updated in TMDB profile
    const username = res.locals.decodedUsername;
    const account_id = res.locals.decodedAccountId;
    const session_id = res.locals.decodedSessionId;
    const { movieId, title, review, rating, createdAt } = req.body;
    const addReviewStatus = await addReview(
      account_id,
      session_id,
      username,
      title,
      review,
      rating,
      createdAt,
      movieId,
      movieName
    );
    if (addReviewStatus.success === true) {
      res
        .status(200)
        .json({
          success: "Sucessfully added review!",
          reviewData: { username, title, review, rating, createdAt, movieId },
        });
    } else {
      res.status(500).json({ Error: "Some error occured, please try again!" });
    }
  } catch (err) {
    console.log("Error:\t", err);
    res.status(500).json({ Error: err });
  }
}
