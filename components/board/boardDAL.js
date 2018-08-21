const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');
const Board = mongoose.model('Board');

const addBoardQuery = async (boardName, groupName) => {
  try {
    const group = await Group.findOne({ groupName });
    group.boards.push(new Board({ boardName }));
    await group.save();
  } catch (err) {
    logger.error(`Error in addBoardQuery - ${err}`);
  }
};

const deleteBoardQuery = async (groupName, boardId) => {
  try {
    const group = await Group.findOne({ groupName });
    group.boards.id(boardId).remove();
    await group.save();
  } catch (err) {
    logger.error(`Error in deleteBoardQuery - ${err}`);
  }
};

module.exports = {
  addBoardQuery,
  deleteBoardQuery,
};
