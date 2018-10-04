const { read } = require('../../controllers').user;

module.exports = (router) => {
  router.get('/api/user/:username', read);
};
