require('dotenv').config();
const jwt = require('jsonwebtoken');


const calculateToken = (userEmail = '', userId = 0) => {
  return jwt.sign({ email: userEmail, id: userId }, process.env.PRIVATE_KEY);
};

const readUserFromCookie = (req, res, next) => {
  const userInfo = jwt.verify(req.cookies.monCookie, process.env.PRIVATE_KEY);
  req.userId = userInfo.id;
  next();
};

module.exports = { calculateToken, readUserFromCookie };
