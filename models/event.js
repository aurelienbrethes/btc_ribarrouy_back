const connection = require('../db-config');
const Joi = require('joi');

const validateEvent = (data) => {
  return Joi.object({
    titre: Joi.string().max(255).required(),
    description: Joi.string().max(100).required(),
    lieu: Joi.string().max(150).required(),
    date: Joi.string().max(100).required(),
  }).validate(data, { abortEarly: false }).error;
};

const findManyEvents = () => {
  return connection
    .promise()
    .query(
      'SELECT * FROM events',
    )
};

const findOneEvent = (id) => {
  return connection
    .promise()
    .query('SELECT * FROM events WHERE id = ?', [id])
    .then(([results]) => results[0]);
};

const createEvent = (titre, description, lieu, date) => {
  return connection
    .promise()
    .query(
      'INSERT INTO events (titre, description, lieu, date) VALUES(?,?,?,?)',
      [titre, description, lieu, date]
    );
};

const updateEvent = (id, newAttributes) => {
  return connection
  .promise()
  .query('UPDATE events SET ? WHERE id = ?', [newAttributes, id]);
};

const deleteEvent = (id) => {
  return connection
  .promise()
  .query('DELETE FROM events WHERE id = ?', [id])
  .then(([result]) => result.affectedRows !== 0);
}


module.exports = {
validateEvent,
createEvent,
findManyEvents,
findOneEvent,
updateEvent,
deleteEvent
};
