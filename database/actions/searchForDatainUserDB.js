import userListModel from "../models/userListModel.js";

export default async function searchForDatainUserDB(searchVal) {
  try {
    const nameRegex = new RegExp(searchVal, "i");
    const users = await userListModel.find({ username: { $regex: nameRegex } }, "username bio avatar_path");
    console.log(users);
    return { users };
  } catch (err) {
    console.error(err);
    throw new Error({ error: err });
  }
}
