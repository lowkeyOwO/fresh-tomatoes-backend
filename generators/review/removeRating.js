import fetch from "node-fetch";

export default async function removeRating(movie_id, session_id) {
  try {
    const removeRatingURL = `https://api.themoviedb.org/3/movie/${movie_id}/rating?session_id=${session_id}`;
    const removeRatingOPT = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    };
    const removeRatingData = await fetch(removeRatingURL, removeRatingOPT);
    const removeRatingStatus = await removeRatingData.json();
    console.log("Rating remove status from TMDB:\t",removeRatingStatus);
    if (removeRatingStatus.success) {
      return { success: true };
    }
  } catch (err) {
    console.log("Error in TMDB:\t", err);
    return { success: false };
  }
}
