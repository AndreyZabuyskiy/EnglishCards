import jwt from 'jsonwebtoken';
import config from 'config';

export default function(req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Not authrized" });
    }

    const decoded = jwt.verify(token, config.get('seckretKey'));
    console.log('decoded --> ', decoded);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: "Not authorized" });
  }
}