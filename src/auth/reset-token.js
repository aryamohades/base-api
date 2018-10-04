const crypto = require('crypto');

/**
 * Generate a random token for resetting account information.
 *
 * @param {int} length - Token length
 */
module.exports = (length = 32) => (
  new Promise((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  })
);
