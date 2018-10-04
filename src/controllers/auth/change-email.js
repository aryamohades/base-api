const { BadRequestError } = require('../../errors');
const resetToken = require('../../auth/reset-token');
const smtpTransport = require('../../email');

const {
  CONFIRM_EMAIL_URL,
  MAILGUN_EMAIL
} = process.env;

/**
 * Change email handler
 *
 * Used to update a user's email while they are logged in
 */
const changeEmail = async (req, res, next) => {
  try {
    const {
      body: {
        email,
        confirmEmail
      },
      user
    } = req;

    if (email !== confirmEmail) {
      throw new BadRequestError('The emails do not match');
    }

    const token = await resetToken();
    const expiryDate = new Date();

    // Set token expiration to 1 day from now
    expiryDate.setDate(expiryDate.getDate() + 1);

    await user.update({
      resetEmail: email,
      resetEmailToken: token,
      resetEmailTokenExpiry: expiryDate
    });

    const emailConfig = {
      to: email,
      from: MAILGUN_EMAIL,
      template: 'change-email',
      subject: 'Email Change Request',
      context: {
        url: `${CONFIRM_EMAIL_URL}${token}`,
        username: user.username
      }
    };

    await smtpTransport.sendMail(emailConfig);

    res.status(200).send();
  } catch (e) {
    next(e);
  }
};

module.exports = changeEmail;
