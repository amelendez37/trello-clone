const logger = require('../../config/logger');
const {
  addGroupQuery,
  findGroupQuery,
} = require('./groupDAL');

/**
 * Gets data associated with a group
 */
const groupController = async (req, res) => {
  const { groupName } = req.params;

  try {
    const result = await findGroupQuery(groupName);

    if (result) {
      return res.status(200).send(result);
    }

    return res.status(401).send();
  } catch (err) {
    logger.error(`Error in groupController ${err}`);
    return res.status(404).send();
  }
};

/**
 * Validates groupName input and performs
 * query operation for adding a new group
 */
const addGroupController = async (req, res) => {
  const { groupName } = req.body;

  try {
    const isNewGroup = await addGroupQuery(groupName);

    if (isNewGroup) {
      return res.status(201).send();
    }

    return res.status(401).send();
  } catch (err) {
    logger.error(`Error in addGroupController - ${err}`);
    return res.status(404).send();
  }
};

module.exports = {
  addGroupController,
  groupController,
};
