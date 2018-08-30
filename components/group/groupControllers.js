const logger = require('../../config/logger');
const {
  addGroupQuery,
  findGroupQuery,
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

module.exports = {
  addGroupController,
  findGroupController,
};
