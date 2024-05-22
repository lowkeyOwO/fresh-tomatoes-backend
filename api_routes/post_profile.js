import findUser from "../database/actions/findUser.js";
import getFavorites from "../generators/getFavorites.js";
import getImageData from "../generators/getImageData.js";

export default async function post_profile(req, res) {
  try {
    const username = res.locals.decodedUsername;
    const session_id = res.locals.decodedSessionId;
    const account_id = res.locals.decodedAccountId;
    const userDetails = await findUser(username, session_id,account_id);
    const favMovies = await getFavorites(account_id);
    const imageData = await getImageData(session_id,userDetails.userExists.favorite_movies);
    res.status(200).json({userDetails,imageData, favMovies}).end();
  } catch (err) {
    console.log("post_profile Error:\t", err);
    res.status(504).json({ error: "Error occured!" });
  }
}
