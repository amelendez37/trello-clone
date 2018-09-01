const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');
const Board = mongoose.model('Board');

const addBoardQuery = async (groupName, boardName) => {
  try {
    const group = await Group.findOne({ groupName });
    const newBoard = new Board({ boardName });
    group.boards.push(newBoard);
    await group.save();
    return newBoard;
  } catch (err) {
    logger.error(`Error in addBoardQuery - ${err}`);
    throw err;
  }
};

const deleteBoardQuery = async (groupName, boardId) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    board.remove();
    await group.save();
  } catch (err) {
    logger.error(`Error in deleteBoardQuery - ${err}`);
    throw err;
  }
};

const editBoardQuery = async (groupName, boardId, newBoardName) => {
  try {
    const group = await Group.findOne({ groupName });
    const board = group.boards.id(boardId);
    board.boardName = newBoardName;
    await group.save();
  } catch (err) {
    logger.error(`Error in editBoardQuery - ${err}`);
    throw err;
  }
};

module.exports = {
  addBoardQuery,
  deleteBoardQuery,
  editBoardQuery,
};
