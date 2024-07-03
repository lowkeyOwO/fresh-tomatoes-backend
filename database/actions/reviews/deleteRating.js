import movieListModel from "../../models/movieListModel.js";
import userListModel from "../../models/userListModel.js";

export default async function deleteRatingfromDB(username, movie_id) {
  try {
    // deleting from users collection
    const userDelete = await userListModel.findOneAndUpdate(
      { username: username },
      {
        $pull: {
          reviewed_movies: {
            movie_id: +movie_id,
          },
        },
      },
      { returnOriginal: false }
    );
    // deleting from movie collection
    const movieDelete = await movieListModel.findOneAndUpdate(
      { movie_id: +movie_id },
      {
        $pull: {
          review_list: {
            username: username,
          },
        },
      },
      { returnOriginal: false }
    );
    if (userDelete !== null && movieDelete !== null) {
      return { success: true };
    }
  } catch (err) {
    console.log("Error occured in deleting from DB:\t", err);
    return { success: false };
  }
}
