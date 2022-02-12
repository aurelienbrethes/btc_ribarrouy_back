const connection = require('../db-config');

const argon = require('argon2');

const Joi = require('joi');


const hashOptions = {
  type: argon.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const validate = (data) => {
  return Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(5).max(100).required(),
  }).validate(data, { abortEarly: false }).error;
};


const cryptePassword = (password) => {
  return argon.hash(password, hashOptions);
};


const verifyPassword = (password, cryptedPassword) => {
  return argon.verify(cryptedPassword, password, hashOptions);
};


const create = (email, password) => {
  return connection
    .promise()
    .query(
      'INSERT INTO admin (email, hashedPassword) VALUES(?,?)',
      [email, password]
    );
};

const findMany = () => {
  return connection
    .promise()
    .query(
      'SELECT * FROM admin',
    )
  };

const findOne = (id) => {
  return connection
    .promise()
    .query('SELECT * FROM admin WHERE id = ?', [id])
    .then(([results]) => results[0]);
};

const update = (id, newAttributes) => {
  return connection
  .promise()
  .query('UPDATE admin SET ? WHERE id = ?', [newAttributes, id]);
};


const getByEmail = (email) => {
  return connection
    .promise()
    .query('SELECT * FROM admin WHERE email = ?', [email]);
};

module.exports = {
  cryptePassword,
  validate,
  create,
  getByEmail,
  verifyPassword,
  findMany,
  update,
  findOne
};
