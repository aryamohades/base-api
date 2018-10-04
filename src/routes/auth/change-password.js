const { changePassword } = require('../../controllers');
const { requireLogin } = require('../../middleware');

module.exports = (router) => {
  router.post('/api/password/change', requireLogin, changePassword);
};
