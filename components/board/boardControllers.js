const logger = require('../../config/logger');
const {
  addBoardQuery,
  deleteBoardQuery,
} = require('./boardDAL');

const addBoardController = async (req, res) => {
  const { boardName, groupName } = req.body;

  try {
    await addBoardQuery(boardName, groupName);
    return res.status(201).send();
  } catch (err) {
    logger.error(`Error in addBoardController - ${err}`);
    return res.status(404).send();
  }
};

const deleteBoardController = async (req, res) => {
  const { groupName, boardId } = req.body;

  try {
    await deleteBoardQuery(groupName, boardId);
    return res.status(200).send();
  } catch (err) {
    logger.error(`Error in deleteBoardController - ${err}`);
    return res.status(404).send();
  }
};

module.exports = {
  addBoardController,
  deleteBoardController,
};
