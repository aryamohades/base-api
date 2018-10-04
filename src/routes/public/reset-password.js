const { resetPassword } = require('../../controllers');

module.exports = (router) => {
  router.post('/api/password/reset', resetPassword);
};
