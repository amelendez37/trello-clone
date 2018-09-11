const logger = require('../../config/logger');
const controllerHelper = require('../../helpers/controllerHelper');
const {
  addGroupQuery,
  findGroupQuery,
  updateBoardsQuery,
} = require('./groupDAL');

const findGroupController = async (req, res) => {
  const { groupName } = req.params;

  try {
    const result = await findGroupQuery(groupName);

    if (result) {
      return res.status(200).send(result);
    }

    return res.status(404).send();
  } catch (err) {
    logger.error(`Error in groupController ${err}`);
    return res.status(400).send();
  }
};

const addGroupController = async (req, res) => {
  const { groupName } = req.body;

  try {
    const isNewGroup = await addGroupQuery(groupName);

    if (isNewGroup) {
      return res.status(201).send(isNewGroup);
    }

    return res.status(404).send();
  } catch (err) {
    logger.error(`Error in addGroupController - ${err}`);
    return res.status(400).send();
  }
};

/**
 * Updates a group with new boards array
 * Used for updating order of boards
 */
const updateBoardsController = async (req, res) => {
  const { groupName, updatedBoards } = req.body;

  controllerHelper(
    res,
    updateBoardsQuery,
    200,
    'Error in updateBoardsController',
    groupName,
    updatedBoards,
  );
};

module.exports = {
  addGroupController,
  findGroupController,
  updateBoardsController,
};
