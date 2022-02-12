const usersRouteur = require('./users');
const authRouteur = require('./auth');
const eventsRouteur = require('./events');
const participatnsRouteur = require('./participants');

const setupRoutes = (app) => {
  app.use('/api/users', usersRouteur);
  app.use('/api/events', eventsRouteur);
  app.use('/api/', authRouteur);
  app.use('/api/participants', participatnsRouteur);
};

module.exports = setupRoutes;
