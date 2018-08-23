const logger = require('../../config/logger');
const {
  addListQuery,
  deleteListQuery,
  editListQuery,
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

const deleteListController = async (req, res) => {
  const { groupName, boardId, listId } = req.body;

  try {
    await deleteListQuery(groupName, boardId, listId);
    res.status(200).send();
  } catch (err) {
    logger.error(`Error in deleteListController ${err}`);
    res.status(404).send();
  }
};

const editListController = async (req, res) => {
  const {
    groupName,
    boardId,
    listId,
    newListName,
  } = req.body;

  try {
    await editListQuery(groupName, boardId, listId, newListName);
    res.status(200).send();
  } catch (err) {
    logger.error(`Error in editListController ${err}`);
    res.status(404).send();
  }
};

module.exports = {
  addListController,
  deleteListController,
  editListController,
};
