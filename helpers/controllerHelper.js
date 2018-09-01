const logger = require('../config/logger');

/**
 * Helper for board controllers
 *
 * @param res - response object
 * @param query - query to be executed
 * @param statusCode - Integer - http status code to be sent on success
 * @param errStr - String - to be used on error logging
 * @param args - Additional arguments will be passed to the query
 */
module.exports = async function controllerHelper(res, query, statusCode, errStr, ...args) {
  try {
    const data = await query(...args);
    return res.status(statusCode).send(data);
  } catch (err) {
    logger.error(`${errStr} - ${err}`);
    return res.status(400).send();
  }
};
