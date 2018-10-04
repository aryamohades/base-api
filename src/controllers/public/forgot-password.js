const { User } = require('../../models');
const { find } = require('../../middleware');
const resetToken = require('../../auth/reset-token');
const smtpTransport = require('../../email');

const {
  RESET_PASSWORD_URL,
  MAILGUN_EMAIL
} = process.env;

/**
 * Forgot password handler
 *
 * Used to initiate the reset password process.
 */
const forgotPassword = [
  find({
    model: User,
    method: 'findOne',
    where: (req) => ({
      email: req.body.email
    }),
    updateRequest: (req, data) => {
      req.user = data;
    },
    end: false
  }),
  async (req, res, next) => {
    try {
      const { user } = req;

      const token = await resetToken();
      const expiryDate = new Date();

      // Set token expiration to 1 day from now
      expiryDate.setDate(expiryDate.getDate() + 1);

      await user.update({
        resetPasswordToken: token,
        resetPasswordTokenExpiry: expiryDate
      });

      const email = {
        to: user.email,
        from: MAILGUN_EMAIL,
        template: 'reset-password',
        subject: 'Password Reset Request',
        context: {
          url: `${RESET_PASSWORD_URL}${token}`,
          username: user.username
        }
      };

      await smtpTransport.sendMail(email);

      res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
];

module.exports = forgotPassword;
