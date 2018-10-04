const { login } = require('../../controllers');
const { requireLogin } = require('../../middleware');

module.exports = (router) => {
  router.post('/api/login', requireLogin, login);
};
