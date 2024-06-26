import getPersonDetails from "../generators/getPersonDetails.js";

export default async function get_person_details(req, res) {
  const { person_id } = req.body;
  const session_id = res.locals.decodedSessionId;
  try {
    const person_details = await getPersonDetails(person_id, session_id);
    res.status(200).json(person_details).end();
  } catch (err) {
    res.status(500).json(err);
  }
}
