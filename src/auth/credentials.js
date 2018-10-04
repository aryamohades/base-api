const bcrypt = require('bcryptjs');
const validator = require('validator');

/**
 * Hash and salt password using bcrypt.
 *
 * @param {String} password - Plain text password
 */
const encrypt = (password) => (
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        return err ? reject(err) : resolve(hash);
      });
    });
  })
);

/**
 * Compare plain text password to hashed password using bcrypt.
 *
 * @param {String} candidate - Plain text password
 * @param {String} password - Hashed password
 */
const compare = (candidate, password) => (
  new Promise((resolve, reject) => {
    bcrypt.compare(candidate, password, (err, match) => {
      return err ? reject(err) : resolve(match);
    });
  })
);

/**
 * Normalize an email address.
 *
 * @param {String} email - Email to normalize
 */
const normalizeEmail = (email) => (
  validator.normalizeEmail(email, {
    all_lowercase: true
  })
);

module.exports = {
  encrypt,
  compare,
  normalizeEmail
};
