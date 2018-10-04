const create = (config) => {
  const {
    model,
    source,
    method,
    data,
    serialize,
    associate,
    updateRequest,
    end = true
  } = config;

  return async (req, res, next) => {
    try {
      const createData = data(req);

      const newEntry = source
        ? await req[source][method](createData)
        : await model.create(createData);

      if (associate) {
        await Promise.all(associate(req, newEntry));
      }

      if (end) {
        const responseData = serialize
          ? serialize(newEntry)
          : null;

        res.status(201).send(responseData);
      } else {
        if (updateRequest) {
          updateRequest(req);
        }

        next();
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports = create;
