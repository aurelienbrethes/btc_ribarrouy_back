// étape 3
// create table users(id_user integer not null auto_increment, firstname varchar(100),
// lastname varchar(150), email varchar(255), password varchar(255), primary key (`id_user`));

const connection = require('../db-config');
// étape 7
const argon = require('argon2');
// étape 10
const Joi = require('joi');

// étape 8
const hashOptions = {
  type: argon.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// étape 10
const validate = (data) => {
  return Joi.object({
    email: Joi.string().email().max(255).required(),
    firstname: Joi.string().max(100).required(),
    lastname: Joi.string().max(150).required(),
    password: Joi.string().min(7).max(11).required(),
  }).validate(data, { abortEarly: false }).error;
};

// étape 8
const cryptePassword = (password) => {
  return argon.hash(password, hashOptions);
};

// étape 20
const verifyPassword = (password, cryptedPassword) => {
  return argon.verify(cryptedPassword, password, hashOptions);
};

// étape 13
const create = (firstname, lastname, email, password) => {
  return connection
    .promise()
    .query(
      'INSERT INTO users (firstname, lastname, email, password) VALUES(?,?,?,?)',
      [firstname, lastname, email, password]
    );
};

// étape 18
const getByEmail = (email) => {
  return connection
    .promise()
    .query('SELECT * FROM users WHERE email = ?', [email]);
};

// test de l'étape 8
// cryptePassword("curry").then((hashedPassword) => console.log(hashedPassword));

module.exports = {
  cryptePassword,
  validate,
  create,
  getByEmail,
  verifyPassword,
};
