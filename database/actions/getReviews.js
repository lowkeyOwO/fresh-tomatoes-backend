import movieListModel from "../models/movieListModel.js";
import getUserProfileDetails from "./getUserProfileDetails.js";

export default async function getReviews(movieId) {
  try {
    const movieReviews = await movieListModel.findOne({ movie_id: +movieId });
    if (movieReviews === null) {
      return {
        reviews: [],
      };
    } else {
      const userDetails = await getUserProfileDetails(movieReviews);
      return {
        userDetails,
        reviews: movieReviews,
      };
    }
  } catch (err) {
    console.error(err);
    return { error: err };
  }
}
