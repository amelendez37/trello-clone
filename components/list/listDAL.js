const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');
const List = mongoose.model('List');

const addListQuery = async (groupName, boardId, listName) => {
  try {
    const group = await Group.findOne({ groupName });

    if (group) {
      const board = group.boards.id(boardId);

      if (board) {
        board.lists.push(new List({ listName }));
        await group.save();
      }
    } else {
      throw new Error('Group not found');
    }
  } catch (err) {
    logger.error(`Error in addListQuery - ${err}`);
    throw err;
  }
};

module.exports = {
  addListQuery,
};
