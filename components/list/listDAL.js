const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');
const List = mongoose.model('List');

const addListQuery = async (groupName, boardId, listName) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    const newList = new List({ listName });
    board.lists.push(newList);
    await group.save();
    return newList;
  } catch (err) {
    logger.error(`Error in addListQuery - ${err}`);
    throw err;
  }
};

const deleteListQuery = async (groupName, boardId, listId) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    const list = board.lists.id(listId);
    list.remove();
    await group.save();
  } catch (err) {
    logger.error(`Error in deleteListQuery - ${err}`);
    throw err;
  }
};

const editListQuery = async (groupName, boardId, listId, newListName) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    const list = board.lists.id(listId);
    list.listName = newListName;
    await group.save();
  } catch (err) {
    logger.error(`Error in editListQuery - ${err}`);
    throw err;
  }
};

const updateListItemsQuery = async (groupName, boardId, listId, updatedListItems) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    const list = board.lists.id(listId);
    list.listItems = updatedListItems;
    await group.save();
  } catch (err) {
    logger.error(`Error in updateListItemsQuery - ${err}`);
    throw err;
  }
};

module.exports = {
  addListQuery,
  deleteListQuery,
  editListQuery,
  updateListItemsQuery,
};
