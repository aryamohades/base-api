const { read } = require('../../controllers').authUser;
const { requireAuth } = require('../../middleware');

module.exports = (router) => {
  router.get('/api/account', requireAuth, read);
};
