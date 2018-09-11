const {
  findGroupController,
  addGroupController,
  updateBoardsController,
} = require('./groupControllers');

module.exports = (router) => {
  router.get('/group/:groupName', findGroupController);
  router.post('/group', addGroupController);
  router.patch('/group/updateBoards', updateBoardsController);
};
