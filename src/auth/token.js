const jwt = require('jsonwebtoken');

/**
 * Generate auth token.
 *
 * @param {Object} user - User object
 */
module.exports = (user) => {
  const token = jwt.sign({
    id: user.id
  }, process.env.APP_SECRET);

  return `JWT ${token}`;
};
