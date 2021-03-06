const logger = require('../../config/logger');
const controllerHelper = require('../../services/controllerHelper');
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
      return res.status(200).json(result);
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
    const newGroup = await addGroupQuery(groupName);

    if (newGroup) {
      return res.status(201).json(newGroup);
    }

    return res.status(404).send();
  } catch (err) {
    logger.error(`Error in addGroupController - ${err}`);
    return res.status(400).send(err);
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
