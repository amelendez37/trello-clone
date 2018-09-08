const controllerHelper = require('../../helpers/controllerHelper');
const {
  addListItemQuery,
  deleteListItemQuery,
  editListItemQuery,
} = require('./listItemDAL');

const addListItemController = async (req, res) => {
  const {
    groupName,
    boardId,
    listId,
    text,
  } = req.body;

  controllerHelper(
    res,
    addListItemQuery,
    201,
    'Error in addListItemController',
    groupName,
    boardId,
    listId,
    text,
  );
};

const deleteListItemController = async (req, res) => {
  const {
    groupName,
    boardId,
    listId,
    listItemId,
  } = req.body;

  controllerHelper(
    res,
    deleteListItemQuery,
    200,
    'Error in deleteListItemController',
    groupName,
    boardId,
    listId,
    listItemId,
  );
};

const editListItemController = async (req, res) => {
  const {
    groupName,
    boardId,
    listId,
    listItemId,
    completed,
  } = req.body;

  controllerHelper(
    res,
    editListItemQuery,
    200,
    'Error in editListItemController',
    groupName,
    boardId,
    listId,
    listItemId,
    completed,
  );
};

module.exports = {
  addListItemController,
  deleteListItemController,
  editListItemController,
};
