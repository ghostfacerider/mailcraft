import jwt from 'jsonwebtoken';
import logger from '../config/index.js';

export default (req, res, next) => {
  // check for the existance of a token in request header (x-auth-token)
  const token = req.headers['x-auth-token'];

  // if it doesn't exist, send a response 401 unauthoroized
  // if it does exist, make sure it is valid..
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized! no token' });
  }

  // if not send 401, otherwise allow
  // request to poceed on
  return jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) {
      logger.error(err);
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    return next();
  });
};
