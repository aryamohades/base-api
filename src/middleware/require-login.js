const passport = require('passport');

// Initialize login required middleware
module.exports = passport.authenticate('local', {
  session: false
});
