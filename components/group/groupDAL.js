const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');

/**
 * Finds a group
 * @param groupname - String
 * @returns - query data or false
 */
const findGroupQuery = async (groupname) => {
  try {
    const result = await Group.find({ groupname });

    if (result.length) {
      return result;
    }
  } catch (err) {
    logger.error(`Error in findGroupQuery ${err}`);
  }

  return false;
};

/**
 * Saves a new group into database if they do not already exist
 * @param groupName - String
 * @returns - Boolean
 */
const addGroupQuery = async (groupName) => {
  try {
    const result = await Group.find({ groupName });

    if (result.length) {
      return false;
    }

    const group = new Group({ groupName });
    await group.save();
  } catch (err) {
    logger.error(`Error in addGroupQuery - ${err}`);
  }

  return true;
};

module.exports = {
  addGroupQuery,
  findGroupQuery,
};
