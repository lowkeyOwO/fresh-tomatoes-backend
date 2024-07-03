import userListModel from "../../models/userListModel.js";

export default async function unfollowUser(req,res) {

  /*
    username unfollows followUN
    remove followUN from UN's following list
    remove UN from followUN's follower list
    */
  const username = res.locals.decodedUsername;
  const { unfollowUsername } = req.body;
  // following List
  try {
    const followingListStatus = await userListModel.findOneAndUpdate(
      { username: username },
      {
        $pull: {
          following: unfollowUsername,
        },
      },
      { returnOriginal: false }
    );
    // Add to followers list
    const followerListStatus = await userListModel.findOneAndUpdate(
      { username: unfollowUsername },
      {
        $pull: {
          followers: username,
        },
      }
    );
    if (followerListStatus !== null && followingListStatus !== null) {
      res.status(200).json({ success: "Successfully unfollowed user!" });
    }
  } catch (err) {
    console.log("Error in following:\t", err);
    res.status(500).json({ error: err });
  }
}

