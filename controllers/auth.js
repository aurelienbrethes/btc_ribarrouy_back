const authRouteur = require("express").Router();
const { getByEmail, verifyPassword } = require("../models/user");
const { calculateToken } = require("../helpers/users");

authRouteur.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  getByEmail(email)
    .then(([users]) => users[0])
    .then((user) => {
      if (!user) {
        res.status(422).send("email incorrect");
      } else {
        verifyPassword(password, user.hashedPassword).then((passwordOk) => {
          if (passwordOk) {
            const token = calculateToken(email, user.id);
            res.cookie("monCookie", token);
            res.send();
          }
        });
      }
    })
    .catch((err) => console.log(err));
});

module.exports = authRouteur;
