// étape 6
const { usersRouteur } = require('./users');
const authRouteur = require('./auth');
const eventsRouteur = require('./events');

// étape 6
const setupRoutes = (app) => {
  app.use('/api/users', usersRouteur);
  app.use('/api/events', eventsRouteur);
  app.use('/api/auth', authRouteur);
};

// étape 6
module.exports = setupRoutes;
