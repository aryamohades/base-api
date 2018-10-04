const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {
  MAILGUN_ACTIVE_API_KEY,
  MAILGUN_DOMAIN
} = process.env;

const mailgunOptions = {
  auth: {
    api_key: MAILGUN_ACTIVE_API_KEY,
    domain: MAILGUN_DOMAIN
  }
};

const transport = nodemailer.createTransport(mailgunTransport(mailgunOptions));

const handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.join(__dirname, 'templates'),
  extName: '.hbs'
};

transport.use('compile', hbs(handlebarsOptions));

module.exports = transport;
