const { NotFoundError } = require('../errors');

const edit = (config) => {
  const {
    model,
    data,
    where,
    validate,
    beforeUpdate,
    updateRequest,
    end = true,
    errorOnEmpty = true
  } = config;

  return async (req, res, next) => {
    try {
      const updateData = data(req);

      if (validate) {
        validate(updateData);
      }

      const q = {
        where: where(req),
        returning: true
      };

      if (beforeUpdate) {
        beforeUpdate(updateData);
      }

      const result = await model.update(updateData, q);

      const updatedCount = result[0];
      const updatedData = result[1][0];

      if (updatedCount === 0 && errorOnEmpty) {
        throw new NotFoundError();
      }

      if (end) {
        res.status(200).send();
      } else {
        req.updatedCount = updatedCount;

        if (updateRequest) {
          updateRequest(req, updatedData);
        }

        next();
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports = edit;
