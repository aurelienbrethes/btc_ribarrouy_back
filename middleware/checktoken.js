const jwt = require("jsonwebtoken");
require('dotenv').config();

const readUserFromCookie = (req, res, next) => {
  const userInfo = jwt.verify(req.cookies.monCookie, process.env.PRIVATE_KEY);
  req.userId = userInfo.id;
  next();
};

export default readUserFromCookie;
