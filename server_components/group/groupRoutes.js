const groupNameValidator = require('../../services/groupName-validator.js');
const {
  findGroupController,
  addGroupController,
  updateBoardsController,
} = require('./groupControllers');

module.exports = (router) => {
  router.get('/group/:groupName', groupNameValidator, findGroupController);
  router.post('/group', groupNameValidator, addGroupController);
  router.patch('/group/updateBoards', updateBoardsController);
};
