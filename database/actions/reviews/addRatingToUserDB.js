import movieListModel from "../../models/movieListModel.js";
import userListModel from "../../models/userListModel.js";

export default async function addRatingToUserDB(
  username,
  review,
  rating,
  createdAt,
  movieId
) {
  try {
    // Adding to userList array
    const userUpdate = await userListModel.findOneAndUpdate(
      { username: username },
      {
        $push: {
          reviewed_movies: {
            movie_id: movieId,
            review: review,
            rating: rating,
            created_at: createdAt,
          },
        },
      },
      { returnOriginal: false }
    );
    // Adding to movieList array
    const movieUpdate = await movieListModel.findOneAndUpdate(
      { movie_id: +movieId },
      {
        $push: {
          review_list: {
            username: username,
            review: review,
            created_at: createdAt,
            rating: rating,
          },
        },
      },
      { returnOriginal: false }
    );
    console.log("File 3:\t", userUpdate, "\n\n", movieUpdate);
    if ((userUpdate !== null) & (movieUpdate !== null)) {
      return { success: true };
    }
  } catch (err) {
    console.log("Error in DB update:\t", err);
    throw err;
  }
}
