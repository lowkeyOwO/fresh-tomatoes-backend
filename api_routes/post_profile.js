import findUser from "../database/actions/findUser.js";
import getUserDetails from "../database/actions/getUserDetails.js";
import getFavorites from "../generators/getFavorites.js";
import getImageData from "../generators/getImageData.js";
import getFavMoviesData from "../generators/getFavMoviesData.js";

export default async function post_profile(req, res) {
  try {
    const username = res.locals.decodedUsername;
    const session_id = res.locals.decodedSessionId;
    const account_id = res.locals.decodedAccountId;
    const request_username = req.body.username;
    let userDetails,
      favMovies = [],
      imageData = [];
    if (request_username === undefined || request_username === username) {
      // If the user is the same as the requesting user (i.e., base profile)
      userDetails = await findUser(username, session_id, account_id);
      favMovies = await getFavorites(account_id);
    } else {
      // If the user is viewing another person's profile
      userDetails = await getUserDetails(request_username);
    }
    console.log(userDetails);
    if (userDetails.userExists.favorite_movies.length > 0) {
      imageData = await getImageData(
        session_id,
        userDetails.userExists.favorite_movies
      );
      if (favMovies.length === 0) {
        favMovies = await getFavMoviesData(
          userDetails.userExists.favorite_movies
        );
      }
    }
    res.status(200).json({ userDetails, imageData, favMovies }).end();
  } catch (err) {
    console.log("post_profile Error:\t", err);
    res.status(504).json({ error: "Error occurred!" });
  }
}
