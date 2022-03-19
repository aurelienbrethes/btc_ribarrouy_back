const eventsRouteur = require("express").Router();
const Event = require("../models/event");
const { readUserFromCookie } = require("../helpers/users");
require("dotenv").config();

eventsRouteur.get("/", (req, res) => {
  Event.findManyEvents()
    .then((result) => res.status(200).json(result[0]))
    .catch((err) => res.status(500).send(console.log(err)));
});

eventsRouteur.get("/:id", (req, res) => {
  Event.findOneEvent(req.params.id)
    .then((btEvent) => {
      if (btEvent) {
        res.status(200).json(btEvent);
      } else {
        res.status(404).send("L'évènement n'existe pas");
      }
    })
    .catch((err) => res.status(500).send(console.log(err)));
});

eventsRouteur.post("/", readUserFromCookie, (req, res) => {
  const { title, description, date, place } = req.body;
  const validationErrors = Event.validateEvent(req.body);
  if (validationErrors) {
    res.status(422).json(validationErrors.details);
  } else {
    Event.createEvent(title, description, date, place)
      .then((result) => res.status(201).json(req.body))
      .catch((error) => res.status(500).send(console.log(error)));
  }
});

eventsRouteur.put("/:id", readUserFromCookie, (req, res) => {
  let existingEvent = null;
  let validationErrors = null;
  Event.findOneEvent(req.params.id)
    .then((btEvent) => {
      existingEvent = btEvent;
      if (!existingEvent) return Promise.reject("EVENT_NOT_FOUND");
      validationErrors = Event.validateEvent(req.body, false);
      return Event.updateEvent(req.params.id, req.body);
    })
    .then(() => {
      res.status(200).json({ ...existingEvent, ...req.body });
    })
    .catch((err) => res.status(500).send(console.log(err)));
});

eventsRouteur.delete("/:id", readUserFromCookie, (req, res) => {
  Event.deleteEvent(req.params.id)
    .then((deleted) => {
      if (deleted) res.status(200).send("🎉 Event deleted!");
      else res.status(404).send("Event not found");
    })
    .catch((err) => res.status(500).send(console.log(err)));
});

module.exports = eventsRouteur;
