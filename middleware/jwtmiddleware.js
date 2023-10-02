import jwt from "jsonwebtoken";

export default function verifyToken(req, res, next) {
  try {
    const { username, session_id, account_id } = jwt.decode(
      req.body.token,
      process.env.JWT_KEY
    );
    if (username === null || session_id === null || account_id === undefined) {
      res.status(400).json({ error: "Invalid Token, Access Denied!" });
    } else {
      // Storing the decoded username and session_id in res.locals
      res.locals.decodedUsername = username;
      res.locals.decodedSessionId = session_id;
      res.locals.decodedAccountId = account_id;
      next();
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Token, Access Denied!" });
  }
}
