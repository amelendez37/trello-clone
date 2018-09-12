const controllerHelper = require('../../helpers/controllerHelper');
const {
  addListQuery,
  deleteListQuery,
  editListQuery,
  updateListItemsQuery,
} = require('./listDAL');

const addListController = async (req, res) => {
  const { groupName, boardId, listName } = req.body;

  controllerHelper(
    res,
    addListQuery,
    201,
    'Error in addListController',
    groupName,
    boardId,
    listName,
  );
};

const deleteListController = async (req, res) => {
  const { groupName, boardId, listId } = req.body;

  controllerHelper(
    res,
    deleteListQuery,
    200,
    'Error in deleteListController',
    groupName,
    boardId,
    listId,
  );
};

const editListController = async (req, res) => {
  const {
    groupName,
    boardId,
    listId,
    newListName,
  } = req.body;

  controllerHelper(
    res,
    editListQuery,
    200,
    'Error in editListController',
    groupName,
    boardId,
    listId,
    newListName,
  );
};

/**
 * Updates order of list items within a list
 */
const updateListItemsController = async (req, res) => {
  const {
    groupName,
    boardId,
    listId,
    updatedListItems,
  } = req.body;

  controllerHelper(
    res,
    updateListItemsQuery,
    200,
    'Error in updateListItemsController',
    groupName,
    boardId,
    listId,
    updatedListItems,
  );
};

module.exports = {
  addListController,
  deleteListController,
  editListController,
  updateListItemsController,
};
