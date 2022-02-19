const connection = require("../db-config");
const Joi = require("joi");

const db = connection.promise();

const validateParticipant = (data) => {
  return Joi.object({
    lastname: Joi.string().max(100).required(),
    firstname: Joi.string().max(100).required(),
    licence: Joi.string().max(50).required(),
    email: Joi.string().max(100),
    phone: Joi.string().max(20).required(),
    club: Joi.string().max(255).required(),
    category: Joi.string().max(50).required(),
    food: Joi.number().required(),
    idEvent: Joi.number().required(),
    day: Joi.number().required(),
  }).validate(data, { abortEarly: false }).error;
};

const findManyParticipant = () => {
  return db.query("SELECT * FROM participants");
};

const findManyParticipantEvent = (idEvent) => {
  return db
    .query("SELECT * FROM participants WHERE idEvent = ?", [idEvent])
    .then(([results]) => results);
};

const findOneParticipant = (id) => {
  return db
    .query("SELECT * FROM participants WHERE id = ?", [id])
    .then(([results]) => results[0]);
};

const createParticipant = (
  lastname,
  firstname,
  licence,
  email,
  phone,
  club,
  category,
  food,
  idEvent,
  day
) => {
  return db.query(
    "INSERT INTO participants (lastname, firstname, licence, email, phone, club, category, food, idEvent, day) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [
      lastname,
      firstname,
      licence,
      email,
      phone,
      club,
      category,
      food,
      idEvent,
      day,
    ]
  );
};

const updateParticipant = (id, newAttributes) => {
  return db.query("UPDATE participants SET ? WHERE id = ?", [
    newAttributes,
    id,
  ]);
};

const deleteParticipant = (id) => {
  return db
    .query("DELETE FROM participants WHERE id = ?", [id])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = {
  validateParticipant,
  createParticipant,
  findManyParticipant,
  findOneParticipant,
  updateParticipant,
  deleteParticipant,
  findManyParticipantEvent,
};
