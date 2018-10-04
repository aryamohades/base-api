const Sequelize = require('sequelize');
const fixtures = require('sequelize-fixtures');

const { DATABASE_URL } = process.env;

// Initialize sequelize
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false
});

// Initialize models
const User = require('./user')(sequelize);

module.exports = {
  fixtures,
  sequelize,
  Sequelize,
  User
};
