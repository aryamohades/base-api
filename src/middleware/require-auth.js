const passport = require('passport');

// Initialize authentication required middleware
module.exports = passport.authenticate('jwt', {
  session: false
});
