const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');
const ListItem = mongoose.model('ListItem');

const addListItemQuery = async (groupName, boardId, listId, text) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    const list = board.lists.id(listId);
    list.listItems.push(new ListItem({ text }));
    await group.save();
  } catch (err) {
    logger.error(`Error in addListItemQuery - ${err}`);
    throw err;
  }
};

const deleteListItemQuery = async (groupName, boardId, listId, listItemId) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    const list = board.lists.id(listId);
    const listItem = list.listItems.id(listItemId);
    listItem.remove();
    await group.save();
  } catch (err) {
    logger.error(`Error in deleteListItemQuery - ${err}`);
    throw err;
  }
};

const editListItemQuery = async (groupName, boardId, listId, listItemId, newText, completed) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    const list = board.lists.id(listId);
    const listItem = list.listItems.id(listItemId);
    listItem.text = newText;
    listItem.completed = completed;
    await group.save();
  } catch (err) {
    logger.error(`Error in editListItemQuery - ${err}`);
    throw err;
  }
};

module.exports = {
  addListItemQuery,
  deleteListItemQuery,
  editListItemQuery,
};
