import movieListModel from "../../models/movieListModel.js";
import userListModel from "../../models/userListModel.js";

export default async function editRatinginDB(
  username,
  rating,
  movie_id,
  review,
  title,
  date
) {
  try {
    // Adding to userList array
    const userUpdate = await userListModel.findOneAndUpdate(
      { username: username, "reviewed_movies.movie_id": +movie_id },
      {
        $set: {
          "reviewed_movies.$.review": review,
          "reviewed_movies.$.rating": rating,
          "reviewed_movies.$.title" : title,
          "reviewed_movies.$.created_at" : date
        },
      },
      { returnOriginal: false }
    );
    // Adding to movieList array
    const movieUpdate = await movieListModel.findOneAndUpdate(
      { movie_id: +movie_id, "review_list.username": username },
      {
        $set: {
          "review_list.$.review": review,
          "review_list.$.rating": rating,
          "reviewed_movies.$.title" : title,
          "reviewed_movies.$.created_at" : date
        },
      },
      { returnOriginal: false }
    );
    console.log("Edit rating in DB:\t",userUpdate, movieUpdate);
    if ((userUpdate !== null) & (movieUpdate !== null)) {
      return { success: true };
    }
  } catch (err) {
    console.log("Error in DB update:\t", err);
    throw err;
  }
}
