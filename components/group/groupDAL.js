const mongoose = require('mongoose');
const logger = require('../../config/logger');

const Group = mongoose.model('Group');

/**
 * Finds a group
 * @param groupName - String
 * @returns - Group object or false
 */
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

/**
 * Saves a new group into database if they do not already exist
 * @param groupName - String
 * @returns - false if group already exists, otherwise new Group object
 */
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

module.exports = {
  addGroupQuery,
  findGroupQuery,
};
