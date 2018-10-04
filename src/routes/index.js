const express = require('express');
const authRoutes = require('./auth');
const publicRoutes = require('./public');

// Initialize router
const router = express.Router();

// Inject auth routes
Object.values(authRoutes).forEach((route) => {
  route(router);
});

// Inject public routes
Object.values(publicRoutes).forEach((route) => {
  route(router);
});

module.exports = router;
