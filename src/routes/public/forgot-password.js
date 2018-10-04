const { forgotPassword } = require('../../controllers');

module.exports = (router) => {
  router.post('/api/password/forgot', forgotPassword);
};
