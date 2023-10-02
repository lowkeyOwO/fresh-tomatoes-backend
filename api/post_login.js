import getRequestToken from "../generators/tokenRequest.js";
import userAuth from "../generators/userAuth.js";
import newSession from "../generators/newSession.js";
import cacheCheck from "../cache/cacheCheck.js";
import addToCache from "../cache/addToCache.js";
import client from "../cache/cacheClient.js";
import jwt from "jsonwebtoken";
import getAccountId from "../generators/getAccountId.js";

export default async function post_login(req, res) {
  const reqBody = req.body;
  const requestTokenGenerator = await getRequestToken();
  const userAuthenticator = await userAuth(requestTokenGenerator, reqBody);
  let session_id = "";
  if (userAuthenticator.success) {
    // Checking in cache if a session id already exists for the user
    try {
      const checkSesh = await cacheCheck(reqBody.username, client);
      if (checkSesh !== null) {
        session_id = checkSesh;
      } else {
        const seshVal = await newSession(userAuthenticator, res);
        session_id = seshVal.session_id;
        addToCache(reqBody.username, session_id, client);
      }
      const account_id = await getAccountId(session_id);
      const userToken = jwt.sign(
        { username: reqBody.username, session_id, account_id },
        process.env.JWT_KEY,
        { expiresIn: 14 * 24 * 60 * 60 }
      );
      //Expires in 14 days
      res.status(200).json({ token: userToken }).end();
    } catch (error) {
      console.error("Error:", error);
    }
    // If the user has invalid credentials
  } else {
    res.status(400).json({ error: userAuthenticator.status_message }).end();
  }
}
