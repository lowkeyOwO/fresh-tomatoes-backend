import findUser from "../database/actions/findUser.js";

export default async function post_profile(req, res) {
  try {
    const username = res.locals.decodedUsername;
    const session_id = res.locals.decodedSessionId;
    const userDetails = await findUser(username, session_id);
    // If the user is new, get favorite movies list
    if (userDetails.newUser === true) {
      res.status(200).json(userDetails);
      // If not new user, return all data of user after updating values
    } else {
      res.status(200).json(userDetails);
    }
  } catch (err) {
    console.log("post_profile Error:\t", err);
    res.status(504).json({ error: "Error occured!" });
  }
}
