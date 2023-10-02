import userListModel from "../models/userListModel.js";
import createNewList from "../../generators/lists/newList.js";

export default async function findUser(username,session_id) {
  try {
    const userExists = await userListModel.findOne({ username: username });
    if (userExists !== null) {
      return {newUser: false, userExists};
    } else {
      const newUser = new userListModel({
        username: username,
      });
      return newUser
        .save()
        .then((newUserData) => {
            createNewList(session_id);
          return {newUser : true, newUserData}
        })
        .catch((err) => {
          console.error(err);
        });
    }
  } catch (e) {
    console.log("Error:\t", e);
  }
}
