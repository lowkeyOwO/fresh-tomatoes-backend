import fetch from "node-fetch";

import userListModel from "../database/models/userListModel.js";

export default async function addFavorites(req, res) {
  const favMovieList = req.body.favMovieList;
  const username = res.locals.decodedUsername;
  // Adding movies to users Mongo Collection
  try {
    const updateFavorites = await userListModel.findOneAndUpdate(
      { username: username },
      { $set: { favorite_movies: favMovieList , newUser : false} },
      { new: true }
    );
    if (updateFavorites.acknowledged === false) {
      throw new Error("Some error occured with database, try again!");
    } else {
      const account_id = res.locals.decodedAccountId;
      const addFavoritesURL = `https://api.themoviedb.org/3/account/${account_id}/favorite`;
      for (let movieId in favMovieList) {
        const addFavOptions = {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY}`,
          },
          body: JSON.stringify({
            media_type: "movie",
            media_id: favMovieList[movieId],
            favorite: true,
          }),
        };
        const addMovieToFav = await fetch(addFavoritesURL, addFavOptions);
        const addToFavRes = await addMovieToFav.json();
        if (addToFavRes.success !== true) {
          console.log("Error:\t", addToFavRes);
        } else {
          continue;
        }
      }
      const getFavoritesURL = `https://api.themoviedb.org/3/account/${account_id}/favorite/movies`;
      const getFavOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      };
      const getFavorites = await fetch(getFavoritesURL, getFavOptions);
      const favList = await getFavorites.json();
      res.status(200).json({ favList });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
}
