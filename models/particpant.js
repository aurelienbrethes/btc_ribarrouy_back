const connection = require('../db-config');
const Joi = require('joi');

const db = connection.promise();

const validateParticipant = (data) => {
  return Joi.object({
    nom: Joi.string().max(100).required(),
    prenom: Joi.string().max(100).required(),
    licence: Joi.string().max(50).required(),
    email: Joi.string().max(100),
    tel: Joi.string().max(20).required(),
    idEvent: Joi.number().required(),
  }).validate(data, { abortEarly: false }).error;
};

const findManyParticipant = () => {
  return db
    .query(
      'SELECT * FROM participants',
    )
};

const findOneParticipant = (id) => {
  return db
    .query('SELECT * FROM participants WHERE id = ?', [id])
    .then(([results]) => results[0]);
};

const createParticipant = (nom, prenom, licence, email, tel, idEvent) => {
  return db
    .query(
      'INSERT INTO participants (nom, prenom, licence, email, tel, idEvent) VALUES(?,?,?,?,?,?)',
      [nom, prenom, licence, email, tel, idEvent]
    );
};

const updateParticipant = (id, newAttributes) => {
  return db
  .query('UPDATE participants SET ? WHERE id = ?', [newAttributes, id]);
};

const deleteParticipant = (id) => {
  return db
  .query('DELETE FROM participants WHERE id = ?', [id])
  .then(([result]) => result.affectedRows !== 0);
}


module.exports = {
    validateParticipant,
    createParticipant,
    findManyParticipant,
    findOneParticipant,
    updateParticipant,
    deleteParticipant
};
