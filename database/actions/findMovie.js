import movieListModel from "../models/movieListModel.js";

export default async function findMovie(movieId) {
  try {
    const movieExists = await movieListModel.findOne({ movie_id: movieId });
    if (movieExists !== null) {
      return { movieExists: true };
    } else {
      return { movieExists: false };
    }
  } catch (e) {
    console.log("Error:\t", e);
  }
}
