import { getHomePage } from "../generators/getHomePage.js";

export default async function get_homepage(req, res) {
  try {
    const homepageData = await getHomePage(res.locals.decodedSessionId);
    if (homepageData) {
      res.status(200).json(homepageData).end();
    }
  } catch (err) {
    res.status(504).json({ error: err }).end();
  }
}
