const { NotFoundError } = require('../errors');

const DEFAULT_LIMIT = 200;
const MAX_LIMIT = 200;

const getLimit = (req) => {
  const limit = Number(req.query.limit);

  if (Number.isNaN(limit)) {
    return DEFAULT_LIMIT;
  }

  return limit < 1 || limit > MAX_LIMIT
    ? DEFAULT_LIMIT
    : limit;
};

const getOffset = (req, limit) => {
  const page = Number(req.query.page);

  if (!Number.isInteger(page) || page < 1) {
    return 0;
  }

  return (page - 1) * limit;
};

const getTotalPages = (total, pageSize) => (
  Math.ceil(total / pageSize)
);

const find = (config) => {
  const {
    model,
    attributes,
    includeIgnoreAttributes = true,
    source,
    serialize,
    manualCount,
    updateRequest,
    where,
    order,
    include,
    raw,
    method = 'findAll',
    distinct = true,
    end = true
  } = config;

  return async (req, res, next) => {
    try {
      const limit = getLimit(req);
      const offset = getOffset(req, limit);

      const q = {
        attributes,
        includeIgnoreAttributes,
        distinct,
        limit,
        offset,
        raw
      };

      q.include = typeof include === 'function'
        ? include(req)
        : include;

      if (where) {
        q.where = where(req);
      }

      if (order) {
        q.order = order(req);
      }

      const data = source
        ? await req[source][method](q)
        : await model[method](q);

      if (!data && method === 'findOne') {
        throw new NotFoundError();
      }

      if (end) {
        const options = {};

        if (manualCount) {
          const total = await req[source][manualCount]();

          options.pages = getTotalPages(total, limit);
          options.total = total;
        } else if (method !== 'findOne') {
          options.pages = getTotalPages(data.count, limit);
          options.total = data.count;
        }

        let responseData;

        if (serialize) {
          responseData = method === 'findAndCountAll'
            ? serialize(data.rows, options)
            : serialize(data, options);
        } else {
          responseData = data;
        }

        res.status(200).send(responseData);
      } else {
        if (updateRequest) {
          updateRequest(req, data);
        }

        next();
      }
    } catch (e) {
      next(e);
    }
  };
};

module.exports = find;
