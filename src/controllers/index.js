const publicControllers = require('./public');
const authControllers = require('./auth');

module.exports = {
  ...publicControllers,
  ...authControllers
};
