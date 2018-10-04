const {
  ExtractJwt,
  Strategy
} = require('passport-jwt');

const LocalStrategy = require('passport-local');
const credentials = require('./credentials');
const { User } = require('../models');

const { APP_SECRET } = process.env;

// Define jwt authentication options
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: APP_SECRET
};

// Define local login options
const localOpts = {
  usernameField: 'username',
  passwordField: 'password'
};

// Initialize local login strategy
const localStrategy = new LocalStrategy(localOpts, async (username, password, done) => {
  const user = await User.findOne({
    where: {
      username
    }
  });

  if (!user) {
    return done(null, false);
  }

  const match = await credentials.compare(password, user.password);

  return match ? done(null, user) : done(null, false);
});

// Initialize jwt authentication strategy
const jwtStrategy = new Strategy(jwtOpts, async (payload, done) => {
  const user = await User.findById(payload.id, {
    attributes: { exclude: ['password'] }
  });

  return user ? done(null, user) : done(null, false);
});

module.exports = (passport) => {
  passport.use(localStrategy);
  passport.use(jwtStrategy);
};
