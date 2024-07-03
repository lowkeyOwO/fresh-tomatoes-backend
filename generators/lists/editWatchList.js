import fetch from "node-fetch";

const addOrRemove = {
  "add" : true,
  "remove" : false
};
export default async function editWatchList(req, res) {
  try {
    const account_id = res.locals.decodedAccountId;
    const session_id = res.locals.decodedSessionId;
    const { movie_id, action } = req.body;
    const watchListURL = `https://api.themoviedb.org/3/account/${account_id}/watchlist?session_id=${session_id}`;
    const watchListOPT = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movie_id,
        watchlist: addOrRemove.action,
      }),
    };
    const watchListStatus = await fetch(watchListURL, watchListOPT);
    const watchListData = await watchListStatus.json();
    console.log("WatchList:\t", watchListData);
    if (watchListStatus.success) {
      res.status(200).json({ success: watchListData });
    } else {
      res.status(200).json({ error: watchListData });
    }
  } catch (err) {
    console.log("Error:\t", err);
    res.status(500).json({ error: err });
  }
}
