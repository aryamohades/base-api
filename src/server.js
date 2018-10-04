/* eslint-disable no-process-exit */
const http = require('http');
const path = require('path');
const os = require('os');
const cluster = require('cluster');
const logger = require('./logger');
const app = require('./app');
const models = require('./models');

const {
  NODE_ENV,
  PORT = 8000
} = process.env;

const init = async () => {
  try {
    await models.sequelize.authenticate();

    await models.sequelize.sync({
      force: NODE_ENV === 'development'
    });

    if (NODE_ENV === 'development') {
      await models.fixtures.loadFile(
        path.join(__dirname, '/models/fixtures/*.json'),
        models
      );
    }

    fork();
  } catch (e) {
    throw e;
  }
};

function fork() {
  for (let i = 0; i < os.cpus().length; ++i) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    if (!worker.exitedAfterDisconnect) {
      logger.error(`[api] Worker has died: ${worker.process.pid}`);

      cluster.fork();
    }
  });
}

const start = async () => {
  try {
    const server = http.createServer(app);

    server.listen(PORT, () => {
      process.on('SIGINT', stop);
      process.on('SIGTERM', stop);

      logger.info(`[api] Server listening on ${PORT}`);
    });
  } catch (e) {
    throw e;
  }
};

async function stop() {
  try {
    logger.info('[api] Stopping server gracefully');

    await models.sequelize.close();

    process.exit(0);
  } catch (e) {
    logger.error(`[api] Disconnect from database failed: ${e.message}`);

    process.exit(1);
  }
}

if (cluster.isMaster) {
  init();
} else {
  start();
}
