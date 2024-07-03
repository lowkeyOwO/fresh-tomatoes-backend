import userListModel from "../../models/userListModel.js";

export default async function getUserDetails(req, res) {
  try {
    const getUserStatus = await userListModel.findOne({
      username: req.body.username,
    });
    if (getUserDetails !== null) {
      res.status(200).json(getUserStatus);
    } else {
      res.status(500).json({ error: "User not Found!" });
    }
  } catch (err) {
    console.log("Error:\t", err);
    res.status(500).json({ error: err });
  }
}
