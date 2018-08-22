const {
  addBoardController,
  deleteBoardController,
  editBoardController,
} = require('./boardControllers');

module.exports = (router) => {
  router.post('/board', addBoardController);
  router.delete('/board', deleteBoardController);
  router.patch('/board', editBoardController);
};
