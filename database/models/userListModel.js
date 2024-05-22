import { Schema, model } from "mongoose";

/*
userList model
{
    username
    following : [username]
    followers : [username]
    favorite movies : [movieID]
}
*/

const userListSchema = Schema(
  {
    username: {
      type: String,
      required: true,
    },
    following: [String],
    followers: [String],
    favorite_movies: [Number],
    bio : String,
    avatar_path : String,
    reviewed_movies: [
      {
        movie_id: {
          type: Number,
          required: true,
        },
        review: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          validate: {
            validator: function (value) {
              return value >= 0.0 && value <= 10.0;
            },
            message: "Rating should be between 1 and 10",
          },
        },
        created_at: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],
  },
  {
    collection: "userList",
  }
);
const userListModel = model("userList", userListSchema);

export default userListModel;
