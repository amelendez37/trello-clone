const logger = require('../../config/logger');
const {
  addListQuery,
} = require('./listDAL');

const addListController = async (req, res) => {
  const { groupName, boardId, listName } = req.body;

  try {
    await addListQuery(groupName, boardId, listName);
    return res.status(201).send();
  } catch (err) {
    logger.error(`Error in addListController - ${err}`);
    return res.status(404).send();
  }
};

module.exports = {
  addListController,
};
