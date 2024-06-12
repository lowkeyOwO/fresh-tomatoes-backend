import fetch from "node-fetch";
import getList from "../lists/getList.js";

export default async function removeMovieFromWatchedList(
  account_id,
  session_id,
  movie_id
) {
  const getListStatus = await getList(account_id);
  const getListId = await getListStatus.results[0].id;
  const removeMovieFromWatchedListURL = `https://api.themoviedb.org/3/list/${getListId}/remove_item?session_id=${session_id}`;
  const removeMovieFromWatchedListOpt = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      media_id: movie_id,
    }),
  };
  const removeMovieFromWatchedListStatus = await fetch(
    removeMovieFromWatchedListURL,
    removeMovieFromWatchedListOpt
  );
  const addMovieData = await removeMovieFromWatchedListStatus.json();
  console.log("Removing Movie from Watched List:\t", addMovieData);
    return addMovieData;
}