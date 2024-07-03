import fetch from "node-fetch";

export default async function addRatingToTMDB(
  session_id,
  ratingValue,
  movie_id
) {
  const addRatingURL = `https://api.themoviedb.org/3/movie/${movie_id}/rating?session_id=${session_id}`;
  const addRatingOpt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      value: ratingValue,
    }),
  };
  const addRatingStatus = await fetch(addRatingURL, addRatingOpt);
  const addRatingData = await addRatingStatus.json()
  return addRatingData;
}
