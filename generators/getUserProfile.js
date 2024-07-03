import fetch from "node-fetch";
import { config } from "dotenv";
import userListModel from "../database/models/userListModel.js";
config();

/*
Gets the user details from TMDB account
*/

export default async function getTMDBDetails(account_id, session_id,username) {
  const getProfileDetailsURL = `https://api.themoviedb.org/3/account/${account_id}?session_id=${session_id}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + `${process.env.API_KEY}`,
    },
  };
  try {
    const result = await fetch(getProfileDetailsURL, options);
    const response = await result.json();
    let avatar_path = "";
    if (response.avatar.tmdb.avatar_path === null) {
      avatar_path = "";
    } else {
      avatar_path = response.avatar.tmdb.avatar_path;
    }
    const avatarPathUpdate = await userListModel.findOneAndUpdate({
      username: username
    }, {
        "avatar_path" : avatar_path
    })
    return response;
  } catch (err) {
    console.error("Error:\t", err);
    return { error: err };
  }
}
