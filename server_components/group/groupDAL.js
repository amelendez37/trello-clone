const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');

const findGroupQuery = async (groupName) => {
  try {
    const group = await Group.findOne({ groupName });

    if (group) {
      return group;
    }

    return false;
  } catch (err) {
    logger.error(`Error in findGroupQuery ${err}`);
    throw err;
  }
};

const addGroupQuery = async (groupName) => {
  try {
    const group = await Group.findOne({ groupName });

    if (group) {
      return false;
    }

    const newGroup = new Group({ groupName });
    await newGroup.save();
    return newGroup;
  } catch (err) {
    logger.error(`Error in addGroupQuery - ${err}`);
    throw err;
  }
};

const updateBoardsQuery = async (groupName, updatedBoards) => {
  try {
    const group = await Group.findOne({ groupName });

    if (!group) {
      return false;
    }

    group.boards = updatedBoards;
    return await group.save();
  } catch (err) {
    logger.error(`Error in addGroupQuery - ${err}`);
    throw err;
  }
};

module.exports = {
  addGroupQuery,
  findGroupQuery,
  updateBoardsQuery,
};
