const requireLogin = require('./require-login');
const requireAuth = require('./require-auth');
const optionalAuth = require('./optional-auth');
const error = require('./error');
const find = require('./find');
const insert = require('./insert');
const remove = require('./remove');
const edit = require('./edit');
const ifNotExists = require('./if-not-exists');

module.exports = {
  error,
  requireLogin,
  requireAuth,
  optionalAuth,
  find,
  insert,
  remove,
  edit,
  ifNotExists
};
