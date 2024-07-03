import fetch from "node-fetch";
import getList from "../lists/getList.js";

export default async function addMovieToWatchedList(
  account_id,
  session_id,
  movie_id
) {
  const getListStatus = await getList(account_id);
  const getListId = await getListStatus.results[0].id;
  console.log("List ID:\t",getListId, session_id, account_id)
  const addMovieToWatchedListURL = `https://api.themoviedb.org/3/list/${getListId}/add_item?session_id=${session_id}`;
  const addMovieToWatchedListOpt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      media_id: movie_id,
    }),
  };
  const addMovieToWatchedListStatus = await fetch(
    addMovieToWatchedListURL,
    addMovieToWatchedListOpt
  );
  const addMovieData = await addMovieToWatchedListStatus.json();
  console.log("Watched List Status:\t", addMovieData);
    return addMovieData;
}
