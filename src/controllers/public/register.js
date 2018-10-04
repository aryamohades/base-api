const { User } = require('../../models');
const {
  insert,
  ifNotExists
} = require('../../middleware');
const token = require('../../auth/token');

const register = [
  ifNotExists({
    model: User,
    fields: [
      'username',
      'email'
    ]
  }),
  insert({
    model: User,
    data: (req) => ({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }),
    serialize: (user) => ({
      user: {
        email: user.email,
        username: user.username
      },
      token: token(user)
    })
  })
];

module.exports = register;
