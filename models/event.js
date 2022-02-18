const connection = require("../db-config");
const Joi = require("joi");

const validateEvent = (data) => {
  return Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().max(1000).required(),
    date: Joi.date().required(),
    place: Joi.string().max(150).required(),
  }).validate(data, { abortEarly: false }).error;
};

const findManyEvents = () => {
  return connection.promise().query("SELECT * FROM events");
};

const findOneEvent = (id) => {
  return connection
    .promise()
    .query("SELECT * FROM events WHERE id = ?", [id])
    .then(([results]) => results[0]);
};

const createEvent = (title, description, date, place) => {
  return connection
    .promise()
    .query(
      "INSERT INTO events (title, description, date, place) VALUES(?,?,?,?)",
      [title, description, date, place]
    );
};

const updateEvent = (id, newAttributes) => {
  return connection
    .promise()
    .query("UPDATE events SET ? WHERE id = ?", [newAttributes, id]);
};

const deleteEvent = (id) => {
  return connection
    .promise()
    .query("DELETE FROM events WHERE id = ?", [id])
    .then(([result]) => result.affectedRows !== 0);
};

module.exports = {
  validateEvent,
  createEvent,
  findManyEvents,
  findOneEvent,
  updateEvent,
  deleteEvent,
};
