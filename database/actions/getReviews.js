import movieListModel from "../models/movieListModel.js";

export default async function getReviews(movieId) {
  try {
    const movieReviews = await movieListModel.findOne({ movieId: movieId });
    if (movieReviews === null) {
      return {
        "reviews" : []
      }
    } else {
      return {
        "reviews" : movieReviews
      }
    }
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}
