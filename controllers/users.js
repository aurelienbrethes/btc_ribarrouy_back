const usersRouteur = require("express").Router();
const User = require("../models/user");
const { readUserFromCookie } = require("../helpers/users");

require("dotenv").config();
const jwt = require("jsonwebtoken");

usersRouteur.get("/", (req, res) => {
  User.findMany()
    .then((result) => res.status(200).send(result[0]))
    .catch((err) => res.status(500).send(console.log(err)));
});

usersRouteur.get("/id", (req, res) => {
  User.getByEmail()
    .then((result) => res.status(200).json(result[0]))
    .catch((err) => res.status(500).send(console.log(err)));
});

usersRouteur.put("/:id", readUserFromCookie, (req, res) => {
  let newUser;
  const { email, password } = req.body;
  let existingUser = null;
  let validationErrors = null;
  User.findOne(req.params.id)
    .then((user) => {
      existingUser = user;
      if (!existingUser) {
        res.status(404).send("utilisateur introuvable");
      } else {
        validationErrors = User.validate(req.body);
        if (validationErrors) {
          res.status(500).send("erreur de données");
        } else {
          User.cryptePassword(password).then((hashedPassword) => {
            newUser = { email, hashedPassword };
            User.update(req.params.id, newUser);
          });
        }
      }
    })
    .then(() => {
      res.status(200).json("Utilisateur modifié avec succès");
    })
    .catch((err) => res.status(500).send(console.log(err)));
});

usersRouteur.post("/", (req, res) => {
  const { email, password } = req.body;
  const validationErrors = User.validate(req.body);
  console.log(req.userId);
  if (validationErrors) {
    res.status(422).json(validationErrors.details);
  } else {
    User.cryptePassword(password).then((hashedPassword) =>
      User.create(email, hashedPassword)
        .then((result) => result[0].insertId)
        .then((id) => res.status(201).json({ id, ...req.body }))
        .catch((error) =>
          res.status(500).send("Impossible de créer cet utilisateur")
        )
    );
  }
});

module.exports = usersRouteur;
