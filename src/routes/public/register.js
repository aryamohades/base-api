const { register } = require('../../controllers');

module.exports = (router) => {
  router.post('/api/register', register);
};
