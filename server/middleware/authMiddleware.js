import jwt from 'jsonwebtoken';
import config from 'config';
import tokenService from '../services/tokenService.js';

export default function(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      return res.status(401).json({ message: "Not authrized" });
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return res.status(401).json({ message: "Not authrized" });
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: "Not authorized" });
  }
}