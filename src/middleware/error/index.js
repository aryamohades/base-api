const handleError = require('./handler');

module.exports = (app) => {
  app.use((err, req, res, next) => {
    try {
      handleError(err);
    } catch (e) {
      err = e;
    }

    const response = err.json
      ? err.json()
      : { message: err.message };

    res.status(err.code || 500).send(response);
  });
};
