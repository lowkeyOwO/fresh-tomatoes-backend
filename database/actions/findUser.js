import userListModel from "../models/userListModel.js";
import createNewList from "../../generators/lists/newList.js";
import getTMDBDetails from "../../generators/getUserProfile.js";

export default async function findUser(username, session_id, account_id) {
  try {
    const userExists = await userListModel.findOne({ username: username });
    const TMDB_userDetails = await getTMDBDetails(account_id, session_id,username); // Update avatar path
    if (userExists !== null) {
      return { newUser: false, userExists };
    } else {
      const newUser = new userListModel({
        username: username,
        avatar_path: TMDB_userDetails.avatar.tmdb.avatar_path,
      });
      return newUser
        .save()
        .then((newUserData) => {
          createNewList(session_id);
          return { newUser: true, newUserData };
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } catch (e) {
    console.log("Error:\t", e);
  }
}
