const { ValidationError } = require('../errors');

const ifNotExists = (config) => {
  const {
    model,
    fields
  } = config;

  return async (req, res, next) => {
    try {
      const errors = [];

      const actions = fields.map((field) => (
        model.findOne({
          where: {
            [field]: req.body[field]
          }
        })
      ));

      const result = await Promise.all(actions);

      result.forEach((instance, i) => {
        if (instance) {
          errors.push({
            field: fields[i],
            message: `That ${fields[i]} is already in use`
          });
        }
      });

      if (errors.length > 0) {
        throw new ValidationError(errors);
      }

      next();
    } catch (e) {
      next(e);
    }
  };
};

module.exports = ifNotExists;
