const { Op } = require('sequelize');
const { User } = require('../../models');
const { find } = require('../../middleware');
const smtpTransport = require('../../email');

const { MAILGUN_EMAIL } = process.env;

const confirmEmail = [
  find({
    model: User,
    method: 'findOne',
    where: (req) => ({
      resetEmailToken: req.body.token,
      resetEmailTokenExpiry: {
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
      const { user } = req;

      await user.update({
        email: user.resetEmail
      });

      await user.update({
        resetEmail: null,
        resetEmailToken: null,
        resetEmailTokenExpiry: null
      });

      const email = {
        to: user.email,
        from: MAILGUN_EMAIL,
        template: 'change-email-success',
        subject: 'Email Change Confirmation',
        context: {
          username: user.username
        }
      };

      await smtpTransport.sendMail(email);

      res.status(200).send({
        email: user.email
      });
    } catch (e) {
      next(e);
    }
  }
];

module.exports = confirmEmail;
