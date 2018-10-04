const { confirmEmail } = require('../../controllers');

module.exports = (router) => {
  router.post('/api/email/confirm', confirmEmail);
};
