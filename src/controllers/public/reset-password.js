const { Op } = require('sequelize');
const { User } = require('../../models');
const { find } = require('../../middleware');
const { BadRequestError } = require('../../errors');
const smtpTransport = require('../../email');

const {
  LOGIN_URL,
  MAILGUN_EMAIL
} = process.env;

/**
 * Reset password handler
 *
 * Used to create a new password after user has completed forgot reset process.
 */
const resetPassword = [
  find({
    model: User,
    method: 'findOne',
    where: (req) => ({
      resetPasswordToken: req.body.token,
      resetPasswordTokenExpiry: {
        [Op.gt]: Date.now()
      }
    }),
    updateRequest: (req, data) => {
      req.user = data;
    },
    end: false
  }),
  async (req, res, next) => {
    try {
      const {
        body: {
          password,
          confirmPassword
        },
        user
      } = req;

      if (password !== confirmPassword) {
        throw new BadRequestError('The passwords do not match');
      }

      await user.update({
        password
      });

      await user.update({
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null
      });

      const email = {
        to: user.email,
        from: MAILGUN_EMAIL,
        template: 'reset-password-success',
        subject: 'Password Reset Confirmation',
        context: {
          url: LOGIN_URL,
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

module.exports = resetPassword;
