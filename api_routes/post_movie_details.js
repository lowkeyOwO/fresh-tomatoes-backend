import getMovieData from '../generators/getMovieData.js'

export default async function post_movie_details(req, res) {
  try {
    const { movieId } = req.body;
    const session_id = res.locals.decodedSessionId;
    const movieDetails = await getMovieData(movieId, session_id);
    res.status(200).json(movieDetails).end();
  } catch (err) {
    console.log("get_movie_details Error:\t", err);
    res.status(504).json({ error: "Error occured!" });
  }
}
