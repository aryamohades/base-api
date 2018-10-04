const { NotFoundError } = require('../errors');

const remove = (config) => {
  const {
    model,
    where,
    data,
    source,
    method,
    end = true,
    errorOnEmpty = true
  } = config;

  return async (req, res, next) => {
    try {
      let deletedCount;

      if (source) {
        deletedCount = where
          ? await req[source][method](data(req), where(req))
          : await req[source][method](data(req));
      } else {
        deletedCount = model.destroy({ where: where(req) });
      }

      if (deletedCount === 0 && errorOnEmpty) {
        throw new NotFoundError();
      }

      if (end) {
        res.status(200).send();
      } else {
        req.deletedCount = deletedCount;
        next();
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports = remove;
