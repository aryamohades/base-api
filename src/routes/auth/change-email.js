const { changeEmail } = require('../../controllers');
const { requireLogin } = require('../../middleware');

module.exports = (router) => {
  router.post('/api/email/change', requireLogin, changeEmail);
};
