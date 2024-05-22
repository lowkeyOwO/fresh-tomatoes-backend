import getReviews from "../database/actions/getReviews.js";

export default async function get_movie_review(req, res) {
  try {
    const reviews = await getReviews(req.body.movieId);
    res.status(200).json(reviews);
  } catch (err) {
    console.log("Error:\t", err);
    res.status(500).json({ Error: err });
  }
}
