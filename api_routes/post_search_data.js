import searchForDatainUserDB from "../database/actions/searchForDatainUserDB.js";
import searchForDatainTMDB from "../generators/searchForDatainTMDB.js";

export default async function post_search_data(req, res) {
  try {
    const {searchVal} = req.body;
    const session_id = res.locals.decodedSessionId;
    const searchData = await searchForDatainTMDB(searchVal, session_id);
    const userData = await searchForDatainUserDB(searchVal);
    res.status(200).json({...searchData,...userData})
  } catch (err) { console.log("post_profile Error:\t", err);
    res.status(504).json({ error: "Error occurred!" });}
}
