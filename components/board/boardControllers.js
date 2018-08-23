const controllerHelper = require('../../helpers/controllerHelper');
const {
  addBoardQuery,
  deleteBoardQuery,
  editBoardQuery,
} = require('./boardDAL');

const addBoardController = (req, res) => {
  const { boardName, groupName } = req.body;

  controllerHelper(
    res,
    addBoardQuery,
    201,
    'Error in addBoardController',
    groupName,
    boardName,
  );
};

const deleteBoardController = async (req, res) => {
  const { groupName, boardId } = req.body;

  controllerHelper(
    res,
    deleteBoardQuery,
    200,
    'Error in deleteBoardController',
    groupName,
    boardId,
  );
};

const editBoardController = async (req, res) => {
  const { groupName, boardId, newBoardName } = req.body;

  controllerHelper(
    res,
    editBoardQuery,
    200,
    'Error in editBoardController',
    groupName,
    boardId,
    newBoardName,
  );
};

module.exports = {
  addBoardController,
  deleteBoardController,
  editBoardController,
};
