const passport = require('passport');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    req.authenticated = !!user;
    req.user = user;
    next();
  })(req, res, next);
};
