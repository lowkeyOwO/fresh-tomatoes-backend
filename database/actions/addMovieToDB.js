import movieListModel from '../models/movieListModel.js';

export default async function addMovieToDB(
  movieId,
  movieName,
  movieDate,
  avgRating
) {
    try {
        const newMovie = new movieListModel({
            movie_id : movieId,
            movie_name : movieName,
            release_date : new Date(movieDate),
            avg_rating : +avgRating
        });
        const newMovieStatus = await newMovie.save();
        if (newMovieStatus) {
            return {success : true}
        } else {
            throw new Error("Some error occured!");
        }
    } catch (err) {
        console.log("Error:\t",err);
        return {success : false}
    }
    
}
