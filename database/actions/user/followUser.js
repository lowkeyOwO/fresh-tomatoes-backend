import userListModel from "../../models/userListModel.js";

export default async function followUser(req, res) {
  /*
    username follows followUN
    add followUN to UN's following list
    add UN to followUN's follower list
    */
  const username = res.locals.decodedUsername;
  const { followUsername } = req.body;
  // following List
  try {
    const followingListStatus = await userListModel.findOneAndUpdate(
      { username: username },
      {
        $push: {
          following: followUsername,
        },
      },
      { returnOriginal: false }
    );
    // Add to followers list
    const followerListStatus = await userListModel.findOneAndUpdate(
      { username: followUsername },
      {
        $push: {
          followers: username,
        },
      },
      { returnOriginal: false }
    );
    console.log(followerListStatus, followingListStatus);
    if (followerListStatus !== null && followingListStatus !== null) {
      res.status(200).json({ success: "Successfully followed user!" });
    }
  } catch (err) {
    console.log("Error in following:\t", err);
    res.status(500).json({ error: err });
  }
}
