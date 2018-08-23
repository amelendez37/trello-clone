const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');
const List = mongoose.model('List');

const addListQuery = async (groupName, boardId, listName) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    board.lists.push(new List({ listName }));
    await group.save();
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

module.exports = {
  addListQuery,
  deleteListQuery,
};
