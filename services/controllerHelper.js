const logger = require('../config/logger');

/**
 * Helper for board controllers
 *
 * @param {Object} res - response object
 * @param {Function} query
 * @param {Number} statusCode - http status code to be sent on success
 * @param {String} errStr - used on error logging
 * @param args - additional arguments will be passed to the query
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
