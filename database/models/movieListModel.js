import { Schema, model } from "mongoose";

/* movie model 
{
    movie_id
    movie_name
    release_year
    avgrating
    review_list : [
        {username,createdAt,rating,review}
    ]
 }
*/

const movieListSchema = Schema({
  movie_id: {
    type: Number,
    required: true,
  },
  movie_name: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  avg_rating: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 0.0 && value <= 10.0;
      },
      message: "Rating should be between 1 and 10",
    },
  },
  review_list: [
    {
      username: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required : true
      },
      review: {
        type: String,
        required: true,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
      rating: {
        type: Schema.Types.Decimal128,
        required: true,
        validate: {
          validator: function (value) {
            return value >= 0.0 && value <= 10.0;
          },
          message: "Rating should be between 1 and 10",
        },
      },
    },
  ],
});

const movieListModel = model("movieList", movieListSchema);


export default movieListModel;





