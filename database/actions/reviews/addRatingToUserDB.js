import movieListModel from "../../models/movieListModel.js";
import userListModel from "../../models/userListModel.js";

export default async function addRatingToUserDB(
  username,
  title,
  review,
  rating,
  createdAt,
  movieId,
  movieName
) {
  try {
    // Adding to userList array
    const userUpdate = await userListModel.findOneAndUpdate(
      { username: username },
      {
        $push: {
          reviewed_movies: {
            movie_id: movieId,
            title: title,
            review: review,
            rating: rating,
            created_at: createdAt,
            movie_name: movieName
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
            title : title,
            review: review,
            created_at: createdAt,
            rating: rating,
          },
        },
      },
      { returnOriginal: false }
    );
    if ((userUpdate !== null) & (movieUpdate !== null)) {
      return { success: true };
    }
  } catch (err) {
    console.log("Error in DB update:\t", err);
    throw err;
  }
}
