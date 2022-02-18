const participantsRouteur = require("express").Router();
const Participant = require("../models/particpant");
const { readUserFromCookie } = require("../helpers/users");
require("dotenv").config();

participantsRouteur.get("/", (req, res) => {
  Participant.findManyParticipant()
    .then((result) => res.status(200).json(result[0]))
    .catch((err) => res.status(500).send(console.log(err)));
});

participantsRouteur.get("/event/:idEvent", (req, res) => {
  Participant.findManyParticipantEvent(req.params.idEvent)
    .then((participants) => {
      if (participants) {
        res.status(200).json(participants);
      } else {
        res.status(404).send("L'évènement n'a pas encore de participants");
      }
    })
    .catch((err) => res.status(500).send(console.log(err)));
});

participantsRouteur.get("/:id", (req, res) => {
  Participant.findOneParticipant(req.params.id)
    .then((participant) => {
      if (participant) {
        res.status(200).json(participant);
      } else {
        res.status(404).send("Le participant n'existe pas");
      }
    })
    .catch((err) => res.status(500).send(console.log(err)));
});

participantsRouteur.post("/", (req, res) => {
  const { lastname, firstname, licence, email, phone, idEvent } = req.body;
  const validationErrors = Participant.validateParticipant(req.body);
  if (validationErrors) {
    res.status(422).send(validationErrors.details);
    console.log(validationErrors.details);
  } else {
    Participant.createParticipant(
      lastname,
      firstname,
      licence,
      email,
      phone,
      idEvent
    )
      .then(() => res.status(201).json(req.body))
      .catch((error) => res.status(500).send(console.log(error)));
  }
});

participantsRouteur.put("/:id", readUserFromCookie, (req, res) => {
  let existingParticipant = null;
  let validationErrors = null;
  Participant.findOneParticipant(req.params.id)
    .then((participant) => {
      existingParticipant = participant;
      if (!existingParticipant) return Promise.reject("Participant_NOT_FOUND");
      validationErrors = Participant.validateParticipant(req.body, false);
      return Participant.updateParticipant(req.params.id, req.body);
    })
    .then(() => {
      res.status(200).json({ ...existingParticipant, ...req.body });
    })
    .catch((err) => res.status(500).send(console.log(err)));
});

participantsRouteur.delete("/:id", readUserFromCookie, (req, res) => {
  Participant.deleteParticipant(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send("🎉 Participant deleted!");
      else res.status(404).send("Participant not found");
    })
    .catch((err) => res.status(500).send(console.log(err)));
});

module.exports = participantsRouteur;
