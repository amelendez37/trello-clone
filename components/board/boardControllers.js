const logger = require('../../config/logger');
const {
  addBoardQuery,
  deleteBoardQuery,
  editBoardQuery,
} = require('./boardDAL');

/**
 * Helper for board controllers
 *
 * @param res - response object
 * @param query - query to be executed
 * @param statusCode - Integer - http status code to be sent on success
 * @param errStr - String - to be used on error logging
 * @param args - Additional arguments will be passed to the query
 */
const boardContHelper = async function boardContHelper(res, query, statusCode, errStr, ...args) {
  try {
    await query(...args);
    return res.status(statusCode).send();
  } catch (err) {
    logger.error(`${errStr} - ${err}`);
    return res.status(404).send();
  }
};

const addBoardController = (req, res) => {
  const { boardName, groupName } = req.body;

  boardContHelper(
    res,
    addBoardQuery,
    201,
    'Error in addBoardController',
    groupName,
    boardName,
  );
};

const deleteBoardController = async (req, res) => {
  const { groupName, boardId } = req.body;

  boardContHelper(
    res,
    deleteBoardQuery,
    200,
    'Error in deleteBoardController',
    groupName,
    boardId,
  );
};

const editBoardController = async (req, res) => {
  const { groupName, boardId, newBoardName } = req.body;

  boardContHelper(
    res,
    editBoardQuery,
    200,
    'Error in editBoardController',
    groupName,
    boardId,
    newBoardName,
  );
};

module.exports = {
  addBoardController,
  deleteBoardController,
  editBoardController,
};
