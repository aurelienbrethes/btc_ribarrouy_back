const usersRouteur = require('./users');
const authRouteur = require('./auth');
const eventsRouteur = require('./events');

const setupRoutes = (app) => {
  app.use('/api/users', usersRouteur);
  app.use('/api/events', eventsRouteur);
  app.use('/api/auth', authRouteur);
};

module.exports = setupRoutes;
