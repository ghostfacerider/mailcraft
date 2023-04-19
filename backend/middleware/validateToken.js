
const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {

// check for the existance of a token in request header (x-auth-token) 
  let token = req.headers["x-auth-token"];

  //if it doesn't exist, send a response 401 unauthoroized
  //if it does exist, make sure it is valid..
  if (!token) {
    return res.status(401).send({ message: "Unauthorized! no token" });
  }

 //if not send 401, otherwise allow
//request to poceed on 
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
        console.log(err);
      return res.status(401).send({ message: "Unauthorized!" });
    }
    next();
  });
} 
module.exports = validateToken